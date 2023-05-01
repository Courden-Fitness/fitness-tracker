const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const { rows: [ user ]} = await client.query(`
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      ON CONFLICT (username) DO NOTHING
      RETURNING *;
    `, [ username, password ]);

      return user;

  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
 try {
   const { rows } = await client.query(`
    SELECT username, password
    FROM user;
   `);

   return rows;
 } catch (error) {
   throw error;
 }
}

async function getUserById(userId) {
 try {
  const { rows: [ user ] } = await client.query(`
   SELECT id, username
   FROM users
   WHERE id=${ userId }
  `);
  
   return user;
 } catch (error) {
   throw error;
 }
}

async function getUserByUsername(userName) {

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}
