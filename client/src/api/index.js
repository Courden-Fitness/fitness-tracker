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
    console.log("This is result:", result);
    return result;

  } catch (error) {
    console.error(error);
  }
}