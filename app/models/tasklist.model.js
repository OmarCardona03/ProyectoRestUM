const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = mongoose.model('User');



const TaskListSchema = mongoose.Schema({
    
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    descripcion: {
        type: Number,
        index: true,
        unique: true,
        required: false,
        trim: true,
        minlength: 5
    },
    id_user: {type: Schema.ObjectId, ref: 'User'}
}, {
    timestamps: true
});
module.exports = mongoose.model('tasklist', TaskListSchema);
