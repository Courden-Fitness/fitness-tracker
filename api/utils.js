const { UnauthorizedError } = require("../errors");

const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        next({
            name: "UnauthorizedError",
            error: "UnauthorizedError",
            message: UnauthorizedError()
        });
    }

    next();
}

module.exports = {
    requireUser
}