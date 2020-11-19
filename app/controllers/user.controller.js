const User= require('../models/user.model.js'); 

// Create a new User   
exports.create = (req, res) => {
    //console.log("Creating a User... soon!");
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }

    // Create a new User with request's data
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        document: req.body.document,
        address: req.body.address,
        phone: req.body.phone,
        mail: req.body.mail,
        username: req.body.username,
        password: req.body.password
    });

    // Save the User in the database
    user.save()
        .then(data => {
            res.status(200).send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while creating the   record."
            });
        });
};

//Login User
exports.login = (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({
        username: username,
        password: password
    },
        function (err, user) {
            if (err) {
                console.log(err);
                return res.status(500).send({message: "Something wrong ocurred while retrieving the record"});
            }
            if (!user) {
                return res.status(404).send( {message: "Invalid username or password"});
            }

            return res.status(200).send({message: "Welcome " + user.name + " " + user.surname});
        }
    );
};


// List all User  
exports.findAll = (req, res) => {
    //console.log("List users ... soon!");
    User.find()
        .then(users => {
            res.status(200).send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong occurred while retrieving the records."
            });
        });
    };


// Get a single user by id    
exports.findOne = (req, res) => {
    //console.log("List user ... soon!"); 
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            res.status(200).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while retrieving the record with id:" + req.params.id
            });
        });
    }; 

// Update a User by id
exports.update = (req, res) => {
    //console.log("Updating list ... soon!");
    // Validate if the request's body is empty
    // (does not include required data)
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "User data can not be empty"
        });
    }
    // Find the User and update it with the request body data
    User.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        surname: req.body.surname,
        document: req.body.document,
        address: req.body.address,
        phone: req.body.phone,
        mail: req.body.mail,
        username: req.body.username,
        password: req.body.password
    }, { new: true })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            res.status(200).send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
};

// Delete a User by id   
exports.delete = (req, res) => {
    //console.log("Deleting a particular list... soon!"); 
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            res.status(200).send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while deleting the record with id:" + req.params.id
            });
        });
};

