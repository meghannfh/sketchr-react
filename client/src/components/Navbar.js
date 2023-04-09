import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  return(
    <header>
      <div className="flex flex-row justify-between bg-orange-300 p-4">
        <Link to="/">
          <h1 className="title ">
            Sketchr.io
          </h1>
        </Link>
        <nav className="w-[40%] flex flex-row justify-evenly items-center">
            <div className="w-1/2 flex flex-row justify-around items-center">
              <Link to="/">
                <span></span>
                <button className="rounded-full py-1 px-4 border-2 border-black bg-white text-orange-600" onClick={handleClick}>Logout</button>
              </Link>
              <Link to="/feed">
                <h3>Feed</h3>
              </Link>
            </div>
            
            <div className="w-1/2 flex flex-row justify-around items-center">
            <Link to="/login">
              <h3>Login</h3>
            </Link>
            <Link to="/signup">
              <h3>Signup</h3>
            </Link>
          </div>

        </nav>
      </div>
    </header>
  )
}

export default Navbar