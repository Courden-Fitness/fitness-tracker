import React from "react";
import { Home, 
    Activities, 
    Login,
    MyRoutine,
    Register,
    Routine
} from "./index";
import { Routes, Route } from "react-router-dom";

const Main = () => {
    return (
        <>
            {<Navbar />}

        <Routes>

            <Route path="/" element= {<Home />}/>
            <Route path="/Login" element= {<Login />}/>
            <Route path="/Register" element= {<Register />}/>
            <Route path="/Routine" element= {<Routine />}/>
            <Route path="/MyRoutine" element= {<MyRoutine />}/>
            <Route path="/Activities" element= {<Activities />}/>

        </Routes>
        </>
    )
}

export default Main;