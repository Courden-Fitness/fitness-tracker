import React, { useState, useEffect } from "react";
import { addActivityToRoutine, getMyRoutines } from "../api";
import { useNavigate } from "react-router-dom";

const AddActivity = ({ token, activities, user, isLoggedIn, selectedRoutine}) => {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ duration, setDuration] = useState("");
    const [ count, setCount ] = useState("");
    const [ myRoutines, setMyRoutines ] = useState([]);

    const username = user.username;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyRoutines = async () => {
            const allMyRoutines = await getMyRoutines(username, token);
            console.log("My Routines:", allMyRoutines)
            if (allMyRoutines.length){
              setMyRoutines(allMyRoutines);
            }    
        }
    
    fetchMyRoutines();
    }, [ token ]);
    


    const handleSubmit = async (event) => {
        event.preventDefault();

        const addedActivityObj = 
             {
                name: name,
                description: description,
                duration: duration,
                count: count   
            }
    
        const newRoutineActivity = await addActivityToRoutine(token, addedActivityObj, selectedRoutine.Id);
        setMyRoutines([newRoutineActivity, ...activities])

        setName("")
        setDescription("")
        setDuration("")
        setCount("")
        navigate("/MyRoutine")
    }
 
    
    return (
        <>
        {isLoggedIn ? (
                   <div>
                   <form onSubmit={handleSubmit}>
                       <h2>Create Activity</h2>
                       <input type="text" placeholder="Name" value={name}
                       onChange={(event) => setName(event.target.value)} />
                       <input type="text" placeholder="Description" value={description}
                       onChange={(event) => setDescription(event.target.value)} />
                       <input type="text" placeholder="Duration" value={duration}
                       onChange={(event) => setDuration(event.target.value)} />
                       <input type="text" placeholder="Count" value={count}
                       onChange={(event) => setCount(event.target.value)} />
                       <button type="submit">Submit</button>
                   </form>
               </div>
        ) : (
                <h1>Please login to create an activity!</h1>
        )}
        </>
    )
}

export default AddActivity;