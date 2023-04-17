function validateRequest(req, res, next, schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        res.status(422).json({ error: error.details }) 
    } else {
        req.body = value;
        next();
    }
}

module.exports = validateRequest;
