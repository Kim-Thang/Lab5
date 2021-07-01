const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            trim: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String
        },
        phone: {
            type: String,
            default: ''
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema)