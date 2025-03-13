import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const LoginPopup = ({ setShowLogin }) => {

    const { url, token, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign up")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login"
        } else {
            newUrl += "/api/user/register"
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        } else {
            alert(response.data.message);
        }
    }


    return (
        <div className='login-popup'>
            <form className='login-popup-container' onSubmit={onLogin}>
                <div className="lgon-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                </div>
                <div className="login-popup-inputs">
                    {
                        currState === "Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Enter Your Name' required />
                    }
                    <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter Your Email' required />
                    <input type="password" name='password' onChange={onChangeHandler} value={data.password} placeholder='Enter Your Password' required />
                </div>
                <button type='submit'>{currState === "Sign up" ? "Create account" : "Login"}</button>
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
