const BASE = "http://localhost:8080/api";



// Routines

// GET All Public Routines
export const getAllPublicRoutines = async () => {
    try {
     const response = await fetch(`${BASE}/routines`);

     const result = await response.json()
     console.log("Routines:",result);
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