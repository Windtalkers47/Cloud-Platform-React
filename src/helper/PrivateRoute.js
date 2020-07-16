import React from 'react'
import { Redirect, Route } from "react-router-dom"
var authToken = true
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      authToken ?
          <Component {...props} />
      : <Redirect to="/login" />
  )}
  />
  )
}

export default PrivateRoute