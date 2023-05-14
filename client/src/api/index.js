const BASE = "http://localhost:8080/api";



// Routines

// GET All Public Routines
export const getAllPublicRoutines = async () => {
    try {
     const response = await fetch(`${BASE}/routines`);

     const result = await response.json()

    //  console.log(result);

     return result
    } catch (error) {
      console.error(error) 
    }
}

// GET all Registered Users routines
export const getMyRoutines = async (username, token) => {
  console.log("This is Username:", username);
  // const token = localStorage.getItem("token")
  try {
    const response = await fetch(`${BASE}/users/${username}/routines`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log("Result:", result);
    return result
  } catch (error) {
    console.error(error)
  }
}

//Create a Routine
export const createRoutine = async (newRoutine,token) => {
  try {
    const response = await fetch(`${BASE}/routines`,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newRoutine)
    });

    const result = await response.json();
    console.log(result)
    return result
  } catch (error) {
    console.error(error)
  }
}

//DELETE Routine
export const deleteRoutine = async (token, routineId) => {
  try {
   const response = await fetch(`${BASE}/routines/${routineId}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
   });
   
   const result = await response.json();
   console.log(result)
   return result
  } catch (error) {
    console.error(error)
  }
}

//Update Routine
export const updateARoutine = async (token, updatedRoutine, routineId) => {
  try {
    const response = await fetch(`${BASE}/routines/${routineId}`,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedRoutine)
    });

    const result = await response.json();
    console.log("Routine Results:", result)
    return result
  } catch (error) {
    console.error(error)
  }
}

//Add an activity to a Routine
export const addActivityToRoutine = async () => {

}

// Activities

//GET all activities
export const getAllActivities = async () => {
  try {
    const response = await fetch(`${BASE}/activities`);

    const result = await response.json();
    console.log("Activities:", result)
    return result
  } catch (error) {
    console.error(error);
  }
}


export const createActivity = async (token, newActivity) => {
  console.log("This is newactivity:", newActivity)
  try {
    const response = await fetch(`${BASE}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(newActivity),
    });
    const result = await response.json();
    // console.log("This is result:", result);
    return result;

  } catch(error) {
      console.error(error);
  }
}
    
  


//ROUTINE ACTIVITIES

//Update an activity on a routine
export const updateActivity = async (token, routineActivityId, updatedActivity) => {
  try {
    const response = await fetch(`${BASE}/routine_activities/${routineActivityId}`, {
      method: "PATCH",
      headers: {
        'CONTENT-TYPE': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedActivity)
     })

    const result = await response.json();
    console.log(result);
    return result
  } catch (error) {
    console.error(error)
  }
}

//Delete an activity from a routine
export const deleteActivity = async (token, routineActivityId ) => {
  try {
    const response = await fetch(`${BASE}/routine_activities/${routineActivityId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    
    const result = await response.json();
    return result
    
  } catch (error) {
    console.error(error);
  }
}