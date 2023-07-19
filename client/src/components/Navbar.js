import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import AddPostBtn from './AddPostBtn';

const Navbar = ({ handleShowForm }) => {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return(
    <header>
      <div className="flex flex-row items-center justify-between w-screen p-4">
        <Link to="/">
          <h1 className="title font-lobster text-lg">
            Sketchr.io
          </h1>
        </Link>
        <nav className="w-[70%] flex flex-row justfy-end items-center">
            {user && <div className="w-full flex flex-row justify-end gap-10 items-center">
              <span>{user.email}</span>
              <Link to="/">
                <button className="rounded-full py-1 px-4 border-2 border-black bg-white text-pink-500" onClick={handleClick}>Logout</button>
              </Link>
              <AddPostBtn handleShowForm={handleShowForm}/>
              <Link to="/feed">
                <h3>Feed</h3>
              </Link>
            </div>}
            
            {!user && <div className="w-full flex flex-row justify-end gap-10 items-center">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
            <Link to="/signup">
              <h3>Signup</h3>
            </Link>
          </div>}

        </nav>
      </div>
    </header>
  )
}

export default Navbar