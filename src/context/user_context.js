import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { isAuthenticated, loginWithRedirect, logout, user, isLoading } = useAuth0();

  const [myUser, setMyUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      setMyUser(user);
    }
    else {
      setMyUser(false);
    }
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{loginWithRedirect, logout, myUser}}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}

// since we already have Auth0 we really do not need the userContext, it's already wrapped  in AuthProvider
