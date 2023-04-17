const { body, query, param } = require("express-validator");

exports.sliderValidition = (req ,res, next ) => {
    const errorData = {};
    // console.log(req.param)
    req.checkBody("sliderImg" , "Image is required.").notEmpty();
    req.checkBody("title" , "Title is required.").notEmpty();
    req.checkBody("sequence" , "Sequence is required.").notEmpty();
    const errors = req.validationErrors();
    if(errors){
        errors.map((error) => 
        errorData[error.param] = error.msg)
        return res.status(400).json({
            status :  false,
            errors : errorData,
        })
    }
    next();
}
