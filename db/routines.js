const client = require("./client");
const {attachActivitiesToRoutines} = require("./activities");

async function createRoutine({ creatorId, isPublic, name, goal }) {}

async function getRoutineById(id) {}

async function getRoutinesWithoutActivities() {}

async function getAllRoutines() {
 try {
  const { rows: routines } = await client.query(`
   SELECT routines.*, user.username AS "creatorName
   FROM routines
   JOIN users ON routines."creatorId" = users.id
  `);
  /* const routinesToReturn = [...routines]; // prevents unwanted side effects.
  const position = routines.map((_, index) => `$${index + 1}`).join(',');
  const routineIds = routines.map((routine) => routine.id);

  const {rows: activites} = await client.query(`
    SELECT activities.*, routine_activies.duration, routine_activites.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
    FROM activities
    JOIN routine_activites ON routine_activites."activityId"= activities.id
    WHERE routine_activities."routineId" IN (${position})
  `, routineIds);

   for(const routine of routinesToReturn) {

     const activitiesToAdd = activites.filter(
       (activity) => activity.routineId === routine.id);

     routine.activites = activitiesToAdd;
   }

  console.log('these are my routines: ---->', routines); */
   return await attachActivitiesToRoutines(routines);
 } catch (error) {
   throw error;
 }
}

async function getAllPublicRoutines() {}

async function getAllRoutinesByUser({ username }) {}

async function getPublicRoutinesByUser({ username }) {}

async function getPublicRoutinesByActivity({ id }) {}

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
