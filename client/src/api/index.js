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

