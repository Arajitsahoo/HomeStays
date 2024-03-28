const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email : {
        type: String,
        require: true
    },
    otp: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Otp', otpSchema)