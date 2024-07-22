import { AppBar, Toolbar } from '@mui/material'
import React, { useContext } from 'react'
import Logo from './Logo'
import NavigationLink from './NavigationLink'
import { AuthContext } from '../context/authContext'
const Header = () => {
  const { user } = useContext(AuthContext)
  return (
    <AppBar
      sx={{ bgcolor: "transparent", position: "static", boxShadow: "none" }}
    >
      <Toolbar>
        <Logo />
        <div>
          {user ? <>
            <NavigationLink bg="#51538f"
              to="/chat"
              text="Go To Chat"
              textColor="white" />
            <NavigationLink
              bg="#51538f"
              textColor="white"
              to="/"
              text="logout"
            // onClick={auth.logout}
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
