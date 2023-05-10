const BASE = "http://localhost:8080/api";

export const getMe = async (token) => {
    // console.log("This is getME token:",token)
    try {
        const response = await fetch(
            `${BASE}/users/me`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
        
        const result = await response.json();
            // console.log("This is getME result:",result);
            return result;

    } catch (error) {
        console.error(error)
    }
}

export const loginUser = async (userObject) => {
    try {
        const response = await fetch(
            `${BASE}/users/login`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
          });

        // const result = response.json();
        const result = await response.json();
        // console.log("This is login result:", result);
        return result;
    }

    catch(error) {
        console.error(error);
    }
};

  export const registerUser = async (userObject) => {
    try {
        // console.log("This is userObject:",userObject);
        const response = await fetch(
            `${BASE}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObject)
          });
        // const result = response.json();
        const result = await response.json();
        // console.log("This is result:",result);
        return result;
    }

    catch(error) {
        console.error(error);
    }
  };

