const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");


const register = asyncErrorWrapper(async (req, resp, next) => {

    const {name,email,password,role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

  sendJwtToClient(user,resp);

});

const tokentest = (req,resp,next)=>{
      resp.json({
         
        success:true,
        message:"Welcome"
      });
}

module.exports = {
    register,
    tokentest
};