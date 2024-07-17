import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import LockIcon from '@mui/icons-material/LockRounded';
import EmailIcon from '@mui/icons-material/EmailRounded';
import { handleError ,handleSuccess } from '../utils';


function Login() {

const [loginInfo,setLoginInfo] = useState({
  email:'',
  password:''
})

const navigate = useNavigate();

const handleChange = (e) => {
  const {name,value} = e.target;
  console.log(name,value);
  const copyLoginInfo = {...loginInfo}
  copyLoginInfo[name]=value;
  setLoginInfo(copyLoginInfo)
}
console.log('loginInfor->',loginInfo)

const handleLogin = async (e)=>{
e.preventDefault();
const {email,password} = loginInfo;
if (!email || !password){
  return (handleError("Email and password are required"));
}
try{
  const url = "https://money-tracker-silk-delta.vercel.app/auth/login"
  const response = await fetch(url,{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginInfo)
  });
  const result = await response.json();
  const {success, message,jwtToken,name, error} = result;
  if(success){
    handleSuccess(message);
    localStorage.setItem('token', jwtToken);
    localStorage.setItem('loggedInUser', name);
    localStorage.setItem('email', email);
    setTimeout(() =>{
      navigate('/home')
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
      <div className='curved-shape Login align-self-center'></div>
      <div className='info-content Login'>
        <h2>WELCOME BACK!</h2>
        <p>Hey there! Please login to Continue</p>
      </div>
      <div className='form-box Login'>
        <h2>Login</h2>
        <form className='m-0 ' onSubmit={handleLogin}>
          <div className='input-box'>
            <input 
            onChange={handleChange}
            type='email' 
            name='email'
            autoFocus
            placeholder=''
            value={loginInfo.email}
            />
            <label htmlFor='email'>Email</label>
            <EmailIcon className='icon' />
          </div>
          <div className='input-box'>
            <input 
            onChange={handleChange}
            type='password'
            name='password' 
            placeholder=''
            value={loginInfo.password}
            />
            <label htmlFor='password'>Password</label>
            <LockIcon className='icon' />
          </div>
          <div className='input-box'>
            <button type='submit' className='btn'>Login</button>
          </div>
          <div className='regi-link'>
            <span>Don't have an account ? 
              <Link className='link' to='/signup'> Signup</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}

export default Login;
