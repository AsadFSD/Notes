const Note = require('../models/note');


//  get all notes
const fetchNotes = async (req, res) => {
    try {
        const notes = await Note.find(); // Fetch all notes from the database
        res.json({ notes }); // Respond with the fetched notes
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch notes' }); // Handle any errors that occur
    }
};
//  get a single note by ID
const fetchNote = async (req, res) => {
    const noteId = req.params.id; // Get note ID from the request parameters
    try {
        const note = await Note.findById(noteId); // Fetch the note by ID from the database
        res.json({ note }); // Respond with the fetched note
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch note' }); // Handle any errors that occur
    }
};

// create a new note
const createNote = async (req, res) => {
    const { title, body } = req.body; // Extract title and body from the request body
    
    const note = await Note.create({ title, body }); // Create a new note in the database
    res.json({ note }); // Respond with the created note
};

//update an existing note by ID
const updateNote = async (req, res) => {
    const noteId = req.params.id; // Get note ID from the request parameters
    const title = req.body.title; // Get updated title from the request body
    const body = req.body.body; // Get updated body from the request body

    await Note.findByIdAndUpdate(noteId, { title, body }); // Find the note by ID and update it with the new title and body
    const note = await Note.findById(noteId); // Fetch the updated note from the database
    res.json({ note }); 
};

//Delete an existing note by ID
const deleteNote = async (req, res) =>{
    const noteId = req.params.id
    await Note.deleteOne({ _id: noteId });
  
    res.json({success: "Record Deleted successfully"});
  }

  module.exports = {
    fetchNotes: fetchNotes,
    fetchNote: fetchNote,
    createnote: createNote,
    updateNote: updateNote,
    deleteNote: deleteNote,
  }