import { useState } from "react";
import { LockOutline } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Link, Paper, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await axios.post("http://localhost:8000/auth/login", {
        email,
        password,
      });
      console.log(res)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("id", res.data.id); 
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={10} sx={{ marginTop: 8, padding: 2 }}>
        <Avatar
          sx={{
            mx: "auto",
            bgcolor: "secondary.main",
            textAlign: "center",
            mb: 1,
          }}
        >
          <LockOutline />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ textAlign: "center" }}>
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            placeholder="Enter Email"
            fullWidth
            required
            autoFocus
            type="email"
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            placeholder="Enter Password"
            fullWidth
            required
            type="password"
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
            Log In
          </Button>
        </Box>
        <Link component={RouterLink} to="/register">
          Sign Up
        </Link>
      </Paper>
    </Container>
  );
}