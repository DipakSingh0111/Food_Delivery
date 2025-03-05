import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign up")
    return (
        <div className='login-popup'>
            <form className='login-popup-container'>
                <div className="lgon-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? <></> : <input type="text" placeholder='Enter Your Name' required />
                    }
                    <input type="email" placeholder='Enter Your Email' required />
                    <input type="password" placeholder='Enter Your Password' required />
                </div>
                <button>{currState === "Sign up" ? "Create account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" />
                    <p>By Continuing, i agree to the terms of use & privacy policy.</p>


                </div>
                {
                    currState === "Login" ? <p onClick={() => setCurrState("Sign up")}>Create a new account ? <span>Click here</span></p> :
                        <p onClick={() => setCurrState("Login")}>Already have an account? <span>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default LoginPopup
