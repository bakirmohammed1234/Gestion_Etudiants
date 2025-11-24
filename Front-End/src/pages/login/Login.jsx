import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { auth } from "../../utils/FireBase";

function Login(){

    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        email:'',
        password: ''
    });

    const handleInputChange=(event)=>{
             const {name,value} =event.target;

             setFormData({
                    ...formData,
                    [name]:value
                });
    }

    const handleSubmit = async(e)=>{
       e.preventDefault();
                   console.log(formData);
                   try{
                       const response = await signInWithEmailAndPassword(auth,formData.email,formData.password);
                       console.log("login successfully", response);
                       navigate("/dashboard");
       
                   }catch(error){
                       console.log(error.message);
                   }

    }
     const handleSignUpClick = ()=>{
        navigate("/register");

    }

return (

   

    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '500px' }}>
        <h1>se connecter</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input name="email"type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleInputChange}  value={formData.email}/>
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label" >Password</label>
            <input name="password" type="password" className="form-control" id="exampleInputPassword1" onChange={handleInputChange}  value={formData.password}/>
          </div>

          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
          </div>

          <button type="submit" className="btn btn-primary w-100" onClick={handleSubmit}>SignIn</button>
         <div onClick={handleSignUpClick} >
        <p><Link >{"Don't have an account? signUp"}</Link></p> {/* ← ici Link est utilisé */}
       </div>
          
        </form>
      </div>
    </div>
  );
}



export default  Login;