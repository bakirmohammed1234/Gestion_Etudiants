import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // <= ajoute ce fichier CSS

function Login() {

  const navigate = useNavigate();
  const API_URL = "http://localhost:3001";

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
      const res = await fetch(`${API_URL}/users`);
      const users = await res.json();

      const foundUser = users.find(
        (u) =>
          u.email === formData.email &&
          u.password === formData.password
      );

      if (!foundUser) {
        setErrorMsg("Email ou mot de passe incorrect");
        return;
      }

      localStorage.setItem("token", "fake-jwt-token");
      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      setErrorMsg("Erreur du serveur JSON Server");
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
