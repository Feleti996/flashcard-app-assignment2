/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getFlashcards } from "../services/flashcardService";
import { addHistory } from "../services/historyService";
import "../study.css";
import { getAllAdminFlashcards } from "../services/adminService";

const StudyMode = () => {
const { token, user } = useContext(AuthContext);

  const [totalCards, setTotalCards] = useState(0);
  const [cards, setCards] = useState([]);
  const [currentCard, setCurrentCard] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const studiedCount = totalCards - cards.length;
const nextCard = () => {
  if (cards.length === 0) {
    setCurrentCard(null);
    return;
  }

  const randomIndex = Math.floor(Math.random() * cards.length);
  const selected = cards[randomIndex];

  setCurrentCard(selected);
  setFlipped(false);
};

// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (cards.length > 0 && !currentCard) {
    nextCard();
  }
}, [cards, currentCard]);




 // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const load = async () => {
    const data =
      user?.role === "admin"
        ? await getAllAdminFlashcards(token)
        : await getFlashcards(token);

    setCards(data);
    setTotalCards(data.length);
  };
  load();
}, [token, user]);


  // Add study mode class to body
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    document.body.classList.add("study");
    return () => document.body.classList.remove("study");
  }, []);

  const startSession = async () => {
const data = user.role === "admin"
  ? await getAllAdminFlashcards(token)
  : await getFlashcards(token);

    setCurrentCard(null);
    setFlipped(false);
    setCards(data);
    setTotalCards(data.length);
  };

const handleResult = async (result) => {
  if (!currentCard) return;

  // ⭐ Save ID BEFORE state updates
  const id = currentCard._id;

  // ⭐ Send correct flashcardId + result
  await addHistory({ flashcardId: id, result }, token);


  // ⭐ Remove card safely
  setCards((prevCards) => prevCards.filter((c) => c._id !== id));

  // ⭐ Reset current card
  setCurrentCard(null);
};


  return (
    <div className="study-wrapper">

      {/* Progress UI */}
      <div className="study-progress-box">
        <p className="study-progress-text">
          Studying {studiedCount} / {totalCards}
        </p>
        <p className="study-progress-text">{cards.length} cards remaining</p>

        <div className="study-progress-bar">
          <div
            className="study-progress-fill"
            style={{ width: `${(studiedCount / totalCards) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="study-container">
        <h2 className="study-title">Study Mode</h2>

        {!currentCard ? (
          <button className="study-btn start" onClick={startSession}>
            Start Studying
          </button>
        ) : (
          <>
            {/* Flashcard */}
            <div
  className={`study-card ${flipped ? "flipped" : ""}`}
  onClick={(e) => {
    e.stopPropagation();
    setFlipped(!flipped);
  }}
>

              <div className="study-inner">
                <div className="study-face front">
                  <h3>Question</h3>
                  <p>{currentCard.question}</p>
                </div>

                <div className="study-face back">
                  <h3>Answer</h3>
                  <p>{currentCard.answer}</p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            {cards.length > 0 && (
              <div className="study-actions">
                <button
  className="study-btn correct"
  onClick={(e) => {
    e.stopPropagation();
    handleResult("correct");
  }}
>

  Correct
</button>

<button
  className="study-btn incorrect"
  onClick={(e) => {
    e.stopPropagation();
    handleResult("incorrect");
  }}
>

  Incorrect
</button>

              </div>
            )}

            {cards.length === 0 && (
              <>
                <p className="study-complete">
                  🎉 Session complete! No more cards to study.
                </p>

                <button
                  className="study-btn start"
                  onClick={startSession}
                >
                  Restart Session
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default StudyMode;




