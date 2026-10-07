
import { useState } from "react";


import { Link } from 'react-router-dom';
import './login.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";
function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = {
            phone: phone,
            password: password
        };
        try {
            const response = await api.post(
                "/api/login", userData
            );
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", response.data.user.fullname);
            toast.success("Hello " + response.data.user.fullname);
            navigate("/home",
                {
                    state: {
                        name:response.data.user.fullname
                    }
                }
            );
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    }
    return (
        <main>
            <div className="login-cont">
                <div className="login-img">
                    <div className="login-img-content">
                        <h1>Welcome Back</h1>
                        <p>
                            Glad to see you again! Please login to continue your journey.
                        </p>
                    </div>
                </div>

                <div className="login-details">
                    <div className="login-form-container">

                        <div className="login-heading">
                            <h2>Sign In</h2>
                            <p>Login to your account to continue</p>
                        </div>

                        <form onSubmit={handleLogin}>

                            <label className="login-form-label">Phone</label>
                            <input
                                className="login-input"
                                type="tel"
                                required
                                placeholder="Enter your number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <br />
                            <br />

                            <label className="login-form-label">Password</label>
                            <input
                                className="login-input"
                                type="password"
                                required
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                           

                            <button
                                type="submit"
                                className="login-btn"
                            >
                                Login
                            </button>

                            <p className="login-or">OR</p>

                            <div className="login-register">
                                <p>Don't have an account?</p>

                                <Link to="/register">
                                    <button
                                        type="button"
                                        className="login-register-btn"
                                    >
                                        Register
                                    </button>
                                </Link>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Login;