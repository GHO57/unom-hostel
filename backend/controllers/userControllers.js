const { pool } = require("../config/database");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const errorHandler = require("../utils/errorHandler")
const { sendToken } = require("../utils/jwtToken")

// login using only email

exports.login = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body

    if(!password){
        return next(new errorHandler("Enter the password", 400))
    }

    if(!email){
        return next(new errorHandler("Enter the email", 400))
    }

    const [db_pass] = await pool.execute('SELECT password FROM student WHERE email = ?', [email])

    if(db_pass.length === 0) return next(new errorHandler('Invalid password', 400))
        
    if(password === db_pass[0].password){
        const [existingUser] = await pool.execute('SELECT * FROM student WHERE email = ?', [email])
        

        if(existingUser.length > 0){            
            sendToken(existingUser, 201, res)
        
        }
    }else{
        return next(new errorHandler(`Invalid password`, 400))
    }
})

//logout

exports.logout = catchAsyncErrors(async(req, res, next) => {
    res.cookie("AUTHCOOKIE", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully"
    })
})

exports.getuserdetails = catchAsyncErrors(async(req, res, next) => {
    const { studentId } = req.user[0][0]

    try{
        const [user] = await pool.execute('SELECT * FROM student WHERE id = ?', [studentId])

        if(user.length > 0){
            res.status(200).json({
                success: true,
                user,
            })
        }else{
            return next(new errorHandler("Student not found", 404))
        }
    }catch(err){
        return next(new errorHandler(`Something Went Wrong`, 500))
    }
})