import React from 'react'

const Signin = () => {
    return (
        <div className='signin'>
            <div className='col-md-12'>
                <form>
                    <h1>Login</h1>
                    <input className='form-control' type={"email"} id="email" placeholder='Enter your email'/>
                    <input className='form-control' type={"password"} id="password" placeholder='Password'/>
                    <p>
                        <a href='/reset-password'>Forgot Password ?</a>
                    </p>
                    <input className="btn btn-primary" type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Signin