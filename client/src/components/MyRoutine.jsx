import React, { useState, useEffect } from "react";
import { useNavigate} from "react-router-dom";
import {  getMyRoutines } from "../api";

const MyRoutine = ({ isLoggedIn, user, token, setSelectedRoutine}) => {
  const username = user.username;
  const navigate = useNavigate();
  console.log("username:", username)

  const [myRoutines, setMyRoutines] = useState([]);
  
   
  useEffect(() => {
    const fetchMyRoutines = async () => {
        const allMyRoutines = await getMyRoutines(username, token);
        // console.log("My Routines:", allMyRoutines)
        if (allMyRoutines.length){
          setMyRoutines(allMyRoutines);
        }    
    }

fetchMyRoutines();
}, [ token ]);


     return (
            <>
            <h1>Welcome from My Routines!</h1>
            <button onClick={() => {
                  navigate('/CreateRoutine');
                }}>Create A New Routine</button>
           {isLoggedIn ? (
            myRoutines.map((routine) => {
             return (
                <div id={routine.id}>
                 <h1>{routine.name}</h1>
                 <p>Goal: {routine.goal}</p> 
                 <p>Creator Name: {routine.creatorName}</p>
                 
                
                {/* {myRoutines.activities.length && myRoutines.activities.map((activity, index) => {
                    return (
                     <div key={index}>
                       <p>{activity.name}</p>
                       <p>{activity.duration}</p> 
                       <p>{activity.count}</p>
                       <p>{activity.description}</p>   
                     </div>
                    );
                })} */}
                

                <button onClick={() => {
                  setSelectedRoutine(routine)
                  navigate('/SingleRoutine');
                }}>
                  Details
                </button>

                {/* <button onClick={() => {
                  navigate('/CreateRoutine');
                }}>
                  Create A New Routine
                </button> */}

                
                </div>
             )
            })
           ) : (
            <h1> You must login to view this information </h1>
         )}
        
         </>
        );
    
}

export default MyRoutine;