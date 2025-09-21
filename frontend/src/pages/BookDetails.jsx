import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Typography, Card, CardContent } from "@mui/material";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

useEffect(() => {
  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/books/${id}`);
      setBook(res.data);
    } catch (err) {
     console.error(err)
  };
}
  fetchBook();
}, [id]);

  if (!book) return <h2>Loading book...</h2>;

  return (
    <Container>
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h4">{book.name}</Typography>
          <Typography variant="h6">Author: {book.author}</Typography>
          <Typography variant="body1">Price: ${book.price}</Typography>
          <Typography variant="body2" color="text.secondary">
            Category: {book.category || "No category"}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}