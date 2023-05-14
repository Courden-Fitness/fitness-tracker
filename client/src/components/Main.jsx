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
    Navbar,
    CreateActivity,
    CreateRoutine,
    UpdateRoutine,
    SingleRoutine
} from "./index";

const Main = () => {
    const [routines, setRoutines] = useState([]);
    const [token, setToken ] = useState(localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [activities, setActivities] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState([]);
    
    


 useEffect(() => {
      const initialData = async () => {
       try {
        const routines  = await getAllPublicRoutines();
        const activities = await getAllActivities();
        
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
}, [ isLoggedIn ]);

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
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              token={token}
              user={user}
              setSelectedRoutine={setSelectedRoutine}
            />}/>

        <Route path="/Activities" element= 
            {<Activities 
                activities={activities} 
                setActivities={setActivities}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
            />}/>
        <Route path="/CreateActivity" element= 
            {<CreateActivity 
                activities={activities} 
                setActivities={setActivities} 
                token={token}
                isLoggedIn={isLoggedIn}
                />}/>
        <Route path="/CreateRoutine" element= 
            {<CreateRoutine 
              token={token}
              setToken={setToken}
              routines={routines}
              setRoutines={setRoutines}
              />}/>

         <Route path="/UpdateRoutine" element= 
            {<UpdateRoutine 
              token={token}
              setToken={setToken}
              routines={routines}
              setRoutines={setRoutines}
              setSelectedRoutine={setSelectedRoutine}
              selectedRoutine={selectedRoutine}
              />}/>

         <Route path="/SingleRoutine" element= 
            {<SingleRoutine 
              selectedRoutine={selectedRoutine}
              setSelectedRoutine={setSelectedRoutine}
              routines={routines}
              setRoutines={setRoutines}
              user={user}
              token={token}
              />}/>

         <Route path="/Activities" element= 
            {<Activities 
              activities={activities} 
              setActivities={setActivities}


            />}/>

        </Routes>
        </>
    )
}

export default Main;