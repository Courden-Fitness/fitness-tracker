import React from "react";
import { useNavigate } from "react-router-dom";

const Activities = ({activities, isLoggedIn}) => {
  
  const navigate = useNavigate();



  return (
    <>
    {isLoggedIn ? (
        <div>
          <h1>Welcome from Activities!</h1>
          <button onClick={() => {
            navigate("/CreateActivity")
          }}>Create Activity</button>
          {activities.map((activity) => {
            return (
              <>
              <div key={activity.id}>
                <h1>{activity.name}</h1>
//              <p>{activity.description}</p> 
              </div>
              </>
            )
          })}
        </div>        
    ) : (
          <h1>Welcome from Activities!</h1>
    )}
    </>
  )
}

export default Activities;

// { <h1>Welcome from Activities!</h1>
//         {activities.length ? (
//           activities.map((activity) => {
//             return (
//               <div id={activity.id}>
//              <h1>{activity.name}</h1>
//              <p>{activity.description}</p> 
//              </div> }