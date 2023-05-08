const express = require('express');
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine } = require('../db');
const { requireUser } = require('./utils');
const router = express.Router();

// GET /api/routines
router.get('/', async (req, res, next) => {
 try {
  const publicRoutines  = await getAllPublicRoutines()
        
  res.send(
           publicRoutines
         );
           
} catch (error) {
  next (error);
 }

})
// POST /api/routines
router.post('/', requireUser, async (req, res, next) => {
    const { isPublic , name, goal } = req.body
    
    try {
     if(req.user) {
      const creatorId = req.user.id;
      const newRoutine = await createRoutine({creatorId , isPublic , name, goal});

      res.send(
        newRoutine
        );

     }

    } catch (error) {
       next(error) 
    }
});
// PATCH /api/routines/:routineId
router.patch('/:routineId', requireUser, async (req, res, next) => {
  const { isPublic, name, goal} = req.body;
  const routineId = req.params.routineId;
  console.log("This is routineId:", routineId);

  try {
    const routine = await getRoutineById(routineId);
    console.log("This is routine:", routine);
    if ( routine.id === req.user.id) {
      const updatedRoutine = await updateRoutine({
        id: routineId,
        isPublic,
        name,
        goal
      });
      console.log("This is updatedRoutine:", updatedRoutine)
      res.send (
        updatedRoutine 
      )
    } else {
      res.status(403);
      res.send({
        error: 'UnauthorizedUpdateError',
        message: `User ${req.user.username} is not allowed to update ${routine.name}`,
        name: 'UnauthorizedUpdateError'
      });
    }

  } catch (error) {
    next(error)
  }
})
// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
