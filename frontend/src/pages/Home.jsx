import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [genreFilter, setGenreFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
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

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Reset filters when searching
    if (value) {
      setGenreFilter("");
      setMinPrice("");
      setMaxPrice("");
    }
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(async () => {
      try {
        const url = value ? `http://localhost:8000/books/search?text=${encodeURIComponent(value)}` : "http://localhost:8000/books";
        const res = await axios.get(url);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 300);
    setTypingTimeout(timeout);
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    setQuery("");
    const params = new URLSearchParams();
    if (genreFilter) params.append("genre", genreFilter);
    if (minPrice !== "") params.append("minPrice", String(minPrice));
    if (maxPrice !== "") params.append("maxPrice", String(maxPrice));
    const url = params.toString()
      ? `http://localhost:8000/books/filter?${params.toString()}`
      : "http://localhost:8000/books";
    try {
      const res = await axios.get(url);
      setBooks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearFilters = async () => {
    setGenreFilter("");
    setMinPrice("");
    setMaxPrice("");
    const res = await axios.get("http://localhost:8000/books");
    setBooks(res.data);
  };

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
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={handleSearchChange}
        />
      </Form>
      <Form className="mb-3" onSubmit={handleApplyFilters}>
        <Row className="g-2 align-items-end">
          <Col xs={12} md={4}>
            <Form.Label className="mb-1">Genre</Form.Label>
            <Form.Select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
              <option value="">All</option>
              <option value="Drama">Drama</option>
              <option value="Development">Development</option>
              <option value="Action">Action</option>
            </Form.Select>
          </Col>
          <Col xs={6} md={3}>
            <Form.Label className="mb-1">Min Price</Form.Label>
            <Form.Control type="number" min="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
          </Col>
          <Col xs={6} md={3}>
            <Form.Label className="mb-1">Max Price</Form.Label>
            <Form.Control type="number" min="0" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </Col>
          <Col xs={12} md={2} className="d-flex gap-2">
            <Button type="submit" variant="primary" className="w-100">Apply</Button>
            <Button type="button" variant="outline-secondary" onClick={handleClearFilters} className="w-100">Clear</Button>
          </Col>
        </Row>
      </Form>
      <Row className="g-3">
        {books.map((book) => (
          <Col xs={12} sm={6} md={4} key={book._id}>
            <Card className="h-100" onClick={() => handleDetails(book._id)} style={{ cursor: 'pointer' }}>
            {book.bookCoverImage && (
                <Card.Img
                  variant="top"
                  src={
                    book.bookCoverImage.startsWith("http")
                      ? book.bookCoverImage
                      : `http://localhost:8000/uploads/${book.bookCoverImage}`
                  }
                  alt={book.title}
                />
              )}
              <Card.Body>
                <Card.Title className="mb-2">{book.title}</Card.Title>
                <Card.Text className="text-muted mb-1">Genre: {book.genre}</Card.Text>
                <Card.Text className="text-muted">Price: ${book.price}</Card.Text>
                <div className="d-flex gap-2">
                  <Button variant="outline-primary" size="sm" onClick={(e) => { e.stopPropagation(); navigate(`/books/${book._id}/edit`) }}>Update</Button>
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
