const jwt = require("jsonwebtoken")
const catchAsyncErrors = require("./catchAsyncErrors")
const errorHandler = require("../utils/errorHandler")
const { pool } = require("../config/database")


exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const { AUTHCOOKIE } = req.cookies

    if(!AUTHCOOKIE){
        return next(new errorHandler("You're not logged in", 401))
    }

    const decodedData = jwt.verify(AUTHCOOKIE, process.env.JWT_SECRET)

    req.user = await pool.execute('SELECT s.id as studentId, s.full_name, s.email FROM student s WHERE s.id = ?', [decodedData.userId])

    next()
})