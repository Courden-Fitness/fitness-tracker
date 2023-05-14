import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { createRoutine } from "../api";

const createNewRoutine = ({token, routines, setRoutines}) => {
    const [name, setName ] = useState("");
    const [goal, setGoal ] = useState("");
   
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      const newRoutine = {
         name: name,
         goal: goal
      };
   
      const data = await createRoutine(newRoutine, token);
      console.log(data);
      if (data.routines) {
        setRoutines([data.routines, ...routines]);
        navigate('/MyRoutine');
      }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input required type="text" value={name} onChange={(e) => {
                    setName(e.target.value);
                 }}>
                </input>

                <label>Goal:</label>
                <input required type="text" value={goal} onChange={(e) => {
                    setGoal(e.target.value);
                }}></input>

                <button type="submit">Add New Routine</button>
            </form>
        </div>
    )
}

export default createNewRoutine;