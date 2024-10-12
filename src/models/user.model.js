const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        trim: true
    },
    lastname: {
        type: String,
        required : true,
        trim: true
    },
    email: {
        type: String,
        required : true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required : true,
        trim: true
    }
}, {collection : "users", timestamps: true})

const user = mongoose.model("users", UserSchema)

module.exports = user