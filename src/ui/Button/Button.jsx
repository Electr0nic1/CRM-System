function Button({ children, onClick, type, color }) {
  const className = typeof children === 'string' ? 'btn-default' : `btn-img btn-${color}`

  return (
    <>
      <button className={className} onClick={onClick} type={type}>
        {children}
      </button>
    </>
  )
}

export default Button
