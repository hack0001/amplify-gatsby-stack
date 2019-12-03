import React, { Fragment, useState, useContext } from "react"
import { Auth } from "aws-amplify"
import SignIn from "../signIn/signIn"
import ChangePass from "../signIn/newPassword"
import ForgotPass from "../signIn/forgotPassword"
import Context from "../../context/authContext"
import { navigate } from "@reach/router"

const AuthSignIn = () => {
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
    header: "Sign in",
    forgotPassword: false,
    forgotPasswordCode: "",
    forgotPasswordReset: "",
    forgotPasswordResetConfirm: "",
    isLogin: false,
    direction: null,
    showSignIn: true,
    error: null,
    newPassRequired: false,
    newPassword1: "",
    newPassword2: "",
    cognitoUser: null,
  })

  const { login } = useContext(Context)

  const handleSignIn = async e => {
    e.preventDefault()
    const { email, password } = authData
    try {
      const user = await Auth.signIn(email, password)
      if (
        user.challengeName === "NEW_PASSWORD_REQUIRED" ||
        user.challengeName === "PasswordResetRequiredException"
      ) {
        const newDirection = authData.direction === "left" ? "right" : "left"
        setAuthData({
          ...authData,
          newPassRequired: true,
          direction: newDirection,
          showSignIn: false,
          error: null,
          cognitoUser: user,
          header: "Change Password",
        })
      } else {
        const admin = user.signInUserSession.accessToken.payload[
          "cognito:groups"
        ].includes("Admin")

        login(user, admin)
      }
    } catch (err) {
      setAuthData({ ...authData, error: err.message, password: "" })
    }
  }

  const handlePasswordChange = async e => {
    e.preventDefault()
    const { newPassword1, newPassword2 } = authData
    try {
      if (newPassword1 === newPassword2) {
        await Auth.completeNewPassword(authData.cognitoUser, newPassword2)
        setAuthData({
          ...authData,
          header: "Password Changed Successfully, Please Re-Enter Your Details",
        })
        navigate("/home")
      } else {
        setAuthData({
          ...authData,
          error: "Passwords don't match, please try again",
        })
      }
    } catch (err) {
      console.log("Error occurred in Sign In", err)
      setAuthData({ ...authData, error: err.message })
    }
  }

  const handleForgotPassword = async e => {
    e.preventDefault()

    try {
      await Auth.forgotPassword(authData.email)
      setAuthData({
        ...authData,
        showSignIn: false,
        forgotPassword: true,
        error: "",
        header:
          "A Code Has Been Sent To Your Inbox. Please Enter The Digits Below With A New Password",
      })
    } catch (err) {
      console.log("Error occurred in Forgot Password Request", err)
      setAuthData({ ...authData, error: err.message })
    }
  }

  const handleForgotPasswordReset = async e => {
    e.preventDefault()
    const {
      email,
      forgotPasswordCode,
      forgotPasswordReset,
      forgotPasswordResetConfirm,
    } = authData

    try {
      if (forgotPasswordReset !== forgotPasswordResetConfirm) {
        setAuthData({
          ...authData,
          error: "Passwords don't match, please try again",
        })
      } else {
        await Auth.forgotPasswordSubmit(
          email,
          forgotPasswordCode,
          forgotPasswordReset
        )
        setAuthData({
          ...authData,
          showSignIn: true,
          forgotPassword: false,
          error: "",
          header: "Password Successfully Reset, Please Re-Enter Your Details",
        })
      }
    } catch (err) {
      console.log("Error occurred in Sign In", err)
      setAuthData({ ...authData, error: err.message })
    }
  }

  const handleUpdate = e => {
    setAuthData({ ...authData, [e.target.name]: e.target.value })
  }

  const switchModeHandler = () => {
    setAuthData(...authData, prevState => {
      return { isLogin: !prevState.isLogin }
    })
  }

  return (
    <Fragment>
      {authData.showSignIn && (
        <SignIn
          {...authData}
          handleSignIn={handleSignIn}
          handleUpdate={handleUpdate}
          handleForgotPassword={handleForgotPassword}
        />
      )}
      {authData.newPassRequired && (
        <ChangePass
          {...authData}
          handlePasswordChange={handlePasswordChange}
          handleUpdate={handleUpdate}
        />
      )}
      {authData.forgotPassword && (
        <ForgotPass
          {...authData}
          handleForgotPasswordReset={handleForgotPasswordReset}
          handleUpdate={handleUpdate}
        />
      )}
    </Fragment>
  )
}

export default AuthSignIn
