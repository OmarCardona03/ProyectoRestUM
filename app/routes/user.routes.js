module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new User   
    app.post('/users', users.create);

    //Loguear User
    app.post('/users/login', users.login);

    // List all User  
    app.get('/users', users.findAll);

    // Get a single user by id    
    app.get('/users/:id', users.findOne);

    // Update a User by id    
    app.put('/users/:id', users.update);

    // Delete a User by id    
    app.delete('/users/:id', users.delete);
}
