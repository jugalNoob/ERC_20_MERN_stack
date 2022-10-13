import React,{useState,useContext} from 'react'
import { useEffect } from 'react';
import { NavLink,useHistory} from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "./ContextProvider/Context";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./style/home.css"

function Home() {
    const { logindata, setLoginData } = useContext(LoginContext);
    const history=useHistory();
  ////////////////////user  function button////
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
  /////////////////////// logout user////////////////////
  const loginout=async()=>{
  let token=localStorage.getItem("usersdatatoken")
  console.log(token)
  const res = await fetch("/logout", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept:"application/json",
    },
    Credentials:"include"
  });
  // console.log(res)
  const data=await res.json();
  if(data.status !== 201){
  console.log("error")
  history.push("/error")
    console.log("error page rediirect")
    alert("out if kyou have")
  }else{
    // setLoginData(data)
    console.log("user logout")
    localStorage.removeItem("usersdatatoken")
    setLoginData(false)
    history.push("/")
    alert("else out") 
  }
  }
  ////////////////////////////logout /////////////////////////////
  const goDash=()=>{
  
    history.push("/dapp")
  
  }
  
  const goError=()=>{
  history.push("/error")
  }
  
  const logindatas=()=>{
  
    history.push("/login")
  }
  
  const formdata=()=>{
  
    history.push("/form")
  }
  
  
  const homedata=()=>{
  
    history.push("/")
  }
  

    ////////////////API//////////////
    const [data , setDate]=useState([]);
    useEffect(()=>{
        const fetching=async()=>{
            await fetch(" https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false").then((res)=>res.json())
            .then((data)=>{

                setDate(data);
                console.log(data);
            })


        }

        fetching()

    },[])

    if(!data.length) return <div>Loding...</div>

  return (
    <div>
{/* first row  class line */}


<div className="avatar">
{
logindata.ValidUserOne ? <Avatar style={{background:"blue"}}  onClick={handleClick}>{logindata.ValidUserOne.name[0].toUpperCase()}</Avatar>:
<Avatar style={{ background: "blue" }} onClick={handleClick} />
} 
</div>
{/* end row class line start */}


{/* ////////////menu start row class function */}
<Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>

        {

          logindata.ValidUserOne ? (
            <div>

<MenuItem onClick={() => {
        homedata()
        handleClose()
}}>Home</MenuItem>

             <MenuItem onClick={() => {
              goDash()
               handleClose()
              }}>Dapp</MenuItem>
  {/* ////////main logout line start///////////// */}
        <MenuItem onClick={()=>{
          loginout()
          handleClose()
        }}>Logout</MenuItem> 
            </div>
          ):(
<div>
  {/* /////////////////use allNav Bar star//////////// */}
{/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}

<MenuItem onClick={() => {                                        // goError()
      homedata()
        handleClose()
}}>home</MenuItem>

<MenuItem onClick={() => {                                        // goError()
       goError()
        handleClose()
}}>dapp</MenuItem>



<MenuItem onClick={() => {                                        // goError()
        formdata()
        handleClose()
}}>Form</MenuItem>

<MenuItem onClick={() => {                                        // goError()
        logindatas()
        handleClose()
}}>Login</MenuItem>
</div>

          )
        }
     
      </Menu>


      {/* ///////////////////second row class media */}

<div className='start'>

<div className="logo">

    
<i class="fab fa-ethereum"></i>
</div>

<div className="head-one">

<h1>Ethereum</h1>

    </div>

    <div className="nav">

<ul>
{/* 
<NavLink to="/">Home</NavLink>
<NavLink to="/dapp">Dapp</NavLink>
<NavLink to="/form">Form</NavLink>
<NavLink to="/login">Login</NavLink> */}

</ul>

    </div>

</div>

{/* second row class line start */}



<div className="second">

<div className="head-two">

<h1>to investing</h1>
<h2>my cryptocurrency</h2>
<br />
<br />


<NavLink to="/form">start</NavLink>

</div>


<div className="image">

<img src="https://img-new.cgtrader.com/items/2785511/a32edcc837/large/ethereum-3d-model-obj.jpg" alt="" />
</div>
</div>

{/* api row class line */}

<div className="third">

<div className="bitcoin">

<h1>bitcoin</h1>
    <h2>high_price_24h:{data[0].current_price}</h2>
    <h2>low_price_24h:{data[0].low_24h}</h2>
    <h3>supply:{data[0].max_supply}</h3>

</div>

<div className="eth">
<h1>ethereum</h1>
<h2>high_price_24h:{data[1].current_price}</h2>
    <h2>low_price_24h:{data[1].low_24h}</h2>
    <h3>nothingsupply{data[1].max_supply}</h3>
</div>

<div className="bina">

<h1>binance</h1>
<h2>high_price_24h{data[4].current_price}</h2>
    <h2>low_price_24h{data[4].low_24h}</h2>
    <h3>supply{data[4].max_supply}</h3>
</div>

</div>



{/* last row class line */}

    </div>
  )
}

export default Home







// import React from 'react'
// import { NavLink } from 'react-router-dom'

// function Home() {
//   return (
//     <div>
// <NavLink to="/">home</NavLink>
// <br />
// <br />
// <NavLink to="/dapp">dapp</NavLink>
// <br />
// <br />

// <NavLink to="/error">error</NavLink>
// <br />
// <br />
// <NavLink to="/login">login</NavLink>
// <br />
// <br />
// <NavLink to="/form">form</NavLink>


//     </div>
//   )
// }

// export default Home