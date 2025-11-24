import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/FireBase";


const AuthContext = createContext()

function useAuth(){
    return useContext(AuthContext);
};

export default useAuth;

export const AuthProvider = ({children})=> {
    const [currentUser ,setCurrentUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect( ()=>{
     
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    },[])

    const value = {
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    );

}