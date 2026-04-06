export default function SkeletonFormFieldsCategory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{
        height: '40px',
        background: '#e0e0e0',
        borderRadius: '6px',
        animation: 'pulse 1.5s infinite'
      }} />
      <div style={{
        height: '40px',
        background: '#e0e0e0',
        borderRadius: '6px',
        animation: 'pulse 1.5s infinite'
      }} />
    </div>
  )
}