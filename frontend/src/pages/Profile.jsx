import axios from "axios";
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:8000/auth/me", {
        headers: { Authorization: token },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!user) return <h2>Loading profile...</h2>;

  return (
    <div>
      <h1>Username: {user.username}</h1>
      <h3>ID: {user.id}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  );
}