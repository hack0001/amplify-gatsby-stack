import React from "react"
import { Link } from "gatsby"

import { navigate } from "@reach/router"

import { logUserOut, isLoggedIn } from "../../utils/auth"
import { Auth } from "aws-amplify"

const Header = ({ siteTitle }) => {
  const signOut = async () => {
    try {
      await Auth.signOut()
      logUserOut(() => navigate("/dashboard/login"))
    } catch (err) {
      console.log("eror:", err)
    }
  }

  return (
    <div
      style={{
        background: "rebeccapurple",
        marginBottom: "1.45rem",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 960,
          padding: "1.45rem 1.0875rem",
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link to="/" style={styles.headerTitle}>
            {siteTitle}
          </Link>
        </h1>
        {isLoggedIn() && (
          <p onClick={signOut} style={styles.link}>
            Sign Out
          </p>
        )}
      </div>
    </div>
  )
}

const styles = {
  headerTitle: {
    color: "white",
    textDecoration: "none",
  },
  link: {
    cursor: "pointer",
    color: "white",
    textDecoration: "underline",
  },
}

export default Header
