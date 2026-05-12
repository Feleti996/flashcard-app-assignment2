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
  const { token } = useContext(AuthContext);   // ⭐ TOKEN FIX
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setFlashcards([]);
  } finally {
    setLoading(false);
  }
};
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  loadFlashcards();
}, []);


 const addCard = async (card) => {
    try {
      const newCard = await createFlashcard(card, token);   // ⭐ TOKEN FIX

      if (newCard && typeof newCard === "object") {
setFlashcards((prev) => [newCard, ...prev]);
      }
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  const removeCard = async (id) => {
    try {
      await deleteFlashcard(id, token);   // ⭐ TOKEN FIX
      setFlashcards((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting flashcard:", err);
    }
  };

  const editCard = async (id, updated) => {
    try {
      const updatedCard = await updateFlashcard(id, updated, token);   // ⭐ TOKEN FIX

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

      <AddForm addCard={addCard} />

      {loading && <p className="flashcards-empty">Loading flashcards...</p>}

      {!loading && flashcards.length === 0 && (
        <p className="flashcards-empty">No flashcards yet. Add your first one!</p>
      )}

      <div className="flashcards-grid">
        {flashcards.map((card) => (
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

