/* eslint-disable no-useless-catch */
const express = require("express");
const usersRouter = express.Router();

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const {
    UserTakenError,
    PasswordTooShortError 
    } = require("../errors");

const { 
    getUserByUsername, 
    createUser 
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

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = usersRouter;
