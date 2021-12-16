import React from 'react'
import AuthService from '../services/authService'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ render: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const user = AuthService.getCurrentUser();

  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute