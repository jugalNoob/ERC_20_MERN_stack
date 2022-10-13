import React from 'react'
import {Route} from "react-router-dom"
import Home from "./page/Home"
import Error from "./page/Error"
import Login from "./page/Login"
import Form from "./page/Form"
import Dapp from "./page/Dapp"
function App() {
  return (
    <div>

<Route exact path="/">

<Home/>
</Route>


<Route path="/error">
<Error/>
</Route>

<Route path="/dapp">
<Dapp/>

</Route>

<Route path="/login">

<Login/>
</Route>


<Route path="/form">

<Form/>
</Route>

    </div>
  )
}

export default App