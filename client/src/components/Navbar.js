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
                <Link to="/feed">
                    <h3>Feed</h3>
                </Link>
            </div>
        </header>
    )
}

export default Navbar