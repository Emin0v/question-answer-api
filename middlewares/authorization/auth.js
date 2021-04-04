const CustomError = require('../../helpers/error/CustomError');
const jwt = require("jsonwebtoken");
const { isTokenIncluded, getAccessTokenFromHeaders } = require("../../helpers/authorization/tokenHelpers");

const getAccessToRoute = (req, resp, next) => {

    const { JWT_SECRET_KEY } = process.env;

    if (!isTokenIncluded(req)) {
        return next(
            new CustomError("You are not authorized to access this route", 401)
        );
    }

    const accessToken = getAccessTokenFromHeaders(req);

    jwt.verify(accessToken, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(
                new CustomError("You are not authorized to access this route", 401));
        }
        console.log(decoded);
        next();
    });

};

module.exports = {
    getAccessToRoute
};