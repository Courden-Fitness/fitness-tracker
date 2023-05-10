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
             <p>{routine.goal}</p> 
             <p>{routine.creatorName}</p>
            
            {routine.activities.map((activity, index) => {
                return (
                 <div key={index}>
                   <p>{activity.name}</p>
                   <p>{activity.duration}</p> 
                   <p>{activity.count}</p>
                   <p>{activity.description}</p>   
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