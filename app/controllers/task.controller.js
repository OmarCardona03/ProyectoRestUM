const Task = require('../models/task.model.js');

// Create and save a new Task
exports.create = (req, res) => {
//console.log("Creating a Task ... soon!");
// Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Task data can not be empty"   
        });
    }
    // Create a new Task with request's data
    const task = new Task({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_list: req.body.idList
    });
    // Save the Task in the database
    task.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Somethingwrong occurred while creating the   record." 
            });
        });
};

// Retrieve and List all Tasks
exports.findAll = (req, res) => {
    //console.log("Tasking all Tasks ... soon!");
    Task.find()
        .then(task => {
            res.status(200).send(task);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};

// Get a single Task by its id
exports.findOne = (req, res) => {
    //console.log("Getting a particular Task ... soon!");
    Task.findById(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            res.status(200).send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:" + req.params.id
            });
        });
};

// Update a Task by its id
exports.update = (req, res) => {
    //console.log("Updating a particular Task ... soon!");
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Task data can not be empty"
        });
    }
    // Find the Task and update it with the request body data
    Task.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_list: req.body.idList
    }, { new: true })
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            res.status(200).send(task);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
};

// Update Tasks
/* exports.updateTasks = (req, res) =>{
console.log("Updating Tasks ... soon!");
}; */

// Delete a Task by its id
exports.delete = (req, res) =>{
//console.log("Deleting a particular Task ... soon!");
Task.findByIdAndRemove(req.params.id)
        .then(task => {
            if (!task) {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            res.status(200).send({ message: "Task deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Task not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while deleting the record with id:" + req.params.id
            });
        });
};
