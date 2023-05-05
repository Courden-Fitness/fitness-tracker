const express = require('express');
const activitiesRouter = express.Router();

const { getAllActivities } = require('../db');
// GET /api/activities/:activityId/routines

// GET /api/activities
activitiesRouter.get('/', async (req, res, next) => {
    //const { name, description} = req.body;
    console.log("Hello");
    try {
     const allActivities  = await getAllActivities()
     console.log("These are activities:", allActivities);
     
     res.send(
         allActivities
        );
        
    } catch (error) {
        next (error);
    }
})
// POST /api/activities

// PATCH /api/activities/:activityId

module.exports = activitiesRouter;
