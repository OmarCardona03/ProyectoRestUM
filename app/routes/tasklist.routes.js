module.exports = (app) => {    
    const lists = require('../controllers/tasklist.controller.js'); 

    // Create a new List   
    app.post('/lists', lists.create);  

     // List all list  
    app.get('/lists', lists.findAll);   

    // Get a single list by id    
    app.get('/lists/:id', lists.findOne);  

    // Update a list by id    
    app.put('/lists/:id', lists.update); 

    // Delete a List by id    
    app.delete('/lists/:id', lists.delete);
    }
    