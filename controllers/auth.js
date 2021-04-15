const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError")
const asyncErrorWrapper = require("express-async-handler");
const {sendJwtToClient} = require("../helpers/authorization/tokenHelpers");
const {validateUserInput, comparePassword} = require("../helpers/input/inputHelpers");


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

const login = asyncErrorWrapper(async (req, resp, next) => {
   const {email,password} = req.body;
   if(!validateUserInput(email,password)){
    return  next(
        new CustomError("Please check your inputs",400));
  
    }

    const user = await User.findOne({email}).select("+password");

   if(!comparePassword(password,user.password)){
    return  next(
      new CustomError("Please check your credentials",400));
   }

   sendJwtToClient(user,resp);
});

const logout = asyncErrorWrapper(async (req, resp, next) => {

  const {Node_ENV} = process.env;

  return resp.status(200).cookie({
       httpOnly:true,
       expires:new Date(Date.now()),
       secure:Node_ENV === "development" ? false : true
  }).json({
     success : true,
     message : "Logout Successful"
  })
});

const getUser = (req,resp,next)=>{
      resp.json({
         
        success:true,
        data:{
           id:req.user.id,
           name:req.user.name
        }
      });
}

const imageUpload =  asyncErrorWrapper(async (req, resp, next) => {
        
      resp.status(200)
      .json({
        success:true,
        message:"Image Upload Successful";
      });
});

module.exports = {
    register,
    login,
    logout,
    getUser,
    imageUpload
};