import { Link } from 'react-router-dom';

const Navbar = () => {
    return(
        <header>
            <div className="flex flex-row justify-between bg-orange-300 p-4">
                <Link to="/">
                    <h1 className="title ">
                        Sketchr.io
                    </h1>
                </Link>
                <nav className="flex flex-row justify-evenly">
                    <Link to="/feed">
                        <h3>Feed</h3>
                    </Link>
                    <Link to="/login">
                        <h3>Login</h3>
                    </Link>
                    <Link to="/signup">
                        <h3>Signup</h3>
                    </Link>
                </nav>
            </div>
        </header>
    )
}

export default Navbar