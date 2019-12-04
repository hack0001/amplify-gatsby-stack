import React from "react"
import { Link } from "gatsby"
import Layout from "./layout"

const Home = () => (
  <Layout>
    <h1>Home</h1>
    <p>
      You are now logged in! <Link to="/dashboard/profile">View profile</Link>
    </p>
    <p>
      Now go build something great and deploy it using the{" "}
      <a href="https://console.amplify.aws">AWS Amplify Console</a>
    </p>
  </Layout>
)

export default Home
