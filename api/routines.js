const express = require('express');
const { getAllPublicRoutines, createRoutine } = require('../db');
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

// DELETE /api/routines/:routineId

// POST /api/routines/:routineId/activities

module.exports = router;
