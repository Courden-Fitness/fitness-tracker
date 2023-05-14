import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({setUser, isLoggedIn, setIsLoggedIn, setToken}) => {

    return (  
        <>
        {isLoggedIn ? (
                <nav className='navbar'>
                   <h1 className='navhead'>Courden's Fitness</h1>
                   <div>
                   <NavLink to="/" className={"navlinks"}>Home</NavLink>
                   <NavLink to="/Routine" className={"navlinks"}>Routines</NavLink>

                   <NavLink to="/Activities" className={"navlinks"}>Activities</NavLink>
                   <NavLink to="/CreateActivity" className={"navlinks"}>Create Activity</NavLink>

                   <NavLink to="/MyRoutine" className={"navlinks"}>My Routines</NavLink>

                   <NavLink to="/" className={"navlinks"} onClick={() => {
                    setIsLoggedIn(false)
                    setUser({})
                    setToken("")
                    localStorage.removeItem("token")
                   }}>Logout</NavLink>
                   </div>
               </nav>
        ) : (
                <nav className='navbar'>
                    <h1 className='navhead'>Courden's Fitness</h1>
                    <div>
                    <NavLink to="/" className={"navlinks"}>Home</NavLink>
                    <NavLink to="/Routine" className={"navlinks"}>Routines</NavLink>
                    <NavLink to="/Activities" className={"navlinks"}>Activities</NavLink>
                    <NavLink to="/Login" className={"navlinks"}>Login</NavLink>
                    </div>
                </nav>
        )}
        </> 
    )
}
        

    




export default Navbar;