import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getHistory } from "../services/historyService";
import "../history.css";
import { getAllAdminHistory } from "../services/adminService";

const StudyHistory = () => {
const { token, user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  const load = async () => {
    try {
      const data = user.role === "admin"
        ? await getAllAdminHistory(token)
        : await getHistory(token);

data.sort((a, b) => new Date(b.studiedAt) - new Date(a.studiedAt));
      setHistory(data || []);
    } catch (err) {
      console.error("Error loading history:", err);
    } finally {
      setLoading(false);
    }
  };

  load();
}, [token, user]);


  return (
    <div className="history-wrapper">
      <h2 className="history-title">Study History</h2>

      {loading && <p className="history-empty">Loading history...</p>}

      {!loading && history.length === 0 && (
        <p className="history-empty">No study history yet.</p>
      )}

      <div className="history-list">
        {history.map((item) => (
          <div key={item._id} className="history-card">
            
            <div className="history-row">
              <span className="history-label">Question:</span>
              <span className="history-value">
                {item.flashcardId?.question || "Unknown"}
              </span>
            </div>

            <div className="history-row">
              <span className="history-label">Answer:</span>
              <span className="history-value">
                {item.flashcardId?.answer || "Unknown"}
              </span>
            </div>

            <div className="history-row">
              <span className="history-label">Result:</span>
              <span
                className={`history-result ${
                  item.result === "correct" ? "correct" : "incorrect"
                }`}
              >
                {item.result}
              </span>
            </div>

            <div className="history-row">
              <span className="history-label">Date:</span>
              <span className="history-value">
{new Date(item.studiedAt).toLocaleString()}
}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyHistory;

