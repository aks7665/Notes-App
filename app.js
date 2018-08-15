const fs = require('fs');
const os = require('os');

const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
 
const titleOption = {
  describe: 'Title of note',
  demand: true,
  alias: 't'
};
const bodyOption = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
};

var argv = yargs
  .command('add', 'Add a new note', {
      title: titleOption,
      body: bodyOption
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
      title: titleOption
  })
  .command('remove', 'Remove a note', {
      title: titleOption
  }).help().argv;

var command = argv._[0];

if (command === "add") {
  var note = notes.addNote(argv.title,argv.body);
  if (note) {
    console.log("Note created");
    notes.logNote(note);
  } else {
    console.log("Note title taken");
  }
}
else if(command === "list") {
  var allNotes = notes.getAll();
  console.log(`Total result(s) - ${allNotes.length}`);
  allNotes.forEach((note) => notes.logNote(note));
}
else if(command === "read") {
  var note = notes.getNote(argv.title);
  if (note) {
    console.log("Note Found");
    notes.logNote(note);
  } else {
    console.log("Note not found");
  }
}
else if(command === "remove") {
  var removedStatus = notes.removeNote(argv.title);
  var msg = removedStatus ? "Note was removed" : "Note not found";
  console.log(msg);
}
else {
  console.log("command not recognized");
}
