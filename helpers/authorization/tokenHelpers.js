const sendJwtToClient = (user,resp) =>{

    //Generate JWT
    const token = user.generateJwtFromUser();

    const {JWT_COOKIE,Node_ENV} = process.env;

    return resp.status(200)
    .cookie("access-token",token,{
        httpOnly:true,
        expires:new Date(Date.now()+(JWT_COOKIE)*1000),
        secure: Node_ENV === "development" ? false : true
    })
    .json({
        success:true,
        access_token:token,
        data:{
            name:user.name,
            email:user.email
        }
    });

}

const isTokenIncluded=(req)=>{

    return req.headers.authorization && req.headers.authorization.startsWith("Bearer:");
}

const getAccessTokenFromHeaders = (req)=>{

    const authorization = req.headers.authorization;
    const access_token = authorization.split(" ")[1];
    return access_token;
}

module.exports = {
    sendJwtToClient,
    isTokenIncluded,
    getAccessTokenFromHeaders
};