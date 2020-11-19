const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tasklist = mongoose.model('tasklist');


const TasksSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    descripcion: {
        type: String,
        index: true,
        unique: true,
        required: false,
        trim: true,
        minlength: 5
    },
    estado: {
        type: String,
        required: false,
        trim: true,
        minlength: 4
    },
    id_list: { type: Schema.ObjectId, ref: 'tasklist' }

}, {
    timestamps: true
});
module.exports = mongoose.model('tasks', TasksSchema);
