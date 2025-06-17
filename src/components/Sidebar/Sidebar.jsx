import { Link } from 'react-router'

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Sidebar</h2>
      <ul>
        <li>
          <Link to="/">Todo List Page</Link>
        </li>
        <li>
          <Link to="/profile">Profile Page</Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
