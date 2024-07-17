import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import LockIcon from '@mui/icons-material/LockRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';
import { useState } from 'react';
import { handleError , handleSuccess} from '../utils';


function Signup() {
  // const [state,setState] = useState(true)
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email:'',
    password: ''
  })

  const navigate = useNavigate();
  const handleChange = (e) => {
    const {name,value} = e.target;
    console.log(name,value);
    const copysignupInfo = {...signupInfo}
    copysignupInfo[name]=value;
    setSignupInfo(copysignupInfo)
  }
  console.log('signupInfo->',signupInfo)

const handleSignup = async (e)=>{
  e.preventDefault();
  const {name,email,password} = signupInfo;
  if (!name || !email || !password){
    return (handleError("Name email and password are required"));
  }
  try{
    const url = "https://money-tracker-silk-delta.vercel.app/auth/signup"
    const response = await fetch(url,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signupInfo)
    });
    const result = await response.json();
    const {success, message, error} = result;
    if(success){
      handleSuccess(message);
      setTimeout(() =>{
        navigate('/login')
      },1000)
    }
    else if(error){
      const details = error.details[0].message;
      handleError(details);
    } else if (!success){
      handleError(message);
    }
    console.log(result);

  }catch(err){
    handleError(err);
  }
}



  return (
  <>
    <div className='container m-auto'>
      <div className='curved-shape Signup'></div>
      <div className='info-content Signup'>
        <h2>Create New Account</h2>
        <p>Hey there! Please Register here inorder to Login</p>
      </div>
      <div className='form-box Signup'>
        <h2>Signup</h2>
        <form className="form" onSubmit={handleSignup}>
          <div className='input-box'>
            <input 
            onChange={handleChange}
            type='text'  
            name='name'
            autoFocus
            // required
            placeholder=''
            />
            <label htmlFor='name'>Name</label>
            <PersonIcon className='icon'/>
          </div>
          <div className='input-box'>
            <input 
            onChange={handleChange}
            type='email' 
            name='email'
            // required
            placeholder=''
            />
            <label htmlFor='email'>Email</label>
            <EmailIcon className='icon'/>
          </div>
          <div className='input-box'>
            <input 
            onChange={handleChange}
            type='password'
            name='password' 
            // required
            placeholder=''
            />
            <label htmlFor='password'>Password</label>
            <LockIcon className='icon'/>
          </div>
          <div className='input-box'>
            <button type='submit' className='btn'>Register</button>
          </div>
          <div className='regi-link'>
            <span>Already have an account ? 
              <Link className='link' to='/Login'> SignIn</Link>
            </span>
          </div>
        </form>    
      </div>
    </div>
      <ToastContainer/>
  </>
  )
}

export default Signup;
