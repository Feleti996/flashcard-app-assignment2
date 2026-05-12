import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user from localStorage on refresh
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login function
const login = (data) => {
  const cleanUser = {
    id: data.user.id,
    username: data.user.username,
    email: data.user.email,
    role: data.user.role,   // ⭐ IMPORTANT
  };

  setUser(cleanUser);
  setToken(data.token);

  localStorage.setItem("user", JSON.stringify(cleanUser));
  localStorage.setItem("token", data.token);
};


  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
