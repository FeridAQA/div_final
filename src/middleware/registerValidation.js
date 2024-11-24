const Joi = require('joi');

const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        surname: Joi.string().min(3).max(50).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(30).required(),
        phone_num: Joi.string().pattern(/^\d+$/).length(10).required(), 
        gender: Joi.boolean().required(),
        seria: Joi.string().length(9).required(), 
        fin: Joi.string().length(7).required(),
        role: Joi.string().valid('admin', 'user'), 
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = registerValidation;
