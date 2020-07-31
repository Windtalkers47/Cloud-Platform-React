import React from 'react'
import { Redirect, Route } from "react-router-dom"

var access_token = true

export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      access_token ?
          <Component {...props} />
      : <Redirect to="/login" />
  )}
  />
  )
}

export default PrivateRoute