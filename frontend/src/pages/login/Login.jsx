import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Ton hook existant (attention à la typo dans le nom du fichier)
import api from "../../api/axios"; // Le fichier qu'on vient de créer
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // On récupère la fonction login du contexte

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // --- CHANGEMENT MAJEUR ICI ---
      // On envoie les identifiants au backend Node.js
      const response = await api.post("/auth/login", formData);
      
      // Le backend doit renvoyer un objet type: { token: "...", user: { ... } }
      const { token, user } = response.data;

      // On passe le token et les infos utilisateur au contexte
      login(token, user);

      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);
      
      // Gestion des erreurs renvoyées par le backend (ex: 400, 401, 500)
      if (error.response && error.response.data) {
        // Affiche le message précis envoyé par le backend (ex: "Mot de passe incorrect")
        setErrorMsg(error.response.data.message || "Erreur d'authentification");
      } else {
        setErrorMsg("Le serveur ne répond pas. Vérifiez que Node.js est lancé.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Connexion</h2>

        {errorMsg && (
          <div className="error-box">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Mot de passe</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="login-btn" type="submit">
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;