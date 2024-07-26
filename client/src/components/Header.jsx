import { AppBar, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import Logo from './Logo'
import NavigationLink from './NavigationLink'
import { AuthContext } from '../context/authContext'
const Header = () => {
  const { user } = useContext(AuthContext)
  const { dispatch, loading, error } = useContext(AuthContext)
  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGOUT" })


  }
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar>
        <Logo />
        <div>
          {user ? <>
            
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/"
              text="logout"
              onClick={handleLogout}
            />
          </> : <>
            <NavigationLink
              bg="#00fffc"
              to="/login"
              text="Login"
              textColor="black"
            />
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/register"
              text="Register"
            />
          </>}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
