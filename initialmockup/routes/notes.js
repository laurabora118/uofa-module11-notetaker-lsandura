// //example from tips lesson express day refactored
const notes = require('express').Router();
const{
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../../helpers/fsUtils')

// // GET Route retrieve the notes
notes.get('/', (req, res) => {
  readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:noteTitle', (req, res) => {
  const noteTitle = req.params.noteTitle;
  readFromFile('./db/notes.jdon')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.noteTitle === noteTitle);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with title');
    });
});
//to delete the note BONUS only
// DELETE Route for a specific note
notes.delete('/:noteTitle', (req, res) => {
  const noteTitle = req.params.noteTitle;
  readFromFile('./db/notes.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      // Make a new array of all tips except the one with the ID provided in the URL
      const result = json.filter((note) => note.noteTitle !== noteTitle);
      // Save that array to the filesystem
      writeToFile('./db/notes.json', result);
      // Respond to the DELETE request
      res.json(` ${noteTitle} deleted`);
    });
});

//do I need this type of post??
// POST Route note
notes.post('/', (req, res) => {
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
    };

    readAndAppend(newNote, './db/notes.json');
    res.json(`Note added`);
  } else {
    res.error('note error');
  }
});

module.exports = notes;
