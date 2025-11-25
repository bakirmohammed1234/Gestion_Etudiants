import { Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PostUser from './pages/post-user/PostUser';
import UpdateUser from './pages/update-user/UpdateUser';
import useAuth from './hooks/useAuth';

function App() {

  // Route protégée (comme ton autre projet)
  const PrivateRoute = ({ element }) => {
    const { currentUser } = useAuth();
    return currentUser ? element : <Navigate to="/login" replace />;
  };

  return (
    <>
      <Routes>

        {/* PAGES PUBLIQUES */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* PAGES PROTÉGÉES */}
        <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
        <Route path="/student" element={<PrivateRoute element={<PostUser />} />} />
        <Route path="/student/:id/edit" element={<PrivateRoute element={<UpdateUser />} />} />

        {/* fallback si route invalide */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </>
  );
}

export default App;
