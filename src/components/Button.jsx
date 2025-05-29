import editImg from '../assets/edit.png'
import deleteImg from '../assets/trash.png'
import saveImg from '../assets/save.png'
import cancelImg from '../assets/cancel.png'

function Button({ content, onClick }) {
  let className
  switch (content) {
    case 'edit':
      className = 'btn-edit'
      content = <img src={editImg} alt="Edit" />
      break
    case 'delete':
      className = 'btn-delete'
      content = <img src={deleteImg} alt="Delete" />
      break
    case 'save':
      className = 'btn-save'
      content = <img src={saveImg} alt="Delete" />
      break
    case 'cancel':
      className = 'btn-cancel'
      content = <img src={cancelImg} alt="Delete" />
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
