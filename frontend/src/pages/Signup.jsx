import { LockOutline } from "@mui/icons-material"
import {Avatar, Box, Button, Container,Grid,Link,Paper, TextField, Typography} from "@mui/material"
import { useState } from "react"
import {Link as RouterLink, useNavigate} from "react-router-dom"
import axios from "axios"
export default function Signup() {
    const [email,setEmail] = useState("");
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("");
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8000/auth/register", {
        email,
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username",res.data.username);
      localStorage.setItem("id", res.data.id); 
      navigate("/")
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };
  return (
      <Container maxWidth="xs">
        <Paper elevation={10} sx={{marginTop:8,padding:2}}>
            <Avatar sx={{mx:"auto",bgcolor:"secondary.main",textAlign:"center",mb:1}}>
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
                onChange={(e) => setEmail(e.target.value)}
                sx={{mb:2}}
                />
                 <TextField 
                placeholder="Enter Username"
                fullWidth
                required
                onChange={(e) => setUsername(e.target.value)}
                sx={{mb:2}}
                />

                <TextField 
                placeholder="Enter Password"
                fullWidth
                required
                type="password"
                onChange={(e) => setPassword(e.target.value)}
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
