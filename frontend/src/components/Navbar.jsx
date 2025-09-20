import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {Link as RouterLink} from "react-router-dom"
import { Box, Button,Link, Typography} from "@mui/material"

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BOOK STORE
          </Typography>
          <Link component={RouterLink} color="inherit" to="/register" sx={{marginRight:2,textDecoration:"none"}}>
                Sign Up
            </Link>
              <Link component={RouterLink} color="inherit" sx={{marginRight:2,textDecoration:"none"}} to="/login">
                Log In
            </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}