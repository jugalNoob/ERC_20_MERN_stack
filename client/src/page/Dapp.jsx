import React,{useState ,useContext, useEffect} from 'react'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
// import { loadContract } from "./utils/load-contract.js"
import { LoginContext } from './ContextProvider/Context';
import ABI from "./ABI.json"
import {NavLink ,useHistory} from "react-router-dom"
import "./style/dapp.css"
function Dapp() {
////////////ERRORS/////////
const { logindata, setLoginData } = useContext(LoginContext);
const history=useHistory();
const dashborad=async()=>{
  let token=localStorage.getItem("usersdatatoken")
  console.log(token)
  const res = await fetch("/validuser", {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": token
    }
  });
  // console.log(res)
  const data=await res.json();
  if(data.status === 401 || !data){
  history.push("/error")
    console.log("error page rediirect")
  }else{
    // setLoginData(data)
    console.log("user verifying")
    setLoginData(data)
    history.push("/dapp")     
  }
}
useEffect(()=>{
  dashborad();
},[])


  /////////////web3API/////////////////
  const [webApi , setWebapi]=useState({

    provider: null,

        web3: null,
        // Contract:null,

  })

  //metamask conncat blockchain

  
  useEffect(() => {


    const loadProvider = async() => {


        const provider = await detectEthereumProvider();

        // const contract = await loadContract("Funder", provider)



        if (provider) {

            provider.request({ method: "eth_requestAccounts" })

            setWebapi({
                web3: new Web3(provider),

                provider,
                // contract

            });
        } else {

            console.error("please install MetaMask")
        }


    }

    loadProvider()

}, [])

console.log(webApi.web3)

//ACCOUNT NUMBER 
const [account, setAccount] = useState(null);



useEffect(() => {


    const getAccount = async() => {


        const accounts = await webApi.web3.eth.getAccounts()

        setAccount(accounts[0])

    }

    webApi.web3 && getAccount()

}, [webApi.web3])

//DAPP start row class line

//check balance your dapp 

const [bal , setBal]=useState("");


const DataBase=async()=>{
  const {web3}=webApi;

  var MyContract = new web3.eth.Contract(ABI,"0xb5d0BC80810047784eac2c6AbCaD1d9008DD57c0")
  MyContract.methods.balanceOf(bal).call({from:account}).then(alert)



}


//transfer your cryptocurreny to another account

const [to , setTo]=useState("");

const [val , setVal]=useState("");


const Trans=async(e)=>{

 
  e.preventDefault();
  const {web3}=webApi;

  var MyContract = new web3.eth.Contract(ABI,"0xb5d0BC80810047784eac2c6AbCaD1d9008DD57c0")
  MyContract.methods.transfer(to , val).send({from:account}).then(alert)


}

//totalsupply

const tot=async()=>{

  const {web3}=webApi;

  var MyContract = new web3.eth.Contract(ABI,"0xb5d0BC80810047784eac2c6AbCaD1d9008DD57c0")
  MyContract.methods.totalSupply().call({from:account}).then(alert)

}

//name of crypto

const nam=async()=>{
  const {web3}=webApi;
  var MyContract = new web3.eth.Contract(ABI,"0xb5d0BC80810047784eac2c6AbCaD1d9008DD57c0")
  MyContract.methods.name().call({from:account}).then(alert)

}




//symbol of crypto

const sym=async()=>{

  const {web3}=webApi;
  var MyContract = new web3.eth.Contract(ABI,"0xb5d0BC80810047784eac2c6AbCaD1d9008DD57c0")
  MyContract.methods.symbol().call({from:account}).then(alert)

}




  return (
    <div>



      <h1>User Email:{logindata ? logindata.ValidUserOne.email : ""}</h1>
      <NavLink to="/">Home</NavLink>

<div className="met">

<h1>metamask account::{account ? account : " connect"}</h1>
</div>


<div className="bals">
<form >

<input type="text" name="bal" value={bal} onChange={(e)=>setBal(e.target.value)} id=""  placeholder='enter metamask account'/>
<br />
<br />
<button className='btn1' onClick={DataBase}>check_Balance</button>
</form>


</div>


<br />



{/* transfer your account to another account form */}

<div className="transfer">

<form>

<input type="text" name="to" onChange={(e)=>setTo(e.target.value)}   placeholder='enter another account' />

<br />
<br />

<input type="text" name="" onChange={(e)=>setVal(e.target.value)}  placeholder='enter your value' />


<br />
<br />
<button onClick={Trans}>transfer</button>

</form>



</div>



{/* total supply */}


<div className="alld">

<button onClick={tot}>total_supply</button>

<br />
<br />

{/* names */}

<button onClick={nam}>Name</button>

<br />
<br />

{/* symbol crypto */}

<button onClick={sym}>sy-00mbol</button>
<br />
<br />

</div>


{/* last row class line */}
    </div>
  )
}

export default Dapp