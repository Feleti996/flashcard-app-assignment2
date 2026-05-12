import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../home.css";

const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-page">
      <h1 className="home-title">Flashcard Learning App</h1>

      <p className="home-subtitle">
        Study smarter. Track progress. Master your subjects.
      </p>

      <div className="home-buttons">
        {!user ? (
          <>
            <Link to="/login" className="home-btn primary">Login</Link>
            <Link to="/register" className="home-btn secondary">Create Account</Link>
          </>
        ) : (
          <>
            <Link to="/flashcards" className="home-btn primary">My Flashcards</Link>
            <Link to="/study" className="home-btn secondary">Study Mode</Link>
            <Link to="/history" className="home-btn secondary">Study History</Link>

            {user.role === "admin" && (
              <Link to="/admin" className="home-btn secondary">Admin Dashboard</Link>
            )}
          </>
        )}
      </div>

      {/* Optional feature cards section */}
      <div className="home-features">
        <div className="feature-card">
          <h3>Flashcards</h3>
          <p>Create, edit, and organize your study cards.</p>
        </div>

        <div className="feature-card">
          <h3>Study Mode</h3>
          <p>Flip cards, track progress, and test your memory.</p>
        </div>

        <div className="feature-card">
          <h3>History</h3>
          <p>Review your past study sessions and results.</p>
        </div>

        {user?.role === "admin" && (
          <div className="feature-card">
            <h3>Admin Dashboard</h3>
            <p>Manage users, flashcards, and study history.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;



