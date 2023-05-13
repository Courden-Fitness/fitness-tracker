import React from "react";

const Routine = ( {routines} ) => {
  
    return (
        <>
        <h1>Welcome from Routine!</h1>
       {routines.length ? (
        routines.map((routine) => {
         return (
            <div id={routine.id}>
             <h1>{routine.name}</h1>
             <p>Goal: {routine.goal}</p> 
             <p>Creator Name: {routine.creatorName}</p>
            
            {routine.activities.map((activity, index) => {
                return (
                 <div key={index}>
                   <p>Activity: {activity.name}</p>
                   <p>Duration: {activity.duration}</p> 
                   <p>Count: {activity.count}</p>
                   <p>Description: {activity.description}</p>   
                 </div>
                );
            })}

            
            </div>
         )
        })
       ) : (
        <h1> No activities to display </h1>
     )}
    
     </>
    );
};


export default Routine;