import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/Auth";

const Register = ({ setUser, setToken, setIsLoggedIn }) => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate();
       console.log(username);

       const handleSubmit = async (event) => {
           event.preventDefault();

           const userAuth = {username: username, password: password};
           //Example below
           const data = await registerUser(userAuth);
           console.log("This is data:",data);

           if(data.token) {
               setToken(data.token);
               localStorage.setItem("token", data.token)
               setUser({username, token: data.token})
               setIsLoggedIn(true)
           }
           setUsername("");
           setPassword("");
           navigate("/login");
       }

   return (
       <>
       <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Username" value={username}
           onChange = {(event) => setUsername(event.target.value)} />
           <input type="text" placeholder="Password" value={password} 
           onChange = {(event) => setPassword(event.target.value)} />
           <button type="submit">Signup</button>
       </form>
   </>
   );
};

export default Register;