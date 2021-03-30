const getAllQuestions = (req,resp,next) => {
    resp
    .status(200)
    .json({
        success : true
    });
};

module.exports = {
    getAllQuestions
}