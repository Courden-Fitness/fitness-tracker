/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const { requireUser } = require("./utils"); 

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {
    UserTakenError,
    PasswordTooShortError, 
    UserDoesNotExistError
    } = require("../errors");

const { 
    getUserByUsername, 
    createUser, 
    getPublicRoutinesByUser
    } = require("../db");


// POST /api/users/register
usersRouter.post("/register", async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        const takenUser = await getUserByUsername(username);

        if (takenUser) {
            res.status(401);
      res.send({
        error: 'UserExistsError',
        message: UserTakenError(username),
        name: username
      });
    }

        if (password.length < 8) {
            res.status(401);
            res.send({
              error: 'PasswordTooShortError',
              message: PasswordTooShortError(),
              name: password
            });
        }

        const user = await createUser({
            username,
            password,
        });

        const token = jwt.sign({
            id: user.id,
            username
        }, process.env.JWT_SECRET, {
            expiresIn: "1w"
        });

        res.send({
            message: "Thank you for signing up!",
            user,
            token
        });

    } catch (error) {
        next(error);
    }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        next({
           name: "Login Credentials Error",
           message: "Missing username and/or password"
        })
    }

  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    if(user && hashedPassword == hashedPassword){
      const token = jwt.sign({ id:user.id, username:username }, process.env.JWT_SECRET );
      res.send({ message: "you're logged in!",
                 token,
                 user
            });
    }else {
        next({
            name: "Login Error",
            message: "Username and password combination do not match."
        })
    }
    
  } catch (error) {
    next(error);
  }
  
});
// GET /api/users/me

// GET /api/users/:username/routines
usersRouter.get('/:username/routines', requireUser, async (req, res, next) => {
    const { username } = req.params;
    
    const user = await getUserByUsername(username);

    if (!user) {
        next({
            name: "User Does Not Exist",
            error: "User Does Not Exist",
            message: UserDoesNotExistError(username)
            });
    } else {
        try {
         const allPublicRoutines = await getPublicRoutinesByUser({ id:username }) ;
       
         res.send({
             
             allPublicRoutines
         });
       
        } catch (error) {
           next (error)
        }
       
    }
})
module.exports = usersRouter;
