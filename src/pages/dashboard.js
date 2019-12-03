import React, { Fragment, useState, useEffect } from "react"
import { Router } from "@reach/router"
import { Auth, API, graphqlOperation } from "aws-amplify"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnUtils from "@date-io/date-fns"
import { navigate } from "@reach/router"
// import Layout from "../components/layout/layout"
import Login from "../components/auth/SignIn"
import Dashboard from "../components/dashboard/Dashboard"
import SignIn from "../components/auth/SignIn"
import AuthContext from "../context/authContext"
import "../styles/App.css"

const App = () => {
  return <h1>Dashboard</h1>
}

export default App
