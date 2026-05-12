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

  const filteredHistory = history.filter((h) =>
    h.flashcardId?.question?.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="admin-tabs">
        <button
          className={tab === "users" ? "active" : ""}
          onClick={() => setTab("users")}
        >
          Users
        </button>

        <button
          className={tab === "flashcards" ? "active" : ""}
          onClick={() => setTab("flashcards")}
        >
          Flashcards
        </button>

        <button
          className={tab === "history" ? "active" : ""}
          onClick={() => setTab("history")}
        >
          History
        </button>
      </div>

      {/* Search */}
      <input
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
  <tr key={u._id}>
    <td>{u.email}</td>
    <td>{u.role}</td>
    <td>{new Date(u.createdAt).toLocaleString()}</td>
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
    </div>
  );
}

export default AdminDashboard;





