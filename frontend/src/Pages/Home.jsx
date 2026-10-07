import image from "../assets/images.jpg";
import { Link } from "react-router-dom";
import "./Home.css";
import { useLocation } from "react-router-dom";
const Home = () => {
    const location=useLocation();
    return (
        <div className="hero-section">
            <div className="container">
                <div className="row align-items-center min-vh-100">

                    <div className="col-lg-6 text-white">
                        <p className="fw-bold fs-2 text-white">Hello {location.state?.name}</p>

                        <p className="fw-bold fs-3">
                            Kurnool • Ananthapur • Hyderabad • Bangalore
                        </p>
                        <h1 className="display-1 fw-bold lh-1">
                            TELUGU STATES BEST
                            <br />
                            <span className="highlight">EVENT</span>
                            <br />
                            <span className="highlight">COMPANY</span>
                        </h1>

                        <p className="lead text-light opacity-75 mt-4">
                            CODENOW Events & Advertisements Pvt. Ltd. — Andhra's leading
                            event management & BTL/ATL advertising company specialising in
                            corporate events, road shows, exhibitions, fashion shows &
                            artist management.
                        </p>

                        <Link
                            to="/home/contact"
                            className="btn btn-lg btn-pink px-5 mt-3"
                        >
                            Get A Free Quote
                        </Link>
                    </div>


                    <div className="col-lg-6 d-flex justify-content-center mt-5 mt-lg-0">

                        <div className="image-wrapper">

                            <img
                                src={image}
                                alt="Event"
                                className="img-fluid rounded-4 shadow-lg hero-image"
                            />

                            <div className="badge-card badge-top">
                                <h3>500+</h3>
                                <span>Events Managed</span>
                            </div>

                            <div className="badge-card badge-bottom">
                                <h3>15+</h3>
                                <span>Years Excellence</span>
                            </div>

                            <div className="circle1"></div>
                            <div className="circle2"></div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;