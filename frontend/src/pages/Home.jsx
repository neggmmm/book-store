import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
export default function Home() {
    const [books,setBooks] = useState([]);
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
    return (
    
     <Container>
      <Typography variant="h4" sx={{ my: 2 }}>
        All Books
      </Typography>
      <Grid container spacing={2}>
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} key={book._id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{book.name}</Typography>
                <Typography variant="body2">Author: {book.author}</Typography>
                <Typography variant="body2">Price: ${book.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
