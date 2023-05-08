const express = require('express');
const router = express.Router();

const { 
    getAllActivities,
    getActivityByName, 
    createActivity,
    getActivityById,
    updateActivity,
    getPublicRoutinesByActivity
    } = require('../db');

const { 
    requireUser 
    } = require("./utils"); 

const { 
    ActivityExistsError, ActivityNotFoundError 
    } = require('../errors');

// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    const { activityId } = req.params;
    
    const activity = await getActivityById(activityId);

    if (!activity) {
        next({
            name: "Activity not found",
            error: "Activity not found",
            message: ActivityNotFoundError(activityId)
            });
    } else {
        try {
         const allPublicRoutines = await getPublicRoutinesByActivity({ id:activityId }) ;
       
         res.send(
            allPublicRoutines
           )
       
        } catch (error) {
           next (error)
        }
       
    }
    
 

})
// GET /api/activities
router.get('/', async (req, res, next) => {
    //const { name, description} = req.body;
    try {
     const allActivities  = await getAllActivities()
     
     res.send(
         allActivities
        );
        
    } catch (error) {
        next (error);
    }
})
// POST /api/activities
router.post("/", requireUser, async (req, res, next) => {
    const { name, description } = req.body;

    const takenActivity = await getActivityByName(name);

    if (takenActivity) {     
      next({
        name: "Activity exists",
        error: "Activity exists",
        message: ActivityExistsError(name)
        });
    } else {
        try {
            const activity = await createActivity({
                name,
                description
                    });
                    console.log("This is activity:", activity)

            res.send(
                activity
        );

        } catch (error) {
            next(error);
        }
    }

});
// PATCH /api/activities/:activityId
router.patch('/:activityId', requireUser, async (req, res, next) => {
    const { name, description } = req.body;
    const { activityId } = req.params;

    try {
        const activity = await getActivityById(activityId);

        if (!activity) {
            next({
                name: "Activity not found",
                error: "Activity not found",
                message: ActivityNotFoundError(activityId)
                });
        } else {
            const activityExists = await getActivityByName(name);

            if (activityExists) {
                next({
                    name: "Activity exists",
                    error: "Activity exists",
                    message: ActivityExistsError(name)
                    });
            } else {
                const updatedActivity = await updateActivity({ id: activityId, name, description});
                
                res.send(
                    updatedActivity
                )
            }
        }
        // console.log("This is updated activity:", updateActivity);
    } catch (error) {
        next(error)
    }  
});

module.exports = router;
