import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";// <-- Import de ton instance Axios

function UpdateUser() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL (ex: /student/64b3f.../edit)
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateNaissance: "",
    gender: "",
    studentNumber: "",
    filiere: "",
    level: "",
    annee: "",
    moyenne: ""
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 1. Récupérer les données de l'étudiant au chargement de la page
  const fetchStudent = async () => {
    try {
      // Axios ajoute le token automatiquement
      const response = await api.get(`/students/${id}`);
      
      // MongoDB renvoie parfois des champs inutiles (__v, _id), 
      // on s'assure de ne mettre dans le state que ce qui nous intéresse si besoin,
      // ou on prend tout l'objet data directement.
      setFormData(response.data);

    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      setErrorMsg("Impossible de charger les données de l'étudiant.");
      
      // Si l'étudiant n'existe pas (404), on redirige vers le dashboard après 2sec
      if (error.response && error.response.status === 404) {
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 2. Envoyer les modifications au serveur
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      // Requete PUT vers Node.js
      await api.put(`/students/${id}`, formData);

      console.log("Étudiant mis à jour avec succès");
      navigate("/dashboard");

    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      
      if (error.response) {
        setErrorMsg(error.response.data.message || "Erreur lors de la mise à jour.");
      } else {
        setErrorMsg("Serveur injoignable.");
      }
    }
  };

  return (
    <div className="min-vh-100 py-5 px-3 bg-gradient-modern">
      <style>{`
        .bg-gradient-modern {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          position: relative;
          overflow: hidden;
        }
        
        .bg-gradient-modern::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
          animation: float 20s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-50px, 50px); }
        }
        
        .form-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          border: none;
          animation: slideUp 0.6s ease-out;
          position: relative;
          z-index: 1;
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .form-header {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          color: white;
          padding: 2rem;
          border-radius: 20px 20px 0 0;
          text-align: center;
          margin: -1px -1px 0 -1px;
        }
        
        .form-header h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .form-header p {
          margin: 0;
          opacity: 0.9;
          font-size: 1rem;
        }
        
        .form-body {
          padding: 2.5rem;
        }
        
        .form-section {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          border-left: 4px solid #3b82f6;
        }
        
        .form-section-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #3b82f6;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .form-label {
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .form-control, .form-select {
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 0.75rem 1rem;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
          outline: none;
        }
        
        .form-control:hover, .form-select:hover {
          border-color: #93c5fd;
        }
        
        .input-icon {
          color: #9ca3af;
          font-size: 0.85rem;
        }
        
        .btn-submit {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 12px;
          padding: 1rem 2rem;
          font-weight: 600;
          font-size: 1.1rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
          width: 100%;
          margin-top: 1rem;
        }
        
        .btn-submit:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
        }
        
        .btn-submit:active {
          transform: translateY(0);
        }
        
        .btn-back {
          background: white;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          border-radius: 12px;
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          transition: all 0.3s ease;
          margin-bottom: 1.5rem;
        }
        
        .btn-back:hover {
          background: #3b82f6;
          color: white;
          transform: translateX(-5px);
        }
        
        .row-gap {
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .form-header h1 {
            font-size: 1.5rem;
          }
          
          .form-body {
            padding: 1.5rem;
          }
          
          .form-section {
            padding: 1rem;
          }
          
          .btn-submit {
            font-size: 1rem;
            padding: 0.875rem 1.5rem;
          }
        }
        
        .required-field::after {
          content: '*';
          color: #ef4444;
          margin-left: 0.25rem;
        }
        
        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
        }
        
        .student-id-badge {
          display: inline-block;
          background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .alert-error {
          background-color: #fee2e2;
          border: 1px solid #ef4444;
          color: #b91c1c;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 500;
        }
      `}</style>

      <div className="container" style={{ maxWidth: "900px" }}>
        {/* Bouton retour */}
        <button 
          onClick={() => navigate("/dashboard")} 
          className="btn btn-back"
        >
          <i className="bi bi-arrow-left me-2"></i>
          Retour au tableau de bord
        </button>

        <div className="form-card">
          {/* En-tête */}
          <div className="form-header">
            <h1>
              <i className="bi bi-pencil-square"></i>
              Modifier un Étudiant
            </h1>
            <p>Mettez à jour les informations de l'étudiant</p>
            {/* Affichage de l'ID seulement si dispo */}
            {id && <span className="student-id-badge">ID: {id}</span>}
          </div>

          {/* Corps du formulaire */}
          <div className="form-body">

            {/* Affichage Erreur */}
            {errorMsg && (
              <div className="alert-error">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              
              {/* Section Informations Personnelles */}
              <div className="form-section">
                <div className="form-section-title">
                  <i className="bi bi-person-badge"></i>
                  Informations Personnelles
                </div>
                
                <div className="form-grid">
                  {/* Prénom */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-person input-icon"></i>
                      Prénom
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.firstName || ''}
                      placeholder="Ex: Ahmed"
                      required
                    />
                  </div>

                  {/* Nom */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-person input-icon"></i>
                      Nom
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.lastName || ''}
                      placeholder="Ex: Alami"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  {/* Date de naissance */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-calendar-event input-icon"></i>
                      Date de naissance
                    </label>
                    <input
                      name="dateNaissance"
                      type="date"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.dateNaissance || ''}
                      required
                    />
                  </div>

                  {/* Gender */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-gender-ambiguous input-icon"></i>
                      Genre
                    </label>
                    <select
                      name="gender"
                      className="form-select"
                      onChange={handleInputChange}
                      value={formData.gender || ''}
                      required
                    >
                      <option value="">Sélectionner...</option>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section Contact */}
              <div className="form-section">
                <div className="form-section-title">
                  <i className="bi bi-telephone"></i>
                  Informations de Contact
                </div>
                
                <div className="form-grid">
                  {/* Email */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-envelope input-icon"></i>
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.email || ''}
                      placeholder="exemple@email.com"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-phone input-icon"></i>
                      Téléphone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.phone || ''}
                      placeholder="+212 6XX XXX XXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Section Académique */}
              <div className="form-section">
                <div className="form-section-title">
                  <i className="bi bi-mortarboard"></i>
                  Informations Académiques
                </div>
                
                <div className="form-grid">
                  {/* Student Number */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-hash input-icon"></i>
                      Numéro Étudiant
                    </label>
                    <input
                      name="studentNumber"
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.studentNumber || ''}
                      placeholder="Ex: 2024001"
                      required
                    />
                  </div>

                  {/* Filière */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-book input-icon"></i>
                      Filière
                    </label>
                    <input
                      name="filiere"
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.filiere || ''}
                      placeholder="Ex: Informatique"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid">
                  {/* Level */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-bar-chart-steps input-icon"></i>
                      Niveau
                    </label>
                    <input
                      name="level"
                      type="text"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.level || ''}
                      placeholder="Ex: L1, L2, M1..."
                      required
                    />
                  </div>

                  {/* Année */}
                  <div className="mb-3">
                    <label className="form-label required-field">
                      <i className="bi bi-calendar3 input-icon"></i>
                      Année d'étude
                    </label>
                    <input
                      name="annee"
                      type="number"
                      className="form-control"
                      onChange={handleInputChange}
                      value={formData.annee || ''}
                      placeholder="Ex: 2024"
                      required
                      min="2020"
                      max="2030"
                    />
                  </div>
                </div>

                {/* Moyenne */}
                <div className="mb-3">
                  <label className="form-label required-field">
                    <i className="bi bi-graph-up input-icon"></i>
                    Moyenne générale (/20)
                  </label>
                  <input
                    name="moyenne"
                    type="number"
                    step="0.01"
                    className="form-control"
                    onChange={handleInputChange}
                    value={formData.moyenne || ''}
                    placeholder="Ex: 15.50"
                    required
                    min="0"
                    max="20"
                  />
                </div>
              </div>

              {/* Bouton de soumission */}
              <button type="submit" className="btn-submit">
                <i className="bi bi-check-circle me-2"></i>
                Mettre à jour l'étudiant
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;