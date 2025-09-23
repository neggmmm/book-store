import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Spinner, Alert } from "react-bootstrap";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    genre: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/books/${id}`);
        const b = res.data;
        setBookData({
          title: b.title || "",
          price: b.price ?? "",
          genre: b.genre || "",
          description: b.description || "",
        });
      } catch (err) {
        setError("Failed to load book");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value);
    });
    if (file) {
      formData.append("bookCoverImage", file);
    }
    const token = localStorage.getItem("token");
    const authHeader = token && token.startsWith("Bearer ") ? token : `Bearer ${token || ""}`;
    try {
      await axios.put(`http://localhost:8000/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data", Authorization: authHeader },
      });
      navigate(`/books/${id}`);
    } catch (err) {
      setError("Failed to update book");
    }
  };

  if (loading) return <Spinner animation="border" role="status" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" name="title" value={bookData.title} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={bookData.price} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Control type="text" name="genre" value={bookData.genre} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={bookData.description} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Replace Cover (optional)</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      <Button type="submit" variant="primary">Update</Button>
    </Form>
  );
}


