import { useState, useEffect } from "react";
import './App.css';
import axios from "axios";


function App() {
  const [notes, setNotes] = useState(null);
  const [createForm, setcreateform] = useState({
    title: '',
    body: '',
  });
  const [updateForm, setupdateform] = useState({
    _id: null,
    title: '',
    body: '',
  });

  useEffect(() => {
  fetchnotes();
  }, []);

  const fetchnotes = async ()  => {

   const res = await axios.get("http://localhost:3000/note");

   setNotes(res.data.notes);
  
  };

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;

    setcreateform({
     ...createForm,
     [name]: value,
    });
    
  };

 const createNote = async (e) => {
    e.preventDefault();
  
   const res = await axios.post("http://localhost:3000/note",  createForm);

   setNotes([...notes, res.data.note]);

   setcreateform({title: '', body: ''});
 };

 const deleteNote = async (_id) => {
  const res = await axios.delete( `http://localhost:3000/note/${_id}`);

  const newNotes = [...notes].filter((note) =>{
    return note._id !== _id; 
  });
  
  setNotes(newNotes);
 
};

  const handleUpdateFieldChange = (e) => {
    const{value, name} = e.target

    setupdateform({
      ...updateForm,
      [name] : value,

    })
  };

 const toggleUpdate = (note) => {
   console.log(note);

   setupdateform({title: note.title, body: note.body, _id: note._id});
 };

 const updateNote = async (e) => {
  e.preventDefault();

  const {title, body} = updateForm;

  const res = await axios.put(`http://localhost:3000/note/${updateForm._id}`, {title,body});

  const newNotes = [...notes];
  const noteIndex = notes.findIndex(note => {
   return note._id === updateForm._id;
  });
  newNotes[noteIndex] = res.data.note;

  setNotes(newNotes);

  setupdateform({
    _id: null,
    title: '',
    body: '',
  })
 };

  return (<div className="App">
  <div>
    <h2 className="header">Notes</h2>
      {notes && notes.map(note => (
      <div key={note._id}>
        <h3>{note.title}</h3>
        <button onClick={() => deleteNote(note._id)}>Delete Note</button>
        <button onClick={() => toggleUpdate(note)}>Update</button>
      </div>
    ))}
  </div>

  {!updateForm._id && <div>
    <h2>
      Create Note </h2>
      <form onSubmit={createNote}>
        <input onChange={updateCreateFormField} value={createForm.title} name="title" />
        <textarea onChange={updateCreateFormField} value={createForm.body} name="body" />
        <button type="submit">Create Note</button>
        
      </form>
  </div>}
  
  {updateForm._id && <div>
    <h2>Update Note</h2>
    <form onSubmit={updateNote}>
      <input onChange={handleUpdateFieldChange} value={updateForm.title} name="title"/>
      <textarea onChange={handleUpdateFieldChange} value={updateForm.body} name="body"/>
      <button type="submit">Update Note</button>
    </form>
  </div>}
  
   </div>);
}

export default App;
