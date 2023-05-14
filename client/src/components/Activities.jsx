import React from "react";

const Activities = ({activities, isLoggedIn}) => {



  return (
    <>
    {isLoggedIn ? (
        <div>
          <h1>Welcome from Activities!</h1>
          <button type="submit"><a href="/CreateActivity">Create Activity</a></button>
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