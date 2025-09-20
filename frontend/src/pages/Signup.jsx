import { LockOutline } from "@mui/icons-material"
import {Avatar, Box, Button, Container,Grid,Link,Paper, TextField, Typography} from "@mui/material"
import {Link as RouterLink} from "react-router-dom"

export default function Signup() {
    const handleSubmit = () =>{
        console.log("Signed up")
    }
  return (
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{marginTop:8,padding:2}}>
            <Avatar sx={{
                mx:"auto",
                bgcolor:"secondary.main",
                textAlign:"center",
                mb:1
            }}>
                <LockOutline />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{textAlign:"center"}}>
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt:1}}>
                <TextField 
                placeholder="Enter Email"
                fullWidth
                required
                autoFocus
                type="email"
                sx={{mb:2}}
                />
                 <TextField 
                placeholder="Enter Username"
                fullWidth
                required
                sx={{mb:2}}
                />

                <TextField 
                placeholder="Enter Password"
                fullWidth
                required
                type="password"
                sx={{mb:2}}
                />

                <Button type="submit" variant="contained" fullWidth sx={{mt:1}}>
                    Sign Up
                </Button>
            </Box>
            <Link component={RouterLink} to="/login">
                Log In
            </Link>
        </Paper>
    </Container>
  )
}
