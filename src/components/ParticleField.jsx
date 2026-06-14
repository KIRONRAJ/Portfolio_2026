import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { getTheme } from '../lib/theme'

/* ---------- GLSL ---------- */
// Ashima simplex noise 3D (public domain)
const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x,289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+1.0*C.xxx; vec3 x2=x0-i2+2.0*C.xxx; vec3 x3=x0-1.0+3.0*C.xxx;
  i=mod(i,289.0);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=1.0/7.0; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x; p1*=norm.y; p2*=norm.z; p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`

const VERT = `
uniform float uTime;
uniform float uSize;
uniform float uPixelRatio;
uniform vec2 uMouse;
uniform float uAmp;
attribute float aScale;
varying float vN;
varying float vDepth;
${SNOISE}
void main(){
  vec3 p = position;
  float n = snoise(normalize(p) * 1.4 + vec3(0.0, 0.0, uTime * 0.18));
  float n2 = snoise(normalize(p) * 3.1 - vec3(uTime * 0.12));
  float disp = (n * 0.7 + n2 * 0.3) * uAmp;
  // gentle mouse push along view
  float m = (uMouse.x * normalize(p).x + uMouse.y * normalize(p).y);
  p += normalize(p) * (disp + m * 0.18);
  vN = n;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = -mv.z;
  gl_PointSize = uSize * aScale * uPixelRatio * (8.0 / -mv.z);
  gl_Position = projectionMatrix * mv;
}
`

const FRAG = `
precision highp float;
uniform float uOpacity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying float vN;
varying float vDepth;
void main(){
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.0, d);
  float t = clamp(vN * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = mix(uColorA, uColorB, t);
  col = mix(col, uColorC, smoothstep(0.7, 1.0, t));
  float fog = clamp(1.0 - (vDepth - 4.0) / 12.0, 0.15, 1.0);
  gl_FragColor = vec4(col, alpha * uOpacity * fog);
}
`

export default function ParticleField() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
    } catch (e) {
      return // no webgl — graceful: page keeps its bg
    }

    const sizes = { w: window.innerWidth, h: window.innerHeight }
    const pr = Math.min(window.devicePixelRatio || 1, 2)
    renderer.setSize(sizes.w, sizes.h)
    renderer.setPixelRatio(pr)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, sizes.w / sizes.h, 0.1, 100)
    camera.position.set(0, 0, 11)

    /* ---- sphere of points (fibonacci) ---- */
    const COUNT = sizes.w < 680 ? 4200 : 8000
    const radius = 4.6
    const pos = new Float32Array(COUNT * 3)
    const scl = new Float32Array(COUNT)
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      const jitter = 0.85 + Math.random() * 0.3
      pos[i * 3] = Math.cos(theta) * r * radius * jitter
      pos[i * 3 + 1] = y * radius * jitter
      pos[i * 3 + 2] = Math.sin(theta) * r * radius * jitter
      scl[i] = 0.4 + Math.random() * 1.4
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('aScale', new THREE.BufferAttribute(scl, 1))

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 13 },
      uPixelRatio: { value: pr },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAmp: { value: 0.9 },
      uOpacity: { value: 0 },
      uColorA: { value: new THREE.Color('#0a6b4a') },
      uColorB: { value: new THREE.Color('#00ffa3') },
      uColorC: { value: new THREE.Color('#9bfff0') },
    }
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    /* ---- faint far dust ---- */
    const DUST = 1400
    const dpos = new Float32Array(DUST * 3)
    const dscl = new Float32Array(DUST)
    for (let i = 0; i < DUST; i++) {
      dpos[i * 3] = (Math.random() - 0.5) * 34
      dpos[i * 3 + 1] = (Math.random() - 0.5) * 22
      dpos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 6
      dscl[i] = 0.3 + Math.random() * 0.8
    }
    const dgeo = new THREE.BufferGeometry()
    dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3))
    dgeo.setAttribute('aScale', new THREE.BufferAttribute(dscl, 1))
    const dmat = mat.clone()
    dmat.uniforms = THREE.UniformsUtils.clone(uniforms)
    dmat.uniforms.uAmp.value = 0.0
    dmat.uniforms.uSize.value = 6
    dmat.uniforms.uColorB.value = new THREE.Color('#1f8f6b')
    const dust = new THREE.Points(dgeo, dmat)
    scene.add(dust)

    /* ---- theme-aware colours ---- */
    let baseOpacity = 0.95
    const applyThemeColors = (theme) => {
      if (theme === 'light') {
        mat.blending = THREE.NormalBlending
        uniforms.uColorA.value.set('#0b6745')
        uniforms.uColorB.value.set('#0a8f5f')
        uniforms.uColorC.value.set('#12805a')
        dmat.blending = THREE.NormalBlending
        dmat.uniforms.uColorA.value.set('#4aa98a')
        dmat.uniforms.uColorB.value.set('#2f9a72')
        dmat.uniforms.uColorC.value.set('#4aa98a')
        baseOpacity = 0.7
      } else {
        mat.blending = THREE.AdditiveBlending
        uniforms.uColorA.value.set('#0a6b4a')
        uniforms.uColorB.value.set('#00ffa3')
        uniforms.uColorC.value.set('#9bfff0')
        dmat.blending = THREE.AdditiveBlending
        dmat.uniforms.uColorA.value.set('#0a6b4a')
        dmat.uniforms.uColorB.value.set('#1f8f6b')
        dmat.uniforms.uColorC.value.set('#9bfff0')
        baseOpacity = 0.95
      }
      mat.needsUpdate = true
      dmat.needsUpdate = true
    }
    applyThemeColors(getTheme())
    const onTheme = (e) => applyThemeColors(e.detail || getTheme())
    window.addEventListener('themechange', onTheme)

    /* ---- interaction ---- */
    const mouse = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const onResize = () => {
      sizes.w = window.innerWidth
      sizes.h = window.innerHeight
      camera.aspect = sizes.w / sizes.h
      camera.updateProjectionMatrix()
      renderer.setSize(sizes.w, sizes.h)
    }
    window.addEventListener('resize', onResize)

    /* ---- loop ---- */
    const clock = new THREE.Clock()
    let raf
    let running = true
    const onVis = () => { running = !document.hidden }
    document.addEventListener('visibilitychange', onVis)

    let appeared = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!running) return

      const t = clock.getElapsedTime()
      // scroll-based fade so we don't paint behind opaque sections
      const sc = window.scrollY || window.pageYOffset || 0
      const vis = Math.max(0, 1 - sc / (window.innerHeight * 0.9))
      appeared += (1 - appeared) * 0.02 // intro fade-in
      const op = vis * appeared

      mouse.x += (target.x - mouse.x) * 0.05
      mouse.y += (target.y - mouse.y) * 0.05

      uniforms.uTime.value = reduced ? 0 : t
      uniforms.uMouse.value.set(mouse.x, mouse.y)
      uniforms.uOpacity.value = op * baseOpacity
      dmat.uniforms.uTime.value = reduced ? 0 : t * 0.5
      dmat.uniforms.uOpacity.value = op * baseOpacity * 0.5

      points.rotation.y = (reduced ? 0 : t * 0.04) + mouse.x * 0.5
      points.rotation.x = -mouse.y * 0.35
      dust.rotation.y = t * 0.01

      if (op > 0.01) renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('themechange', onTheme)
      document.removeEventListener('visibilitychange', onVis)
      geo.dispose(); mat.dispose(); dgeo.dispose(); dmat.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="particle-canvas" aria-hidden="true" />
}
