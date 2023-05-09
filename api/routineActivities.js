const express = require('express');

const {
    canEditRoutineActivity, 
    updateRoutineActivity, 
    getRoutineById, 
    destroyRoutineActivity 
} = require('../db');
const {
    requireUser 
} = require('./utils');
const { 
    UnauthorizedUpdateError,
    UnauthorizedDeleteError  
    } = require('../errors');

const router = express.Router();

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', requireUser, async (req, res, next) => {
    const routineActivityId = req.params.routineActivityId;
    const { count, duration } = req.body;

    try {
      const editRoutineActivity = await canEditRoutineActivity(routineActivityId, req.user.id);
      // console.log("This is editRoutineActivity:", editRoutineActivity);
      if (editRoutineActivity) {
        const updatedRoutineActivity = await updateRoutineActivity({ 
            id: routineActivityId, 
            count, 
            duration });

        // console.log("This is updatedRoutineACtivity:", updatedRoutineActivity);
        res.send(updatedRoutineActivity);
      } else {
        const routine = await getRoutineById(routineActivityId);
        // console.log("This is routine:", routine);
        if (routine.creatorId !== req.user.id) {
          next({
            message: UnauthorizedUpdateError(req.user.username, routine.name),
            name: "Unauthorized to make edits",
            error: "Unauthorized to make edits"
          });
        }
      }
    } catch (error) {
      next(error);
    }
})
// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', requireUser, async (req, res, next) => {
  const routineActivityId = req.params.routineActivityId;

    try {
      const editRoutineActivity = await canEditRoutineActivity(routineActivityId, req.user.id);
        if (editRoutineActivity) {
          const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId);
          // console.log("This is deletedRoutineActivity:", deletedRoutineActivity);
          res.send (
            deletedRoutineActivity
          );
        } else {
          const routine = await getRoutineById(routineActivityId);
          // console.log("This is routine:", routine);
          if (routine.creatorId !== req.user.id) {
            res.status(403);
            next({
              message: UnauthorizedDeleteError(req.user.username, routine.name),
              name: "Unauthorized to delete",
              error: "Unauthorized to delete"
            });
          }
        }

    } catch (error) {
      next(error)
    }
})

module.exports = router;
