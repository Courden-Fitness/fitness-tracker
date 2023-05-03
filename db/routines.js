const client = require("./client");
const {attachActivitiesToRoutines} = require("./activities");
const { getUserByUsername } = require("./users");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
      const { rows: [ routine ] } = await client.query(`
        INSERT INTO routines (
          "creatorId",
          "isPublic",
          name,
          goal
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [ creatorId, isPublic, name, goal ]);

          return routine;

  } catch (error) {
      throw error;
  }
}

async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {
 
  try {
    const { rows: routines } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
    `
    );

    // const routinesToReturn = [...routines]; // prevents unwanted side effects.
    // // $1, $2, $3
    // const position = routines.map((_, index) => `$${index + 1}`).join(', ');
    // const routineIds = routines.map((routine) => routine.id);

    // // get the activities, JOIN with routine_activities (so we can get a routineId)
    // const { rows: activities } = await client.query(
    //   `
    // SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    // FROM activities
    // JOIN routine_activities ON routine_activities."activityId" = activities.id
    // WHERE routine_activities."routineId" IN (${position})
    // `,
    //   routineIds
    // );

    // // console.log('these are my activities: ----->', activities);

    // // loop over each routine
    // for (const routine of routinesToReturn) {
    //   // if the routine.id matches the activtiy.routineId then add to routine.
    //   const activitiesToAdd = activities.filter(
    //     (activity) => activity.routineId === routine.id
    //   );

    //   routine.activities = activitiesToAdd;
    // }

    // console.log('these are my routines: ----->', routines[3]);
    // // console.log('these are my routines: ----->', routines[3].activities);
      return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}


async function getAllPublicRoutines() {
  try {
      const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE "isPublic" = 'true'
      `);

        return await attachActivitiesToRoutines(routines);
  } catch (error) {
      throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
      const { rows: routines } = await client.query(`
      SELECT routines.*, users.username AS "creatorName"
      FROM routines
      JOIN users ON routines."creatorId" = users.id
      WHERE username = $1
      `, [ username ]);

        return await attachActivitiesToRoutines(routines);
        
  } catch (error) {
      throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id
    WHERE "isPublic" = 'true' AND username = $1
    `, [ username ]);

      return await attachActivitiesToRoutines(routines);
      
} catch (error) {
    throw error;
}
}

async function getPublicRoutinesByActivity({ id }) {
  try {
    const { rows: routines } = await client.query(`
    SELECT routines.*, users.username AS "creatorName"
    FROM routines
    JOIN users ON routines."creatorId" = users.id JOIN routine_activities ON routine_activities."routineId"= routines.id
    WHERE routines."isPublic" = 'true' AND routine_activities."activityId" = ${id}
    `);
    
    return await attachActivitiesToRoutines(routines);
    
      
} catch (error) {
    throw error;
}
}

async function updateRoutine({ id, ...fields }) {}

async function destroyRoutine(id) {}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
