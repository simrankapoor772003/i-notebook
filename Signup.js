import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = (props) => {
  let navigate=useNavigate();
  const [cred,setCred]=useState({name:"",email:"",password:"",cpassword:""})
  const {name,email,password,cpassword}=cred

  const handlechange=(e)=>{
    setCred({...cred,[e.target.name]:e.target.value})
  }

  const handleclick=async (e)=>{
    e.preventDefault();
    const response=await fetch(`http://localhost:5000/api/auth/createuser`,{
      method:'POST',
      headers:{
        'Content-Type':"application/json",
      },
      body:JSON.stringify({name:cred.name,email:cred.email,password:cred.password})
    });
    const json=await response.json();
    console.log(json)
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      navigate("/")
      props.showAlert("Account Created Successfully","success")
    }
    else{
      props.showAlert("Invalid Details","danger")
    }
  }
  return (
    <div>
     <h1 className="text-center" style={{marginTop:"58px"}}>Sign Up</h1>
      <form className='container' style={{marginTop:"35px",width:"40rem",height:"50rem"}}>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="email" class="form-control" id="name" name='name' onChange={handlechange}aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input type="email" class="form-control" id="email" name='email' onChange={handlechange}aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" class="form-control" id="password" name='password' onChange={handlechange}aria-describedby="emailHelp"/>
      </div>
      <div class="mb-3">
        <label for="cpassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="cpassword" onChange={handlechange} name='cpassword'/>
      </div>
      <button type="submit" class="btn btn-primary" onClick={handleclick}>Sign Up</button>
    </form>
    </div>
  )
}

export default Signup

