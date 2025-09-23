import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err)
      }
    };
    fetchBooks()
  }, [])

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const authHeader = token && token.startsWith("Bearer ") ? token : `Bearer ${token || ""}`;
      await axios.delete(`http://localhost:8000/books/${id}`, {
        headers: {
          Authorization: authHeader,
        },
      })
      const filtered = books.filter((book) => book._id !== id);
      setBooks(filtered);
    } catch (err) {
      console.error(err)
    }
  }

  const handleDetails = (id) => {
    navigate(`/books/${id}`)
  }

  return (
    <Container className="py-3">
      <h4 className="mb-3">All Books</h4>
      <Row className="g-3">
        {books.map((book) => (
          <Col xs={12} sm={6} md={4} key={book._id}>
            <Card className="h-100" onClick={() => handleDetails(book._id)} style={{ cursor: 'pointer' }}>
              {book.bookCoverImage && (
                <Card.Img variant="top" src={`http://localhost:8000/uploads/${book.bookCoverImage}`} alt={book.title} />
              )}
              <Card.Body>
                <Card.Title className="mb-2">{book.title}</Card.Title>
                <Card.Text className="text-muted mb-1">Genre: {book.genre}</Card.Text>
                <Card.Text className="text-muted">Price: ${book.price}</Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); handleDetails(book._id); }}>Update</Button>
                  <Button variant="outline-danger" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(book._id); }}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
