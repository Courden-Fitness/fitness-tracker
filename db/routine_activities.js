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
        ON CONFLICT ("routineId", "activityId") DO NOTHING
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
    const { rows: [ routine_activity ] } = await client.query(`
     SELECT * FROM routine_activities
     WHERE "routineId" = $1
    `, [id]);
    // console.log('This is routine_activity:', routine_activity)
    
    return routine_activity;
    
} catch (error) {
    throw error;
}
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    const keys = Object.keys(fields);
    // console.log(keys);
    const setString = keys.map((key, index) => `"${key}"=$${index + 1}`)
      .join(', ');
   
      const { rows: [ routine_activity ] } = await client.query(`
      UPDATE routine_activities
      SET ${ setString }
      WHERE id=${id}
      RETURNING *;
    `, Object.values(fields)
    );

      return routine_activity;

  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const { rows: [ routine_activity ] } = await client.query(`
    DELETE FROM routine_activities
    WHERE id = ${id}
    RETURNING *;
    `);
    
      return routine_activity;

      
} catch (error) {
    throw error;
}
}

async function canEditRoutineActivity(routineActivityId, userId) {
// console.log("This is routineActivityId:", routineActivityId);
// console.log("This is userId:", userId);

try {
  const { rows: [ activity ] } = await client.query(`
    SELECT * FROM routine_activities
    JOIN routines ON routine_activities."routineId" = routines.id
    WHERE routine_activities.id = $1
  `, [ routineActivityId ]);

  // console.log("This is activity:", activity);
      if (activity.creatorId === userId) {
        return true;
      } else {
        return false;
      }
} catch (error) {
    throw error;
}
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
