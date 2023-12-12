import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { FiLogOut, FiFilePlus } from 'react-icons/fi';
import Button from './Button';

const Navbar = ({ handleShowForm }) => {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }

  const now = new Date();

  const morningGreetings = [
    'おはようございます',
    '잘 주무셨어요?',
    'buenos días',
    '早上好',
    'bom dia',
    'God morgon',
    'สวัสดีตอนเช้า',
    'सुप्रभात',
    'صباح الخير',
    'bonjour',
    'С добрым утром',
    'Chúc ngủ ngon',
    'Magandang umaga',
    'goeie more',
  ]

  const afternoonGreetings = [
    'こんにちは',
    '안녕',
    'hola',
    '你好',
    'olá',
    'hej',
    'สวัสดี',
    'नमस्ते',
    'السلام عليكم',
    'Привет',
  ]


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
              <span className="hidden sm:flex">{now.getHours() > 12 ? `${afternoonGreetings[Math.floor(Math.random() * afternoonGreetings.length)]}`: `${morningGreetings[Math.floor(Math.random() * morningGreetings.length)]}`}</span>
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