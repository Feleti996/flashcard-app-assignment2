import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../navbar.css";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
 const { theme, setTheme } = useContext(ThemeContext);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">Flashcards</Link>

        {user && (
          <>
            <Link to="/flashcards" className="nav-link">Flashcards</Link>
            <Link to="/study" className="nav-link">Study</Link>
            <Link to="/history" className="nav-link">History</Link>

            {user.role === "admin" && (
              <Link to="/admin" className="nav-link">Admin</Link>
            )}
          </>
        )}
      </div>
    <select
  id="theme-selector"
  name="theme"
  value={theme}
  onChange={(e) => setTheme(e.target.value)}
  className="theme-selector"
>

      <option value="theme1">Light Mode</option>
      <option value="theme2">Dark Mode</option>
      <option value="theme3">High Contrast</option>
    </select>

      <div className="nav-right">
        {!user ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Register</Link>
          </>
        ) : (
          <button className="nav-btn logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
