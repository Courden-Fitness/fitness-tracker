import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getMe } from "../api/Auth";
import { getAllPublicRoutines } from "../api";
import { 
    Home, 
    Activities, 
    Login,
    MyRoutine,
    Register,
    Routine,
    Navbar
} from "./index";

const Main = () => {
   
 const [routines, setRoutines] = useState([]);
     const [token, setToken ] = useState(localStorage.token);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);

 useEffect(() => {
      const publicRoutines = async () => {
       try {
        const routines  = await getAllPublicRoutines();
        console.log(routines)
        setRoutines(routines);  
   
       } catch (error) {
          console.error(error); 
       }
    }
    publicRoutines();
    }, []);
   
 useEffect(() => {
        const fetchUser = async () => {
            const fetchedUser = await getMe(token);
            setUser(fetchedUser);
        }
        fetchUser();
    }, [ token ]);



    return (
        <>
            {<Navbar />}

        <Routes>
      
            <Route path="/" element= 
            {<Home
            />}/>
            <Route path="/Login" element= 
            {<Login
            token={token}
            setToken={setToken}
            user={user}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />}/>
            <Route path="/Register" element= 
            {<Register
                token={token}
                setToken={setToken}
                user={user}
                setUser={setUser}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />}/>
            <Route path="/Routine" element= 
            {<Routine
             routines={routines}
              setRoutines={setRoutines}
            />}/>
            <Route path="/MyRoutine" element= 
            {<MyRoutine 
            />}/>
            <Route path="/Activities" element= 
            {<Activities 
            />}/>

        </Routes>
        </>
    )

}
export default Main;