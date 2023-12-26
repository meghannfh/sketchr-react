import { Link } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from '../reducers/authSlice';
import { useLogout } from '../hooks/useLogout';
import { useSelector } from 'react-redux';
import { FiLogOut, FiFilePlus } from 'react-icons/fi';
import { TbBrandFeedly } from "react-icons/tb";
import Button from './buttons/Button';
import SmScreenNavBtns from './buttons/SmScreenNavBtns';

const Navbar = ({ handleShowAddPostForm, randomGreeting }) => {
  const { logoutUser } = useLogout();
  const user = useSelector((state) => state.auth.user);
  // const { user } = useAuthContext();

  console.log(user)

  const handleLogout = () => {
    logoutUser()
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
            {user && <div className="w-full flex flex-row justify-end gap-4 md:gap-2 items-center">
              <span className="hidden sm:flex">{randomGreeting}</span>

              <Link to="/feed">
                <span className="hidden md:flex">
                  <Button text={'feed'} icon={<TbBrandFeedly />} bgLight={true} textLight={false} />
                </span>
                  <SmScreenNavBtns text={"feed"}/>
              </Link>

              <span className="hidden md:flex">
                <Button handleClick={handleShowAddPostForm} text={'new'} icon={<FiFilePlus/>} bgLight={true} textLight={false} btnId={"addPost"} />
              </span>
                <SmScreenNavBtns text={"new"}/>
              
              <Link to="/">
                <span className="hidden md:flex">
                  <Button handleClick={handleLogout} text={'logout'} icon={<FiLogOut/>} bgLight={true} textLight={false}/>
                </span>
                  <SmScreenNavBtns text={"logout"}/>
              </Link>
            </div>}
            
            {!user && <div className="w-full flex flex-row justify-end gap-2 items-center">
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