import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FiLogOut } from 'react-icons/fi';
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
            {user && <div className="w-full flex flex-row justify-end gap-6 items-center">
              <span>{user.email}</span>
              <Link to="/feed">
                <h3>feed</h3>
              </Link>
              <AddPostBtn handleShowForm={handleShowForm}/>
              <Link to="/">
                <button className="flex flex-row gap-2 items-center transition-colors rounded-full py-1 px-4 bg-white text-pink-500 hover:bg-pink-500 hover:text-white hover:cursor-pointer" onClick={handleClick}>logout <span><FiLogOut/></span></button>
              </Link>
            </div>}
            
            {!user && <div className="w-full flex flex-row justify-end gap-10 items-center">
            <Link to="/login">
              <h3>login</h3>
            </Link>
            <Link to="/signup">
              <h3>signup</h3>
            </Link>
          </div>}

        </nav>
      </div>
    </header>
  )
}

export default Navbar