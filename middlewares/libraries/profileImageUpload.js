const multer = require("multer");
const path = require("path");
const CustomError = require("../../helpers/error/CustomError");


const storage = multer.diskStorage({

    destination: function(req,file,cb){
        
        const rootDir = path.dirname(require.main.filename);
        cb(null,path.join(rootDir,"/public/uploads"));

    },
    filename : function(Req,file,cb){

        const extension = file.maintype.split("/")[1];
        req.savedProfileImage = "image_"+req.user.id +"."+extension;

        cb(null,req.savedProfileImage);
    }

});

const fileFilter = (req,file,cb) =>{
    let allowedMineTypes = ["images/jpg,images/jpeg,images/png,images/jpeg"];

    if(!allowedMineTypes.includes(file.maintype)){
        return cb(new CustomError("Please guide a valid image file",400),false);
    
    }

    returncb(null,true);
};

const profileImageUpload = multer({storage,fileFilter});

module.exports = profileImageUpload;