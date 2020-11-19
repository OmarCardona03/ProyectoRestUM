const List = require('../models/tasklist.model.js');

// Create and save a new List
exports.create = (req, res) => {
    //console.log("Creating a List ... soon!");
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "List data can not be empty"   
        });
    }
    // Create a new List with request's data
    const list = new List({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_user: req.body.idUser
    });
    // Save the List in the database
    list.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Somethingwrong occurred while creating the   record." 
            });
        });
};

// Retrieve and list all Lists
exports.findAll = (req, res) => {
    //console.log("Listing all Lists ... soon!");
    List.find()
        .then(lists => {
            res.status(200).send(lists);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
};

// Get a single List by its id
exports.findOne = (req, res) => {
    //console.log("Getting a particular List ... soon!");
    List.findById(req.params.id)
        .then(list => {
            if (!list) {
                return res.status(404).send({
                    message: "List not found with id:" + req.params.id
                });
            }
            res.status(200).send(list);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "List not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:" + req.params.id
            });
        });
};

// Update a List by its id
exports.update = (req, res) => {
    //console.log("Updating a particular List ... soon!");    
    // Validate if the request's body is empty 
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "List data can not be empty"
        });
    }
    // Find the List and update it with the request body data
    List.findByIdAndUpdate(req.params.id, {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion
    }, { new: true })
        .then(list => {
            if (!list) {
                return res.status(404).send({
                    message: "List not found with id:" + req.params.id
                });
            }
            res.status(200).send(list);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Lit not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
};

// Delete a List by its id
exports.delete = (req, res) => {
    //console.log("Deleting a particular List ... soon!");
    List.findByIdAndRemove(req.params.id)
        .then(list => {
            if (!list) {
                return res.status(404).send({
                    message: "List not found with id:" + req.params.id
                });
            }
            res.status(200).send({ message: "List deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "List not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while deleting the record with id:" + req.params.id
            });
        });
};
