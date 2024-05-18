// Load environment variables from .env file in non-production environments
if (process.env.NODE_ENV !== 'production') {
    require("dotenv").config();
}

const express = require('express'); // Import express module
const connectToDb = require('./config/connectToDb'); // Import the function to connect to the database
const notesController = require('./controllers/notesControllers');
const notesControllers = require("./controllers/notesControllers");

const app = express(); // Create an instance of express

app.use(express.json()); // Middleware to parse JSON bodies in requests

// Connect to the database
connectToDb();

// Route to get all notes
app.get('/note', notesControllers.fetchNotes );

// Route to get a single note by ID
app.get('/note/:id', notesControllers.fetchNote );

// Route to create a new note
app.post('/note', notesControllers.createnote );

// Route to update an existing note by ID
app.put('/note/:id', notesControllers.updateNote );

app.delete('/note/:id', notesControllers.deleteNote );

// Start the server on the specified port, defaulting to 3000 if not specified
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
