import React, { Component } from "react"
import { navigate } from "@reach/router"
import { isLoggedIn } from "../utils/auth"

class PrivateRoute extends Component {
  render() {
    const { component: Component, location, ...rest } = this.props
    if (!isLoggedIn()) {
      navigate(`/dashboard/login`)
      return null
    }
    return <Component {...rest} />
  }
}

export default PrivateRoute
