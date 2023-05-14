import React, { useEffect, useState } from "react";
import { deleteRoutine, getMyRoutines } from "../api";
import { useNavigate } from "react-router-dom";
import "./SingleRoutine.css";

const SingleRoutine = ( { selectedRoutine, token, user} ) => {
  const [myRoutines, setMyRoutines] = useState([]);

    const username = user.username;
    const navigate = useNavigate();


    console.log("This is selectedRoutine", selectedRoutine);
    console.log("This is myRoutines", myRoutines);

    useEffect(() => {
      const fetchMyRoutines = async () => {
          const allMyRoutines = await getMyRoutines(username, token);
          console.log("My Routines:", allMyRoutines)
          if (allMyRoutines.length){
            setMyRoutines(allMyRoutines);
          }    
      }
  
  fetchMyRoutines();
  }, [ token ]);
  

    const handleDelete = async () => {
        await deleteRoutine(token, selectedRoutine.id );
        setMyRoutines([...myRoutines.filter((myRoutine) => myRoutine.id !== selectedRoutine.id)]);
        navigate('/MyRoutine');
      }

    return (
        <>
        <h1>Would you like to edit this routine ?</h1>
   
       
            <div id={selectedRoutine.id} className="singleRoutine">
             <h1>{selectedRoutine.name}</h1>
             <p>Goal: {selectedRoutine.goal}</p> 
             <p>Creator Name: {selectedRoutine.creatorName}</p>
            
            {/* {selectedRoutine.activities.map((activity, index) => {
                return (
                 <div key={index}>
                   <p>Activity: {activity.name}</p>
                   <p>Duration: {activity.duration}</p> 
                   <p>Count: {activity.count}</p>
                   <p>Description: {activity.description}</p>   
                 </div>
                );
            })} */}
            
            <button onClick={() => {
                  handleDelete(selectedRoutine.id)
                }}>Delete Routine</button>
            
            <button onClick={() => {
             navigate('/UpdateRoutine')
            }}>Update</button>
            <button onClick={() => {
             navigate('/AddActivity')
            }}>Add Activity</button>
            </div>
         
     
     
    
     </>
    );
};


export default SingleRoutine;