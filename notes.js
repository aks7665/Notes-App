const fs = require('fs');

var fetchNotes = () => {
  try {
     var noteString = fs.readFileSync('notes-data.json');
     return JSON.parse(noteString)
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};

var addNote = (title,body) => {
   var notes = fetchNotes();
   var note = {
     title: title,
     body: body
   }

   var duplicateNotes = notes.filter((note) => note.title === title );

   if(duplicateNotes.length === 0) {
     notes.push(note);
     saveNotes(notes);
     return note;
   }
};

var getAll = () => {
  return fetchNotes();
};

var getNote = (title) => {
  var notes = fetchNotes();
  var filterNote = notes.filter((note) => note.title === title )
  return filterNote[0];
};

var removeNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => note.title !== title );
  saveNotes(newNotes);
  return notes.length !== newNotes.length;
};

var logNote = (note) => {
  console.log("--");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};


module.exports = {
  addNote: addNote,
  getAll: getAll,
  getNote: getNote,
  removeNote: removeNote,
  logNote: logNote
}
