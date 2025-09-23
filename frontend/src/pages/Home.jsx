import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
export default function Home() {
    const [books,setBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchBooks = async () =>{
            try{
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
            }catch(err){
                console.error(err)
            }
        };
        fetchBooks()
    },[])
    const handleDelete =async(id) =>{
      try{
        const token = localStorage.getItem("token");
        console.log(token)
        await axios.delete(`http://localhost:8000/books/${id}`,{
          headers: {
          Authorization: token,
          },
        })
      const filtered = books.filter((book) => book._id !== id);
      console.log(filtered)
      setBooks(filtered);
      }catch(err){
      console.error(err)
    }
  }
    const handleCard = (id) =>{
      navigate(`/books/${id}`)
    }
    return (
    
     <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        All Books
      </Typography>
      <Grid container spacing={2}>
  {books.map((book) => (
    <Grid onClick={()=>handleCard(book._id)} item xs={12} sm={6} md={4} key={book._id}>
      <Card sx={{ height: "100%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Author: {book.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: ${book.price}
          </Typography>
          <Button  onClick={(e) => {
                    e.stopPropagation(); // stops card click event
                    handleDelete(book._id);
                  }}>Delete</Button>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
    </Container>
  )
}
