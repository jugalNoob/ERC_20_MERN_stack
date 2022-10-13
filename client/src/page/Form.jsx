import React from 'react'
import { useState } from 'react'

import {NavLink,useHistory} from "react-router-dom"
import "./style/form.css"

function Form() {

    const history=useHistory()


  const [user , setUser]=useState({
    name:"",
    email:"",
    password:"",
  });

  const hangfle=(e)=>{
    e.preventDefault();
    console.log(e)
  let name=e.target.name
  let value=e.target.value
  setUser({...user,[name]:value})
  }

  const Date=async(e)=>{
    e.preventDefault();
    ///////////////////
    /////////////////////name
    if (!user.name) {
        alert("please enter your name")
       } else if (user.name.length < 5) {
        alert("minemum 5 letter")
       } else if (user.name.length > 10) {
           console.log("welcome ")
       }
       //////////////////////
///////////////password line appp
    if (!user.password) {
     alert("please enter your password")
    } else if (user.password.length < 5) {
     alert("minemum 5 letter")
    } else if (user.password.length > 10) {
        console.log("welcome ")
    }
    ////////////////////////////
/////////////////method POST ///LINe
const {name , email , password }=user;

const users=await fetch("/Signup",{
  method:"POST",
  headers:{
  "Content-Type": "application/json",
  },
  body:JSON.stringify({
    name,
  email,
  password,
  })
  })      
  const res=await users.json();
  if(users.status === 400 || !res){
      window.alert("enter your form ")
  }else{
      alert("is complete")
      history.push("/login")
  }
//////////////last row method cclass row line
  }

  return (
    <div>
        {/* first row class line start  */}
        <div className="sign">
  <h1>sign_up</h1>

<center>


<form method='POST'>
<input type="text" name="name" required  autoComplete="off" value={user.name} onChange={hangfle} placeholder="enter your name" id="" />
<br />
<br />
<input type="email" name="email" required autoComplete="off" value={user.email} onChange={hangfle} placeholder="enter your email" id="" />
<br />
<br />
<input type="password" name="password" required autoComplete="off" value={user.password} onChange={hangfle} placeholder="enter your password" id="" />
<br />
<br />
{/* <input type="submit" value="register" onClick={Date} name="" id="" /> */}

<button className='btn'  onClick={Date}>register</button>
</form>
<br />
<br />

<p>you have already account? <NavLink to="/login">Login</NavLink></p>
</center>
</div>

{/* last row class line start */}
    </div>
  )
}

export default Form