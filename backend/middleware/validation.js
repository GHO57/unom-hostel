const { validationResult, check } = require('express-validator')
const errorHandler = require("../utils/errorHandler")

exports.validateLogin = [
    check('email', 'Invalid email or password')
        .trim()
        .isEmail()
        .not()
        .isEmpty(),

    check('password', 'Invalid email or password')
        .trim()
        .not()
        .isEmpty(),

    (req, res, next) => {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return next(new errorHandler(errors.array()[0].msg, 400))
        }

        next()
    }
]