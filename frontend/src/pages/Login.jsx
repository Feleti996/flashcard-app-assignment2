import { useState, useContext, useEffect } from "react";
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import "../auth.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, user } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser(form);

      if (!data || data.error || data.message) {
        setError(data?.error || data?.message || "Login failed");
        return;
      }

      login(data);
      navigate("/");
    } catch (err) {
      setError("Cannot connect to server");
      console.error("LOGIN ERROR:", err);
    }
  };

  return (
    <div className="login-page">
      <div className="auth-container">
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
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

          <button type="submit">Login</button>
        </form>

        <p>
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

