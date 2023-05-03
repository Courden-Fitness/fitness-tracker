const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // const lower = name.toLowerCase(); //Creates names as unique lowercase
  try {
    const { rows: [ activity ]} = await client.query(`
      INSERT INTO activities ( name, description)
      VALUES ($1, $2)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [ name, description ])

    return activity;

  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  try {
    const { rows: activity } = await client.query(`
      SELECT * FROM activities
    `);

      return activity;

  } catch (error) {
      throw error;
  }
}

async function getActivityById(id) {
  try {
    const { rows: [ activity ] } = await client.query(`
      SELECT * FROM activities
      WHERE id = ${ id }
    `)

      return activity;

  } catch (error) {
      throw error;
  }
}

async function getActivityByName(name) {
  try {
    const { rows: [ activity ] } = await client.query(`
      SELECT * FROM activities
      WHERE name=$1
    `, [name])

    return activity;
  } catch (error) {
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  try {
    const routinesToReturn = [...routines]; // prevents unwanted side effects.
    const position = routines.map((_, index) => `$${index + 1}`).join(',');
    const routineIds = routines.map((routine) => routine.id);
  
    const {rows: activities} = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
      FROM activities
      JOIN routine_activities ON routine_activities."activityId"= activities.id
      WHERE routine_activities."routineId" IN (${position})
    `, routineIds);
  
     for(const routine of routinesToReturn) {
  
       const activitiesToAdd = activities.filter(
         (activity) => activity.routineId === routine.id);
  
       routine.activites = activitiesToAdd;
     }
  
    // console.log('these are my routines: ---->', routines);
     return await attachActivitiesToRoutines(routines);
   } catch (error) {
     throw error;
   }
}

async function updateActivity({ id, ...fields }) {
  try {
    const keys = Object.keys(fields);
    // console.log(keys);
    const setString = keys.map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
   
      const { rows: [ activity ] } = await client.query(`
      UPDATE activities
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields)
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
