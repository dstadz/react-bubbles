import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const isAuthenticated = () => {
  return sessionStorage.getItem("token") ? true : false;
};

export default function PrivateRoute ({ children, ...rest}) {
  console.log("...rest", rest);
  console.log("...chidren", children);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated() 
        ? (children)
        : (<Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />)
      }
    />
  );
}
