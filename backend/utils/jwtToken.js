const jwt = require("jsonwebtoken")

const sendToken = (user, statusCode, res) => {
    const id = user[0].id
    const email = user[0].email

    const token = jwt.sign({ userId: id, email: email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        SameSite: "Strict",
        secure: false
    }

    res.status(statusCode).cookie("AUTHCOOKIE", token, options).json({
        success: true,
        user,
        token
    })
}

module.exports = {sendToken}