import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { updateARoutine } from "../api";

const updateRoutine = ({token, routines, setRoutines, selectedRoutine}) => {
    const [name, setName ] = useState('');
    const [goal, setGoal ] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const updatedRoutine = {
           name: name,
           goal: goal
        };
     
        const data = await updateARoutine(token, updatedRoutine, selectedRoutine.id );
        console.log(data); 
          setRoutines([data.routines, ...routines]);
          navigate('/MyRoutine');
          
        
      };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input required type="text" value={name} placeholder={selectedRoutine.name} onChange={(e) => {
                    setName(e.target.value);
                 }}>
                </input>

                <label>Goal:</label>
                <input required type="text" value={goal} placeholder={selectedRoutine.goal} onChange={(e) => {
                    setGoal(e.target.value);
                }}></input>

                <button type="submit" >Update Routine</button>
            </form>
        </div>
    )
}




export default updateRoutine;