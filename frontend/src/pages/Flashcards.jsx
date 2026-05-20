/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from "react";
import AddForm from "../components/AddForm";
import {
  getFlashcards,
  createFlashcard,
  deleteFlashcard,
  updateFlashcard,
} from "../services/flashcardService";
import { AuthContext } from "../context/AuthContext";
import "../flashcards.css";

function Flashcards() {
  const { token } = useContext(AuthContext);   
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchTerm, setSearchTerm] = useState("");

const loadFlashcards = async () => {
  try {
    const data = await getFlashcards(token);
data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (Array.isArray(data)) {
      setFlashcards(data);
    } else if (Array.isArray(data?.flashcards)) {
      setFlashcards(data.flashcards);
    } else {
      console.warn("Unexpected backend response:", data);
      setFlashcards([]);
    }
} catch (err) {
  console.error("Error loading flashcards:", err);
  setError("Error loading flashcards.");   // 🔵 INSERT HERE
  setFlashcards([]);
}
 finally {
    setLoading(false);
  }
};
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadFlashcards();
}, []);



if (loading) return <p>Loading flashcards...</p>;


 const addCard = async (card) => {
    try {
      const newCard = await createFlashcard(card, token);   

      if (newCard && typeof newCard === "object") {
setFlashcards((prev) => [newCard, ...prev]);
      }
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  const removeCard = async (id) => {
    try {
      await deleteFlashcard(id, token);  
      setFlashcards((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  const editCard = async (id, updated) => {
    try {
      const updatedCard = await updateFlashcard(id, updated, token);

      if (updatedCard) {
        setFlashcards((prev) =>
          prev.map((c) => (c._id === id ? updatedCard : c))
        );
      }
    } catch (err) {
      console.error("Error updating flashcard:", err);
    }
  };

  return (
    <div className="flashcards-page">
      <h2>My Flashcards</h2>
{error && <p className="flashcards-error">{error}</p>}
      <AddForm addCard={addCard} />
      <input
  type="text"
  placeholder="Search flashcards..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  className="search-input"
  style={{
    width: "100%",
    padding: "10px",
    marginTop: "15px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px"
  }}
/>



      {!loading && flashcards.length === 0 && (
  <div className="empty-state">
    <img src="/pen.png" alt="pen" className="pen-icon" />
    <p>No flashcards yet. Add your first one!</p>
  </div>
)}


      <div className="flashcards-grid">
{flashcards
  .filter((card) => {
    const q = card.question?.toLowerCase() || "";
    const a = card.answer?.toLowerCase() || "";
    const cat = card.category?.toLowerCase() || "";
    const s = searchTerm.toLowerCase();

    return q.includes(s) || a.includes(s) || cat.includes(s);
  })
  .map((card) => (


          <div key={card._id} className="flashcard">
            <div className="question">{card.question}</div>
            <div className="answer">{card.answer}</div>
            <div className="category">Category: {card.category}</div>

            <div className="actions">
              <button
  className="edit"
  onClick={() => {
    const newQuestion = prompt("New question:", card.question) || card.question;
    const newAnswer = prompt("New answer:", card.answer) || card.answer;
    const newCategory = prompt("New category:", card.category) || card.category;

    if (window.confirm("Save changes to this flashcard?")) {
      editCard(card._id, {
        question: newQuestion,
        answer: newAnswer,
        category: newCategory,
      });
    }
  }}
>
  Edit
</button>


             <button
  className="delete"
  onClick={() => {
    if (window.confirm("Are you sure you want to delete this flashcard?")) {
      removeCard(card._id);
    }
  }}
>
  Delete
</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flashcards;

