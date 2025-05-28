import editLogo from '../assets/edit.png'
import deleteLogo from '../assets/trash.png'

function Button({ content, onClick }) {
  let className
  switch (content) {
    case 'edit':
      className = 'btn-edit'
      content = <img src={editLogo} alt="Edit" />
      break
    case 'delete':
      className = 'btn-delete'
      content = <img src={deleteLogo} alt="Delete" />
      break
  }

  return (
    <>
      <button className={className} onClick={onClick}>
        {content}
      </button>
    </>
  )
}

export default Button
