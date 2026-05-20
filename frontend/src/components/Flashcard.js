import { useState } from "react";

function Flashcard({ card, onUpdate, onDelete }) {
  if (!card) return null;

  const [isFlipped, setIsFlipped] = useState(false);
  const [editing, setEditing] = useState(false);

  const [editQuestion, setEditQuestion] = useState(card.question);
  const [editAnswer, setEditAnswer] = useState(card.answer);
  const [editCategory, setEditCategory] = useState(card.category || "");

  // Auto-grow textarea
  const autoGrow = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

const saveEdit = (e) => {
  e.stopPropagation();

  if (
    editQuestion.trim().length === 0 ||
    editAnswer.trim().length === 0 ||
    editCategory.trim().length === 0
  ) {
    const btn = document.querySelector(".edit-btn");
    if (btn) {
      btn.classList.add("show-warning");
      setTimeout(() => btn.classList.remove("show-warning"), 1500);
    }
    return; // <-- stays in edit mode
  }

  onUpdate(card._id, {
    question: editQuestion,
    answer: editAnswer,
    category: editCategory,
  });

  setEditing(false); // only closes when valid
};


  const cancelEdit = () => {
    setEditing(false);
    setEditQuestion(card.question);
    setEditAnswer(card.answer);
    setEditCategory(card.category || "");
  };

  return (
    <div className="card">
      {editing ? (
        <>
          <textarea
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
            onInput={autoGrow}
            className="input-box auto-grow editing"
          />

          <textarea
            value={editAnswer}
            onChange={(e) => setEditAnswer(e.target.value)}
            onInput={autoGrow}
            className="input-box auto-grow editing"
          />

          <textarea
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
            onInput={autoGrow}
            className="input-box auto-grow editing"
          />

<button
  type="button"
className="btn btn-green edit-btn"
  onClick={saveEdit}
>
  Save
</button>

          <button className="btn btn-grey" onClick={cancelEdit}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div
            className={`card-inner ${isFlipped ? "flipped" : ""}`}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className="card-face saved">{card.question}</div>
            <div className="card-face saved card-back">{card.answer}</div>
          </div>

          <div className="card-category">{card.category}</div>

          <div className="actions">
            <button
              className="btn btn-yellow"
              onClick={(e) => {
                e.stopPropagation();
                setEditing(true);
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-red"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card._id);
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Flashcard;

