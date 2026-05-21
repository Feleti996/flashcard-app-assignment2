const API_URL = "http://172.20.10.4:5000/api/admin";

// GET all users
export const getAllUsers = async (token) => {
  const res = await fetch(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// GET all flashcards (admin)
export const getAllAdminFlashcards = async (token) => {
  const res = await fetch(`${API_URL}/flashcards`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// GET all history (admin)
export const getAllAdminHistory = async (token) => {
  const res = await fetch(`${API_URL}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// DELETE user (admin)
export const deleteUserAdmin = async (id, token) => {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// DELETE flashcard (admin)
export const deleteFlashcardAdmin = async (id, token) => {
  const res = await fetch(`${API_URL}/flashcards/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

// DELETE history (admin)
export const deleteHistoryAdmin = async (id, token) => {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

