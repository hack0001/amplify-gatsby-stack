import React from "react"

export default React.createContext({
  token: null,
  userId: null,
  username: null,
  profileId: null,
  login: (token, userId, tokenExpiration) => {},
  logout: () => {},
  handleCurrentTab: newTab => {},
  currentTabName: null,
  admin: null,
  siteNames: null,
  chatUserId: null,
})
