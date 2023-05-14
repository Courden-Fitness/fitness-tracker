import React, { useState } from "react";
import { createActivity } from "../api";
import { useNavigate } from "react-router-dom";

const CreateActivity = ({ token, activities, setActivities, isLoggedIn }) => {
    const [ name, setName ] = useState("");
    const [ description, setDescription ] = useState("");

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        const activityToCreate = 
             {
                name: name,
                description: description,   
            }
    
        const newActivity = await createActivity(token, activityToCreate );
        setActivities([newActivity, ...activities])

        setName("")
        setDescription("")
        navigate("/Activities")
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
                       <button type="submit">Submit</button>
                   </form>
               </div>
        ) : (
                <h1>Please login to create an activity!</h1>
        )}
        </>
    )
}

export default CreateActivity;

{/* <div>
            <form onSubmit={handleSubmit}>
                <h2>Create Activity</h2>
                <input type="text" placeholder="Name" value={name}
                onChange={(event) => setName(event.target.value)} />
                <input type="text" placeholder="Description" value={description}
                onChange={(event) => setDescription(event.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div> */}