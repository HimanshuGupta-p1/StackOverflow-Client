import React from 'react'
import { useState } from 'react'
import './Auth.css'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import icon from '../../assests/favicon.png'
import AboutAuth from './AboutAuth'
import { signup, login } from '../../actions/auth'
const Auth = () => {

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSwitch = () => {
    setIsSignUp(!isSignUp);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password){
      alert("Enter email and password")
    }
    if (isSignUp){
      if(!name){
        alert("Enter a name to continue")
      }
      dispatch(signup({name, email, password}, navigate))
    }
    else{
      dispatch(login({ email, password}, navigate))
    }
    
    console.log({name, email,password})
  }
  return (
    <section className='auth-section'>
      {isSignUp && <AboutAuth/>}
      <div className='auth-container-2'>
        {!isSignUp && <img src={icon} alt='stack overflow' className='login-logo' />}
        <form onSubmit={handleSubmit}>
          {
            isSignUp && (
              <label htmlFor='name'>
                <h4> Display Name</h4>
                <input type='text' id='name' name='name' onChange={(e) => {setName(e.target.value)}} />

              </label>
            )
          }
          <label htmlFor='email'>
            <h4>Email</h4>
            <input type='email' name='email' id='email' onChange={(e) => {setEmail(e.target.value)}} />
          </label>
          <label htmlFor='password'>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              <h4>Password</h4>
              {!isSignUp && <p style={{color:"#007ac6", fontSize:'13px'}}>Forgot Password?</p>}
            </div>
            <input type='password' name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
            {isSignUp && <p  style={{color:"#666767", fontSize:"13px"}}> Passwords must contain at least eight<br />
              characters, including at least 1 letter and 1 <br />
              number.
            </p>}
          </label>
          {
            isSignUp && (
              <label htmlFor='check'>
                <input type="checkbox" id="check" />
                <p  style={{fontSize:"13px"}}>
              Opt-in to receive occasional<br />
              product updates, user research invitations,<br />
              company announcements, and digests.
            </p>
              </label>
            )
          }
          <button type='submit' className='auth-btn'>{isSignUp ? 'Sign Up' : 'Log In'}</button>
          {
            isSignUp && (
              <p style={{color:"#666767", fontSize:"13px"}}>
                By clicking “Sign up”, you agree to our 
                <span style={{color:"#007ac6"}}> terms of <br />service</span>, 
                <span style={{color:"#007ac6"}}> privacy policy </span> and 
                <span style={{color:"#007ac6"}}> cookie policy</span>
              </p>
            )
          }
        </form>
        <p style={{fontSize:"13px"}}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}
          <button type='button' className='handle-switch-btn' onClick={handleSwitch}>{isSignUp ? "Log In" : "Sign Up"}</button>
        </p>
      </div>
    </section>
  )
}

export default Auth