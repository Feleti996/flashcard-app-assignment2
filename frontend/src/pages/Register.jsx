import { useState, useContext } from "react";
import { registerUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../auth.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { login, user } = useContext(AuthContext);
const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) navigate("/");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await registerUser(form);

      if (!data || data.error || data.message) {
        setError(data?.error || data?.message || "Registration failed");
        return;
      }

      // Auto-login after register
      login(data);

      // Redirect to home
      navigate("/");
    } catch (err) {
      setError("Cannot connect to server");
      console.error("REGISTER ERROR:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>Register</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
         <input
  type="text"
  name="username"
  placeholder="Username"
  value={form.username}
  onChange={handleChange}
  required
/>
 
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

