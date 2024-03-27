import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  let navigate=useNavigate()
  const [cred,setCred]=useState({email:"",password:""})

  const handlechange=(e)=>{
    setCred({...cred,[e.target.name]:e.target.value})
  }

  const handleclick=async (e)=>{
    e.preventDefault();
    const response=await fetch(`http://localhost:5000/api/auth/login`,{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({email:cred.email,password:cred.password})
    });
    const json=await response.json();
    console.log(json)
    if(json.success){
        localStorage.setItem('token',json.authtoken)
        navigate("/")
        props.showAlert("Welcome Back User!!","success")
    }
    else{
      props.showAlert("Invalid Credentials","danger")
    }
  }

  return (
    <div>
      <h1 className="text-center" style={{marginTop:"58px"}}>Login</h1>
      <form className='container' style={{marginTop:"35px",width:"40rem",height:"50rem"}}>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name="email"value={cred.email} onChange={handlechange}aria-describedby="emailHelp"/>
        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name='password' value={cred.password} onChange={handlechange}/>
      </div>
      <button type="submit" class="btn btn-primary" onClick={handleclick}>Login</button>
    </form>
    </div>
  )
}

export default Login
