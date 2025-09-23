import axios from "axios";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function CreateBook() {
  const [bookData, setBookData] = useState({
    title: "",
    price: "",
    genre: "",
    description: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(bookData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (file) {
      formData.append("bookCoverImage", file); // must match backend multer field
    }

    const token = localStorage.getItem("token");

    try {
      await axios.post("http://localhost:8000/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      });
      alert("Book created successfully!");
    } catch (err) {
      console.error(err);
      alert("Error creating book");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Book name"
          name="title"
          value={bookData.title}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          placeholder="300"
          name="price"
          value={bookData.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Book Cover</Form.Label>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Genre</Form.Label>
        <Form.Select name="genre" value={bookData.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          <option value="Drama">Drama</option>
          <option value="Development">Development</option>
          <option value="Action">Action</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={bookData.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit" variant="primary">
        Create
      </Button>
    </Form>
  );
}
