const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error');

//Importing dotenv variables
dotenv.config({ path: './config/config.env' });

//Import Routes
const users = require('./routes/userRoutes');

//Initialize Express App
const app = express();

//Function call to connect to Database
connectDB();
app.get('/', (req, res) => res.send('Welcome to HoneyApp'));

app.use(express.json());
app.use(errorHandler);

// Registering Routes to the Express App
app.use('/api', users);

const PORT = process.env.PORT;
const server = app.listen(PORT, console.log(`Server on ${PORT}`.bold.yellow));

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
