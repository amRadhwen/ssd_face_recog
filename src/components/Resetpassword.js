import React from 'react'

const Resetpassword = () => {
  return (
      <div className='reset-password'>
        <div className='col-md-12'>
                <form>
                    <h1>Reset Password</h1>
                    <input className='form-control' type={"email"} id="email" placeholder='Enter your email'/>
                    <input className="btn btn-primary" type="submit" value="Send E-mail" />
                </form>
            </div>
      </div>
  )
}

export default Resetpassword;
