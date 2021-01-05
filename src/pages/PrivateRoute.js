import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useUserContext } from '../context/user_context'

const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext();
  
  return (
    <Route {...rest} render={() => {
      return myUser ? children : <Redirect to='/'></Redirect>
    }}></Route>
  );
}
export default PrivateRoute

// in the params of PrivateRoute we use the rest operator, which is where we collect the properties on the children, and then in the return we spread out the rest, in our case the children is the <Checkout /> page