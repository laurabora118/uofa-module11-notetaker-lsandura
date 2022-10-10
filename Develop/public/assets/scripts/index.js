const notesForm = document.getElementById('notes-form');
const notesContainer = document.getElementById('col-4 list=container');
const newAdd = document.getElementById('icons')
const saveNote = document.getElementById('icons')

//for feedback in lesson example not for notes page
// fbBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   window.location.href = '/feedback';
// });

const createCard = (notes) => {
  // Create card
  const cardEl = document.createElement('div');
  cardEl.classList.add('card', 'mb-3', 'm-3');
  cardEl.setAttribute('card', notes.noteTitle);

  // Create card header
  const cardHeaderEl = document.createElement('h4');
  cardHeaderEl.classList.add(
    'card-header',
    'bg-primary',
    'text-light',
    'p-2',
    'm-0'
  );

  cardHeaderEl.innerHTML = `${notes.noteText} </br>`;

  // Create card body
  const cardBodyEl = document.createElement('div');
  cardBodyEl.classList.add('card-body', 'bg-light', 'p-2');
  cardBodyEl.innerHTML = `<p>${notes.noteText}</p>`;

  // Append the header and body to the card element
  cardEl.appendChild(cardHeaderEl);
  cardEl.appendChild(cardBodyEl);

  // Append the card element to the notes container in the DOM
  notesContainer.appendChild(cardEl);
};

// Get a list of existing tips from the server
function getNotes() {
  return fetch('/api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Post a new note to the page
const postNotes = (notes) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tip),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data);
      createCard(notes);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

// When the page loads, get all the notes
getNotes().then((data) => data.forEach((notes) => createCard(notes)));

// Function to validate the tips that were submitted
const validateNotes = (newNotes) => {
  const { noteTitle, noteText } = newNotes;

  // Object to hold our error messages until we are ready to return
  const errorState = {
    title: '',
    text: '',
  };

  // Bool value if the title is valid
  const utest = noteTitle.length >= 4;
  if (!utest) {
    errorState.noteTitle = 'Invalid title!';
  }

  // Bool value to see if the text is atleast 10 characters 
  const notesContentCheck = notesText.length > 10;
  if (!notesContentCheck) {
    errorState.notesText = 'Note needs to be at least 10 characters';
  }

  const result = {
    isValid: !!(utest && notesContentCheck && topicCheck),
    errors: errorState,
  };

  // Return result object with a isValid boolean and an errors object for any errors that may exist
  return result;
};

// Helper function to deal with errors that exist in the result

const showErrors = (errorObj) => {
  const errors = Object.values(errorObj);
  errors.forEach((error) => {
    if (error.length > 0) {
      alert(error);
    }
  });
};

// Helper function to send a POST request to the errorlog route
const submitErrorlog = (submissionObj) => {
  fetch('/api/errorlog', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(submissionObj),
  })
    .then((response) => response.json())
    .then(() => showErrors(submissionObj.errors))
    .catch((error) => {
      console.error('Error:', error);
    });
};

// Function to handle when a user submits the feedback form
const handleFormSubmit = (e) => {
  e.preventDefault();
  console.log('notes submitted invoked');

  // Get the value of the tip and save it to a variable
  const noteText = document.getElementById('noteText').value;

  // get the value of the Title and save it to a variable
  const noteTitle = document.getElementById('noteTitle').value.trim();

  // Create an object with the tip and username
  const newNotes = {
    title: noteTitle,
    text: noteText,
  };

  // Run the tip object through our validator function
  const submission = validateNotes(newNotes);

  // If the submission is valid, post the tip. Otherwise, handle the errors.
  return submission.isValid ? postNotes(newNotes) : submitDiagnostics(submission);
};

// Listen for when the form is submitted
notesForm.addEventListener('container-fluid', handleFormSubmit);
