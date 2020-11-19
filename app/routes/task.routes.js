module.exports = (app) => {    
    const tasks = require('../controllers/task.controller.js');    

    // Create a new task   
    app.post('/tasks', tasks.create);    

    // task all task  
    app.get('/tasks', tasks.findAll);    

    // Get a single task by id    
    app.get('/tasks/:id', tasks.findOne);   

    // Update a task by id    
    app.put('/tasks/:id', tasks.update); 

    //Update Tasks 
    //app.put('/UpdateTasks', tasks.updateTasks);  

    // Delete a task by id    
    app.delete('/tasks/:id', tasks.delete);
    }
    