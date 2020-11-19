// Importar Librerias [1]  
////////////////////////////////////////////////////////////////////////
const express = require('express'); //Framework Web
const cors = require('cors') //Permite ser llamado desde diferentes origenes
const bodyParser = require('body-parser'); //Manipular valores request

// Database configuration
const dbConfig = require('./config/database.config.js'); //conexion archivo BD
const mongoose = require('mongoose'); //Cargar libreria mongoose
mongoose.Promise = global.Promise;


// Create the Express Application [2]
////////////////////////////////////////////////////////////////////////

const app = express(); //App del framework web

// Configure the server [3]
////////////////////////////////////////////////////////////////////////
// Parse requests of content-type - "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }))
// Parse requests of content-type - "application/json"
app.use(bodyParser.json())
// Activate the CORS access on all routes
app.use(cors())

// Listening server port (Puerto donde Corre el servidor WEB)
var port = process.env.PORT || 3000; //Puerto PORT o 3000, PORT Para web

// Define the routes [4]
////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
 res.json({
 "message": "This is a JSON response to a HTTP GET request."
 });
});
   
   //Llamado al archivo de rutas
   require('./app/routes/user.routes.js')(app);
   require('./app/routes/tasklist.routes.js')(app);
   require('./app/routes/task.routes.js')(app);

// Start the server with selected configuration [5]
////////////////////////////////////////////////////////////////////////

// Connect to the database
mongoose.connect(dbConfig.url, dbConfig.options)
.then(() => {
 console.log("Connect to database: success!");
}).catch(err => {
 console.log('Connect to database: failure!');
 process.exit();
});

app.listen(port, () => {
 console.log("Server is listening on port " + port);
});
