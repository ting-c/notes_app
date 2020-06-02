const yargs = require('yargs');
const { addNote, deleteNote, listAllNotes, readNote, searchNotes } = require('./notes');


yargs.version('1.1.0');

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type:'string'
    }
  },
  handler(argv) {
    addNote(argv.title, argv.body)
  }
});

yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    deleteNote(argv.title)
  }
});

yargs.command({
  command: 'list',
  describe: 'List out all note',
  handler() {
    listAllNotes();
  }
});

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Title of note',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    readNote(argv.title)
  }
});

yargs.command({
  command: 'search',
  describe: 'search notes by word (Case insensitive)',
  builder: {
    word: {
      describe: 'word used to search notes by title',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    searchNotes(argv.word)
  }
});

yargs.parse();