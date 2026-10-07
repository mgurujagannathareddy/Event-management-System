import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    function handlelogout(){
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
    return (
        <nav className="navbar navbar-expand-lg header-navbar">

            <div className="container-fluid">

                <div className="header-logo">
                    <span className="logo-code">CODE</span>
                    <span className="logo-now">NOW</span>
                    <span className="logo-events">EVENTS</span>
                </div>

                <div className="header-links">

                    <Link className="header-link" to="/home">
                        Home
                    </Link>

                    <Link className="header-link" to="/home/events">
                        Events
                    </Link>

                    <Link className="header-link" to="/home/gallery">
                        Gallery
                    </Link>

                    <Link className="header-link" to="/home/contact">
                        Contact
                    </Link>

                    <Link onClick={handlelogout} className="header-link logout-link" to="/login">
                        Logout
                    </Link>

                </div>

            </div>

        </nav>
    )
}

export default Header;