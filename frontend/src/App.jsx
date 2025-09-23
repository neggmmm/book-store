import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import BookDetails from "./pages/BookDetails";
import CreateBook from "./pages/CreateBook";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
     <Navbar />
      <Routes>
        <Route path="/add" element={<CreateBook />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/me" element={<Profile />}/>
        <Route path="/books/:id" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}