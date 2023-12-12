import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FiLogOut, FiFilePlus } from 'react-icons/fi';
import Button from './Button';

const Navbar = ({ handleShowForm, randomGreeting }) => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return(
    <header>
      <div className="flex flex-row items-center justify-between w-screen p-4">
        <Link to="/">
          <h1 className="title font-lobster text-lg">
            mindstroke
          </h1>
        </Link>
        <nav className="w-[70%] flex flex-row justfy-end items-center">
            {user && <div className="w-full flex flex-row justify-end gap-6 items-center">
              <span className="hidden sm:flex">{randomGreeting}</span>
              <Link to="/feed">
                <h3>feed</h3>
              </Link>
              <Button handleClick={handleShowForm} text={'new'} icon={<FiFilePlus/>} bgLight={true} textLight={false} />
              <Link to="/">
                <Button handleClick={handleClick} text={'logout'} icon={<FiLogOut/>} bgLight={true} textLight={false}/>
              </Link>
            </div>}
            
            {!user && <div className="w-full flex flex-row justify-end gap-4 items-center">
            <Link to="/login">
              <Button text={'login'} bgLight={true} textLight={false}/>
            </Link>
            <Link to="/signup">
              <Button text={'signup'} bgLight={true} textLight={false}/>
            </Link>
          </div>}
        </nav>
      </div>
    </header>
  )
}

export default Navbar