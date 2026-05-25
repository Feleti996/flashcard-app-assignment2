import React, { useEffect, useState, useCallback, useContext } from "react";
import {
  getAllUsers,
  getAllAdminFlashcards,
  getAllAdminHistory,
  deleteUserAdmin,
  deleteFlashcardAdmin,
  deleteHistoryAdmin,
} from "../services/adminService";
import "../admin.css";
import { AuthContext } from "../context/AuthContext";
import { createFlashcard } from "../services/flashcardService";

function AdminDashboard() {
  const { token } = useContext(AuthContext);

  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [deleteType, setDeleteType] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // Load admin data with token
  const loadData = useCallback(async () => {
    const [u, f, h] = await Promise.all([
      getAllUsers(token),
      getAllAdminFlashcards(token),
      getAllAdminHistory(token),
    ]);

    setUsers(Array.isArray(u) ? u : []);
    setFlashcards(
  Array.isArray(f)
    ? [...f].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : []
);

setHistory(
  Array.isArray(h)
    ? [...h].sort((a, b) => new Date(b.studiedAt) - new Date(a.studiedAt))
    : []
);


  }, [token]);
// eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Apply admin theme
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    document.body.classList.add("admin");
    return () => document.body.classList.remove("admin");
  }, []);

  const openDeleteModal = (type, id) => {
    setDeleteType(type);
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (deleteType === "user") await deleteUserAdmin(deleteId, token);
    if (deleteType === "flashcard") await deleteFlashcardAdmin(deleteId, token);
    if (deleteType === "history") await deleteHistoryAdmin(deleteId, token);

    setShowModal(false);
    loadData();
  };

  const filteredUsers = users.filter((u) =>
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredFlashcards = flashcards.filter((c) =>
    c.question?.toLowerCase().includes(search.toLowerCase())
  );

const filteredHistory = history.filter((h) => {
  if (!search.trim()) return true;

  const q = h.flashcardId?.question?.toLowerCase() || "";
  const a = h.flashcardId?.answer?.toLowerCase() || "";
  const u = h.userId?.email?.toLowerCase() || "";

  const s = search.toLowerCase();

  return q.includes(s) || a.includes(s) || u.includes(s);
});


  const openUserDetails = (user) => {
  setSelectedUser(user);
  };

  return (
    <div className="admin-wrapper">
      <h2 className="admin-title">Admin Dashboard</h2>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <h3>{users.length}</h3>
          <p>Users</p>
        </div>

        <div className="stat-card">
          <h3>{flashcards.length}</h3>
          <p>Flashcards</p>
        </div>

        <div className="stat-card">
          <h3>{history.length}</h3>
          <p>Study Records</p>
        </div>
      </div>

{/* Tabs */}
<div className="admin-nav">
  <button
    className={tab === "users" ? "active" : ""}
    onClick={() => { setTab("users"); setSearch(""); }}
  >
    Users
  </button>

  <button
    className={tab === "flashcards" ? "active" : ""}
    onClick={() => { setTab("flashcards"); setSearch(""); }}
  >
    Flashcards
  </button>

  <button
    className={tab === "history" ? "active" : ""}
    onClick={() => { setTab("history"); setSearch(""); }}
  >
    History
  </button>
</div>



      {/* Search */}
     <input
  id="admin-search"
  name="adminSearch"
  type="text"
  className="admin-search"
  placeholder="Search..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


      {/* Tables */}
      <div className="admin-table-container">
        {tab === "users" && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                
              <th>Delete</th>

              </tr>
            </thead>
            <tbody>
             {filteredUsers.map((u) => (
  <tr key={u._id} onClick={() => openUserDetails(u)} className="clickable-row">

    <td>{u.email}</td>
    <td>{u.role}</td>
    <td>{u.createdAt ? new Date(u.createdAt).toLocaleString() : "Unknown"}</td>
<td>
      <button
        className="delete-btn"
        onClick={() => openDeleteModal("user", u._id)}
      >
        Delete
      </button>
    </td>


  </tr>
))}

            </tbody>
          </table>
        )}

{tab === "flashcards" && (
  <table className="admin-table">
    <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Category</th>
        <th>Owner</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {filteredFlashcards.map((c) => (
        <tr key={c._id}>
          <td>{c.question}</td>
          <td>{c.answer}</td>
          <td>{c.category}</td>
          <td>{c.createdBy?.email || "Unknown"}</td>

          {/*EDIT BUTTON FIX */}
          <td>
            <button
              className="edit-btn"
              onClick={async () => {
                const newQuestion = prompt("New question:", c.question);
                const newAnswer = prompt("New answer:", c.answer);
                const newCategory = prompt("New category:", c.category);

                // Stop if cancelled
                if (
                  newQuestion === null ||
                  newAnswer === null ||
                  newCategory === null
                ) {
                  return;
                }

                
                const updated = {
                  question: newQuestion.trim() || c.question,
                  answer: newAnswer.trim() || c.answer,
                  category: newCategory.trim() || c.category,

                  
                  createdBy: c.createdBy?._id || c.createdBy || null
                };

                if (window.confirm("Save changes?")) {
                  await deleteFlashcardAdmin(c._id, token);
                  await createFlashcard(updated, token);
                  loadData();
                }
              }}
            >
              Edit
            </button>
          </td>

          {/* DELETE BUTTON */}
          <td>
            <button
              className="delete-btn"
              onClick={() => openDeleteModal("flashcard", c._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}


{tab === "history" && (
  <table className="admin-table">
    <thead>
      <tr>
        <th>Question</th>
        <th>Answer</th>
        <th>Result</th>
        <th>User</th>
        <th>Date</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
{filteredHistory.map((h) => (
  <tr key={h._id}>
    <td>{h.flashcardId?.question || "Unknown"}</td>
    <td>{h.flashcardId?.answer || "Unknown"}</td>

    <td className={h.result === "correct" ? "correct" : "incorrect"}>
      {h.result}
    </td>

    <td>{h.userId?.email || "Unknown"}</td>

    <td>{new Date(h.studiedAt).toLocaleString()}</td>

    <td>
      <button
        className="delete-btn"
        onClick={() => openDeleteModal("history", h._id)}
      >
        Delete
      </button>
    </td>
  </tr>
))}

    </tbody>
  </table>
)}

      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Confirm Delete</h3>
            <p>This action cannot be undone.</p>

            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowModal(false)}>
                Cancel
              </button>

              <button className="modal-delete" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedUser && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h3>User Details</h3>

      <p><strong>Email:</strong> {selectedUser.email}</p>
      <p><strong>Role:</strong> {selectedUser.role}</p>
      <p><strong>Created:</strong> {selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : "Unknown"}</p>

      <p><strong>Total Flashcards:</strong> {
        flashcards.filter(f => f.createdBy?._id === selectedUser._id).length
      }</p>

      <p><strong>Total Study Records:</strong> {
        history.filter(h => h.userId?._id === selectedUser._id).length
      }</p>

      <button className="modal-cancel" onClick={() => setSelectedUser(null)}>
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default AdminDashboard;





