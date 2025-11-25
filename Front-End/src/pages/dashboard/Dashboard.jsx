import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  const API_URL = "http://localhost:3001";

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (!response.ok) throw new Error("API indisponible");

      const data = await response.json();
      setStudents(data.length > 0 ? data : []);
    } catch (error) {
      console.error("Erreur API, utilisation des données locales :", error);
      setStudents([]);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handlePostStudent = () => {
    navigate("/student");
  };

  const handleUpdateStudent = (id) => {
    navigate(`/student/${id}/edit`);
  };

  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`${API_URL}/students/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erreur suppression API");

      setStudents(students.filter((s) => s.id !== id));
    } catch (error) {
      console.error("Suppression API échouée → suppression locale", error);
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-vh-100 bg-gradient-to-br from-blue-50 to-indigo-100 py-4 px-3 px-md-4">
      <style>{`
        .bg-gradient-to-br {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
        }
        
        .dashboard-card {
          border-radius: 16px;
          border: none;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
          background: white;
          animation: fadeIn 0.5s ease-in;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .header-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 2rem;
          border-radius: 12px;
          margin-bottom: 2rem;
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
        
        .btn-modern {
          border-radius: 10px;
          padding: 0.6rem 1.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .btn-modern:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        .btn-logout {
          background: white;
          color: #667eea;
          border: 2px solid white;
        }
        
        .btn-logout:hover {
          background: #f3f4f6;
          color: #5568d3;
        }
        
        .btn-add {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
        }
        
        .btn-add:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
        }
        
        .table-modern {
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .table-modern thead {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }
        
        .table-modern thead th {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          letter-spacing: 0.5px;
          padding: 1rem 0.75rem;
          border: none;
          white-space: nowrap;
        }
        
        .table-modern tbody tr {
          transition: all 0.3s ease;
          border-bottom: 1px solid #f3f4f6;
        }
        
        .table-modern tbody tr:hover {
          background-color: #f9fafb;
          transform: scale(1.01);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .table-modern tbody td {
          padding: 1rem 0.75rem;
          vertical-align: middle;
          font-size: 0.9rem;
          color: #374151;
        }
        
        .btn-action {
          border-radius: 8px;
          padding: 0.4rem 0.8rem;
          border: none;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }
        
        .btn-edit {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }
        
        .btn-edit:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: scale(1.05);
        }
        
        .btn-delete {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
        }
        
        .btn-delete:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          transform: scale(1.05);
        }
        
        .empty-state {
          padding: 4rem 2rem;
          text-align: center;
          color: #9ca3af;
        }
        
        .empty-state-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .badge-count {
          background: white;
          color: #667eea;
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-left: 1rem;
        }
        
        .bg-pink {
          background-color: #ec4899 !important;
        }
        
        @media (max-width: 768px) {
          .header-section {
            padding: 1.5rem;
          }
          
          .header-section h2 {
            font-size: 1.5rem;
          }
          
          .table-modern thead th {
            font-size: 0.65rem;
            padding: 0.75rem 0.5rem;
          }
          
          .table-modern tbody td {
            font-size: 0.8rem;
            padding: 0.75rem 0.5rem;
          }
          
          .btn-action {
            padding: 0.3rem 0.6rem;
            font-size: 0.8rem;
          }
        }
      `}</style>

      <div className="container-fluid" style={{ maxWidth: "1600px" }}>
        {/* Header Section */}
        <div className="header-section">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3">
            <div>
              <h2 className="mb-2 fw-bold">
                <i className="bi bi-mortarboard-fill me-2"></i>
                Gestion des Étudiants
                <span className="badge-count">{students.length}</span>
              </h2>
              <p className="mb-0 opacity-75">Tableau de bord administrateur</p>
            </div>
            <button onClick={handleLogOut} className="btn btn-logout btn-modern">
              <i className="bi bi-box-arrow-right me-2"></i>
              Déconnexion
            </button>
          </div>
        </div>

        {/* Main Card */}
        <div className="dashboard-card p-3 p-md-4">
          {/* Action Button */}
          <div className="mb-4">
            <button onClick={handlePostStudent} className="btn btn-add btn-modern">
              <i className="bi bi-plus-circle me-2"></i>
              Ajouter un Étudiant
            </button>
          </div>

          {/* Table Section */}
          <div className="table-responsive">
            <table className="table table-modern mb-0">
              <thead>
                <tr>
                  <th>Prénom</th>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Date Naissance</th>
                  <th>Genre</th>
                  <th>N° Étudiant</th>
                  <th>Filière</th>
                  <th>Niveau</th>
                  <th>Année</th>
                  <th>Moyenne</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="empty-state">
                      <div className="empty-state-icon">
                        <i className="bi bi-inbox"></i>
                      </div>
                      <h5>Aucun étudiant trouvé</h5>
                      <p className="mb-0">Commencez par ajouter votre premier étudiant</p>
                    </td>
                  </tr>
                ) : (
                  students.map((stu) => (
                    <tr key={stu.id}>
                      <td className="fw-semibold">{stu.firstName}</td>
                      <td className="fw-semibold">{stu.lastName}</td>
                      <td>
                        <i className="bi bi-envelope me-1 text-muted"></i>
                        {stu.email}
                      </td>
                      <td>
                        <i className="bi bi-telephone me-1 text-muted"></i>
                        {stu.phone}
                      </td>
                      <td>{stu.dateNaissance}</td>
                      <td>
                        <span className={`badge ${stu.gender === 'M' ? 'bg-primary' : 'bg-pink'}`}>
                          {stu.gender}
                        </span>
                      </td>
                      <td className="fw-semibold text-primary">{stu.studentNumber}</td>
                      <td>{stu.filiere}</td>
                      <td>{stu.level}</td>
                      <td>{stu.annee}</td>
                      <td>
                        <span className={`badge ${
                          stu.moyenne >= 16 ? 'bg-success' :
                          stu.moyenne >= 14 ? 'bg-info' :
                          stu.moyenne >= 12 ? 'bg-warning' : 'bg-danger'
                        }`}>
                          {stu.moyenne}/20
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-action btn-edit"
                            onClick={() => handleUpdateStudent(stu.id)}
                            title="Modifier"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </button>
                          <button
                            className="btn btn-action btn-delete"
                            onClick={() => handleDeleteStudent(stu.id)}
                            title="Supprimer"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;