import { Routes, Route } from 'react-router-dom';
import SignUp from './pages/signUp/SignUp';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import PostUser from './pages/post-user/PostUser';
import UpdateUser from './pages/update-user/UpdateUser';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/register' element={<SignUp />} />
        <Route path='/' element={<Login />} />  historique*/}
        <Route path='/' element={<Dashboard />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/user' element={<PostUser />} />
        <Route path='/user/:id/edit' element={<UpdateUser />} />
      </Routes>
    </>
  )
}

export default App;
