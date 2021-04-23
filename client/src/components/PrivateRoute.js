import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { Consumer } from '../Context'

/*
* functional component that requires user login before allowing access to the route
*/
const PrivateRoute = ({ component: Component, ...rest }) => {
  return ( // The <Consumer> component subscribes PrivateRoute to all the actions and data provided by Context.js
    <Consumer>
      {context => (
        <Route
          {...rest}
          render={
              props => context.authenticatedUser
            ? (
              <Component {...props} />
              )
            :
              (
                <Redirect to={{
                  pathname: '/signin',
                  state: { from: props.location }
                }}
                />
              )
        }
        />
      )}
    </Consumer>
  )
}

export default PrivateRoute
