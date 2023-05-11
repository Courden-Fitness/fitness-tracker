import React from "react";

const Activities = ({activities}) => {
    return (
        <>
        <h1>Welcome from Activities!</h1>
        {activities.length ? (
          activities.map((activity) => {
            return (
              <div id={activity.id}>
             <h1>{activity.name}</h1>
             <p>{activity.description}</p> 
             </div>
            )
          }) 
        ) : (
          <h1> No activities to display </h1>
        )}
        </>
    );
};

export default Activities;