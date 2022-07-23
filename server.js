const express = require('express');
const bodyParser = require('body-parser');

//Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//connecting to database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log('You done did it, connected to db');
}).catch(err => {
    console.log('Nope, not connecting to db. Exiting...', err);
    process.exit();
});

//create express app
const app = express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

//parse requests of content-type application/json
app.use(bodyParser.json())

//define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take quick notes. Organize and track your notes."});
});
//.........
//require Notes routes
require('./app/routes/note.routes.js')(app);
//.........
//listen for requests
app.listen(3000, () => {
    console.log("Server running on PORT 3000");
});