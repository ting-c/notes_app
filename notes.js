const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const titleIsTaken = notes.find( note => note.title === title );
  if (titleIsTaken) {
    console.log(chalk.red('Title already exist!'));
  } else {
    notes.push({ title, body });
    saveNote(notes);
    console.log(chalk.green.inverse('Note was added successfully!'));
  };
};

const deleteNote = (title) => {
  const notes = loadNotes();
  const noteIdx = notes.findIndex( note => note.title === title);
  if (noteIdx === -1) {
    console.log(chalk.red(`Note title doesn't exists!`));
  } else {
    notes.splice(noteIdx, 1);
    saveNote(notes);
    console.log(chalk.green.inverse('Note was deleted successfully!'));
  };  
};

const listAllNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('All Notes'));
  notes.forEach( note => { 
    console.log(chalk.magenta(`Title: ${note.title}`));
    console.log(chalk.green(`Body: ${note.body}\n`));
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find( note => note.title === title);
  if (note) {
    console.log(chalk.magenta(`Title: ${note.title}`))
    console.log(chalk.green(`Body: ${note.body}`));
  } else {
    console.log(chalk.red.inverse(`No note found!`));
  };
};

const searchNotes = (word) => {
  const notes = loadNotes();
  const list = notes.filter( note => 
    note.title.toLowerCase().includes(word.toLowerCase()));
  if (list.length === 0) {
    console.log(chalk.red.inverse(`No note found!`));
  } else {
    console.log(chalk.green.inverse(`Note(s) found \n`));
    list.forEach( note => { 
      console.log(chalk.magenta.inverse(`Title:`) + chalk.magenta(` ${note.title}`))
      console.log(chalk.blue.inverse(`Body:`) + chalk.blue(` ${note.body}`))
    });
  }
};

const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  };
};

module.exports = {
  addNote,
  deleteNote,
  listAllNotes,
  readNote,
  searchNotes
};

