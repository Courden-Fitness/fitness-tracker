const express = require('express');
const { 
      getAllPublicRoutines, 
      createRoutine, 
      getRoutineById, 
      updateRoutine, 
      destroyRoutine, 
      getRoutineActivitiesByRoutine,
      addActivityToRoutine
} = require('../db');
const { 
      requireUser 
} = require('./utils');
const { 
  DuplicateRoutineActivityError
  } = require('../errors');

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
  // console.log("This is routineId:", routineId);

  try {
    const routine = await getRoutineById(routineId);
    // console.log("This is routine:", routine);
    if ( routine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine({
        id: routineId,
        isPublic,
        name,
        goal
      });
      
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
router.delete('/:routineId', requireUser, async (req, res, next) => {
  const routineId = req.params.routineId;
// console.log("This is routineId:", routineId);
  try {
    const routine = await getRoutineById(routineId);
    // console.log("This is routine:", routine);
    // console.log("This is requserID:", req.user.id)
      if (routine && routine.creatorId === req.user.id) {
        await destroyRoutine(routineId);
        res.send (
          routine
        )
      } else {
        res.status(403);
        res.send({
          error: 'UnauthorizedDeleteError',
          message: `User ${req.user.username} is not allowed to delete ${routine.name}`,
          name: 'UnauthorizedDeleteError'
        });
      }
     
  } catch (error) {
    next(error);
  }
});

// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', requireUser, async (req, res, next) => {
  const {routineId} = req.params
  console.log("This is RoutineId:", routineId)
  
  const { activityId, duration, count } = req.body;
  

   try {
     const routine_activity = await getRoutineActivitiesByRoutine({id:routineId } );
     console.log("This is Routine_Activity:", routine_activity)
   
     if(routine_activity){
       next({
         name: "DuplicateRoutineActivityError",
         error: "DuplicateRoutineActivityError",
         message: DuplicateRoutineActivityError(routineId, activityId)
         });
  
    } else {
      const attachedActivity = await addActivityToRoutine({routineId, activityId, duration, count});
      res.send(
        attachedActivity
        )
        console.log("This is attachedActivity:", attachedActivity)
    };
  
    } catch (error) {
      next(error)
   
  }
})


 
 
 
 
 
 
 
 
module.exports = router;
