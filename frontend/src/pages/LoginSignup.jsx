import React, { useState } from 'react'
import './css/loginsignup.css'
import { config } from '../../public/constant';
const URLS= config.url;


const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const[formData,setFormData] =useState({
    username:"",
    password:'',
    email:'',
  });

  const changeHandler =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  const login =async()=>{
    console.log("login",formData);
    console.log("signup",formData);
    let responseData;
    await fetch('https://kapada-backend.onrender.com/login',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.sucess){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.error);
    }
  }

  const sign_up =async()=>{
    console.log("signup",formData);
    let responseData;
    await fetch('https://kapada-backend.onrender.com/signup',{
      method:'POST',
      headers:{
        Accept:'application/form-data',
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.sucess){
      localStorage.setItem('auth-token',responseData.token);
      window.location.replace('/');
    }
    else{
      alert(responseData.error);
    }
  }

  return (
    <div className='loginsignup'>
    <div className='loginsignup-container'>
      <h1>{state}</h1>
      <div className='loginsignup-fields'>
        {state==="Sign Up"?<input name='username' value={formData.username} onChange={changeHandler}type='text' placeholder='Your Name' />:<></>}
        <input name='email' value={formData.email} 
        onChange={changeHandler} type='email' placeholder='Email' />
        <input name='password' value={formData.password} 
        onChange={changeHandler}type='password' placeholder='Password'/>
      </div>
    
    <button onClick={()=>{state==="Login"?login():sign_up()}}>Continue</button>
    {state==="Sign Up"?
      <p className='loginsignup-login'>Already have an account? <span onClick={()=>{setState("Login")}}>Login Here</span></p>
      :<p className='loginsignup-login'>Create an Account <span onClick={()=>{setState("Sign Up")}}>Click Here</span></p>}
    
    
      <div className='loginsignup-agree'>
        <input type='checkbox' name='' id='' />
        <p>By continuing i agreee to the terms of use and pirvacy policy.</p>
      </div>
      </div>
    </div>
  )
}

export default LoginSignup
