import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { getMe } from "../api/Auth";
import { getAllActivities, getAllPublicRoutines } from "../api";
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
    const [token, setToken ] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [activities, setActivities] = useState([])


 useEffect(() => {
      const initialData = async () => {
       try {
        const routines  = await getAllPublicRoutines();
        const activities = await getAllActivities();
        //console.log(routines)
        setRoutines(routines);
        setActivities(activities); 
   
       } catch (error) {
          console.error(error); 
       }
    }
    initialData();
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
            {<Navbar 
            setToken={setToken}
            setUser={setUser}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />}

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
            {<Activities activities={activities} setActivities={setActivities}

            />}/>

        </Routes>
        </>
    )
}

export default Main;