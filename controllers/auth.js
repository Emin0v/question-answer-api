const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, resp, next) => {

    const name = "Mahammad Eminov";
    const email = "eminov.mahammad@mail.ru";
    const password = "12345";

    const user = await User.create({
        name,
        email,
        password
    });

    resp
        .status(200)
        .json({
            success: true,
            data: user
        });

});

const errorTest = (req, resp, next) => {

    return next(new CustomError("Custom Error", 400));
};

module.exports = {
    register,
    errorTest
};