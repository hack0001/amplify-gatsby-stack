import React, { Fragment, useState, useEffect } from "react"
// import { Router } from "@reach/router"
// import { Auth, API, graphqlOperation } from "aws-amplify"
// import { MuiPickersUtilsProvider } from "@material-ui/pickers"
// import DateFnUtils from "@date-io/date-fns"
// import { navigate } from "@reach/router"
// import Layout from "../components/layout/layout"
// import Login from "../components/auth/SignIn"
// import Dashboard from "../components/dashboard/Dashboard"
// import SignIn from "../components/auth/SignIn"
// import AuthContext from "../context/authContext"
import { Router } from "@reach/router"
import Details from "../components/test/Details"
import Home from "../components/test/Home"
// import Login from "../components/test/Login"
import SignUp from "../components/test/SignUp"
import PrivateRoute from "../components/test/PrivateRoute"

import "../styles/App.css"
let Dash = () => <div>Fash</div>

const Dashboard = () => (
  <Router>
    {/* <SignUp path="/signup" /> */}
    <Dash path="/dashboard" />
    <PrivateRoute path="/dashboard/home" component={Home} />
    <PrivateRoute path="/dashboard/profile" component={Details} />
    {/* <Login path="/dashboard/login" /> */}
  </Router>
)

export default Dashboard
