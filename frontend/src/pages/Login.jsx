import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import "../styles/auth.css";

export default function Login() {
  useEffect(() => {
    document.title = "Log in Page";
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // 🔐 VERY IMPORTANT
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", res.data.email);

      alert("Login successful");
      navigate("/tasks");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-box">
      <h2>Login</h2>

      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <div className="link">
        <Link to="/signup">Create new account</Link>
      </div>
    </div>
  );
}
