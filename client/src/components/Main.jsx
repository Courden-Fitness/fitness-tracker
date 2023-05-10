import React, {useState, useEffect} from "react";
import { Home, 
    Activities, 
    Login,
    MyRoutine,
    Register,
    Routine,
    Navbar
} from "./index";
import { Routes, Route } from "react-router-dom";
import { getAllPublicRoutines } from "../api";

 const Main = () => {
 const [routines, setRoutines] = useState([])

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


    return (
        <>
            {<Navbar />}

        <Routes>

            <Route path="/" element= {<Home />}/>
            <Route path="/Login" element= {<Login />}/>
            <Route path="/Register" element= {<Register />}/>
            <Route path="/Routine" element= {<Routine routines={routines} setRoutines={setRoutines}/>}/>
            <Route path="/MyRoutine" element= {<MyRoutine  />}/>
            <Route path="/Activities" element= {<Activities />}/>
            


        </Routes>
        </>
    )

}
export default Main;