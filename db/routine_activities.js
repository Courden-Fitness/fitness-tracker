// const { tryCastModuleNotFoundError } = require("jest-resolve");
const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
      const { rows: [routineActivity] } = await client.query(`
        INSERT INTO routine_activities (
          "routineId",
          "activityId",
          duration,
          count
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [ routineId, activityId, duration, count ]);
          
          return routineActivity;

  } catch (error) {
      throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const { rows: [ routine_activity ] } = await client.query(`
      SELECT * FROM routine_activities
      WHERE id = ${ id }
    `)

      return routine_activity;

  } catch (error) {
      throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows: routine_activities } = await client.query(`
     SELECT * FROM routine_activities
     JOIN routines ON routine_activities."routineId"= routines.id
     WHERE "routineId" = ${id}
    `);
    
    return routine_activities;
    
      
} catch (error) {
    throw error;
}
}

async function updateRoutineActivity({ id, ...fields }) {}

async function destroyRoutineActivity(id) {}

async function canEditRoutineActivity(routineActivityId, userId) {}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
