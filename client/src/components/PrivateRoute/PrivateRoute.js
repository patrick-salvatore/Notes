import React from 'react';
import {Redirect, Route} from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          localStorage.getItem('jwt') ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/users/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
  
export default PrivateRoute;