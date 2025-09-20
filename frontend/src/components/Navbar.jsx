import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link as RouterLink, useNavigate} from "react-router-dom"
import { Box, Button,Link, Typography} from "@mui/material"
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [username,setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const savedUser = localStorage.getItem("username");
        if(savedUser){
            setUsername(savedUser)
        }
    },[])

    const handleLogout =() =>{
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername(null);
        navigate("/login")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BOOK STORE
          </Typography>
          {!username?(
            <>
            <Link component={RouterLink} color="inherit" to="/register" sx={{marginRight:2,textDecoration:"none"}}>
                Sign Up
            </Link>
              <Link component={RouterLink} color="inherit" sx={{marginRight:2,textDecoration:"none"}} to="/login">
                Log In
            </Link>
            </>
          ):(
            <>
             <Typography sx={{ marginRight: 2 }}>{username}</Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}