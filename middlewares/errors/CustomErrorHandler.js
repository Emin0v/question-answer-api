const CustomError = require("../../helpers/error/CustomError");
const customErrorHandler = (err,req,resp,next)=>{


if(err.name === "SyntaxError"){
  customError = new CustomError("Unexpected Syntax",400);
}
if(err.name = "ValidationError"){
    customError = new CustomError(err.message,400);
}

if(err.code === 11000){
  //Dublicate Error
  customError = new CustomError("Dublicate Error found : Check your inputs",400);
}

console.log(customError.message , customError.status);

    resp.status(customError.status || 500)
    .json({
         success:false,
         message:customError.message 
    });
};


module.exports = customErrorHandler;