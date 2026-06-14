import useTilt from '../hooks/useTilt'

/** Wraps any element with 3D tilt + spotlight. */
export default function TiltCard({ as: Tag = 'div', tilt = 8, className = '', children, ...rest }) {
  const ref = useTilt(tilt)
  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
      <span className="card-spot" aria-hidden="true" />
    </Tag>
  )
}
