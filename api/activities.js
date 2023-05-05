const express = require('express');
const activitiesRouter = express.Router();

const { 
    getAllActivities,
    getActivityByName, 
    createActivity
    } = require('../db');

const { 
    requireUser 
    } = require("./utils");
const { ActivityExistsError } = require('../errors');

// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get('/', async (req, res, next) => {
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
activitiesRouter.post("/", async (req, res, next) => {
    const { name, description } = req.body;

    const takenActivity = await getActivityByName(name);
    
    if (takenActivity) {     
        res.status(401);
      res.send({
        error: 'ActivityExistsError',
        message: ActivityExistsError(name),
        name: name
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

module.exports = activitiesRouter;
