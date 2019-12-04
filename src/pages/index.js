import React, { Fragment, useState, useEffect } from "react"
import { Router, Redirect, navigate } from "@reach/router"
import { Auth, API, graphqlOperation } from "aws-amplify"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import Image from "../components/images/image"
import SEO from "../components/meta/seo"
import Amplify from "aws-amplify"
import config from "../../aws-exports"
import DateFnUtils from "@date-io/date-fns"
import SignIn from "../components/auth/SignIn"
import AuthContext from "../context/authContext"
import "../styles/App.css"
import { setUser, isLoggedIn, logUserOut } from "../utils/auth"
import Login from "../components/auth/Login"
Amplify.configure(config)

const IndexPage = () => {
  const [data, setData] = useState({
    token: null,
    userId: null,
    username: null,
    profileId: null,
    admin: null,
    logOutError: null,
    currentTabName: "Dashboard",
    siteNames: null,
    chatUserId: null,
  })

  useEffect(() => {
    handleUser()
  }, [])

  const handleUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      const userId = user.attributes.email
      const userToken = user.signInUserSession.accessToken.jwtToken
      const admin = user.signInUserSession.accessToken.payload[
        "cognito:groups"
      ].includes("Admin")
      const userData = await API.graphql(
        graphqlOperation(`query listUser{
					listUsers(filter: {
					username:{eq:"${user.username}"}
					}) {
						items{
						id
						userId
						username
						chatUser{
							id
							creator
							alias
						}
						}
					}
				}`)
      )
      const siteData = await API.graphql(
        graphqlOperation(`query ListSites{
					listSites{
						items{
							id
							name
						}
					}
				}`)
      )

      const username = user.username
      const profileId = userData.data.listUsers.items[0].id
      const siteNames = siteData.data.listSites.items
      const chatUserId = userData.data.listUsers.items[0].chatUser.id
      setData({
        ...data,
        token: userToken,
        userId,
        admin,
        username,
        profileId,
        siteNames,
        chatUserId,
      })

      const userInfo = {
        ...user.attributes,
        username: user.username,
      }
      setUser(userInfo)
    } catch (err) {
      console.log("Error", err)
      setData({
        ...data,
        token: null,
        userId: null,
        admin: null,
        username: null,
        profileId: null,
        siteNames: null,
        chatUserId: null,
      })
    }
  }

  const handleCurrentTab = newTab => {
    setData({ ...data, currentTabName: newTab })
  }

  const login = async (user, admin) => {
    const userData = await API.graphql(
      graphqlOperation(`query listUser{
			listUsers(filter: {
				username:{eq:"${user.username}"}
				}) {
					items{
						id
						userId
						username
						chatUser{
							id
							creator
							alias
						}
					}
				}
			}`)
    )

    const siteData = await API.graphql(
      graphqlOperation(`query ListSites{
			listSites{
					items{
						id
						name
					}
				}
			}`)
    )
    setData({
      ...data,
      token: user.signInUserSession.accessToken.jwtToken,
      username: user.username,
      admin: admin,
      profileId: userData.data.listUsers.items[0].id,
      siteNames: siteData.data.listSites.items,
      chatUserId: userData.data.listUsers.items[0].chatUser.id,
    })
  }

  const logout = async () => {
    if (isLoggedIn) {
      try {
        await Auth.signOut()
        setData({
          ...data,
          token: null,
          userId: null,
          admin: null,
          username: null,
          profileId: null,
          siteNames: null,
          chatUserId: null,
        })
        logUserOut(() => navigate("/app/login"))
      } catch (err) {
        setData({
          ...data,
          logOutError:
            "Something went wrong when trying to log out. Please try again",
        })
      }
    }
  }

  return (
    <Router>
      {/* <MuiPickersUtilsProvider utils={DateFnUtils}> */}
      <AuthContext.Provider
        value={{
          token: data.token,
          userId: data.userId,
          username: data.username,
          profileId: data.profileId,
          siteNames: data.siteNames,
          login: () => login,
          logout: () => logout,
          admin: data.admin,
          logOutError: data.logOutError,
          handleCurrentTab: handleCurrentTab,
          currentTabName: data.currentTabName,
          chatUserId: data.chatUserId,
        }}
      >
        {!data.token && <SignIn path="/" />}
        {isLoggedIn() && data.token && <Redirect from="/" to="dashboard" />}
      </AuthContext.Provider>
      {/* </MuiPickersUtilsProvider> */}
    </Router>
  )
}

export default IndexPage

/* {this.state.token && (
									<Redirect from="/auth" to="/create/quiz" exact />
								)}
								{!this.state.token && (
									<Route path="/auth" exact component={SignIn} />
								)} */
