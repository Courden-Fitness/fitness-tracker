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

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
