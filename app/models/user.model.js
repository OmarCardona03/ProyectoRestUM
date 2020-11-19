const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    surname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    document: {
        type: Number,
        index: true,
        unique: true,
        required: true,
        trim: true,
        minlength: 5
    },
    address: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    phone: {
        type: Number,
        required: true,
        trim: true,
        minlength: 7
    },
    mail: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }

}, {
    timestamps: true
});
module.exports = mongoose.model('User', UserSchema);
