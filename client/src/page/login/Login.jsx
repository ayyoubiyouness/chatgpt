import React from 'react'
import GptIcon from '../../assets/gptIcon'
import './login.scss'
const Login = () => {
    return (
        <div className="auth">
            <div className="login">
                <div className='loginTop'>
                    <GptIcon />
                    <span>Welcome to ChatGPT</span>
                    <span>Log in with your OpenAI account to continue</span>
                    <div className='btns'>
                        <button>Log in</button>
                        <button>Sign up</button>
                    </div>

                </div>
                <div className="loginBottom">
                    Terms of use | Privacy Policy
                </div>
            </div>
        </div>
    )
}

export default Login
