const { ROLE_ADMIN } = require("../config/app.config");

const isAdmin = (req, res, next) => {
    if (req.user.role === ROLE_ADMIN) {
        next();
    } else {
        res.status(403)
            .send({
                message: 'Not Authenticated'
            });
        res.end()
    }
};

module.exports = isAdmin;