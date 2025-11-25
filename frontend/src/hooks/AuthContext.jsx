import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  useEffect(() => {
    // Au chargement de l'app, on vérifie s'il y a déjà une session
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setCurrentUser({ 
        token, 
        user: JSON.parse(storedUser) 
      });
    }
    setLoading(false);
  }, []);

  // La fonction login reçoit maintenant le token ET les infos utilisateur du backend
  const login = (token, userData) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData)); // On sauvegarde aussi l'user
    
    setCurrentUser({ 
      token, 
      user: userData 
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}