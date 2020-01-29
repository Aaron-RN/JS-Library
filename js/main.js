const libraryDiv = document.getElementById('Library');
const errorElem = document.getElementById('errors');
const btnNewBook = document.getElementById('btnNewBook');
const btnAddBook = document.getElementById('btnAddBook');
let myLibrary = [];

function Book(title, author, desc) {
  this.constructor = Book;
  this.id = Math.random().toString(36).substr(2, 9);
  this.title = title;
  this.author = author;
  this.desc = desc;
  this.wasRead = false;
}

Book.prototype.toggleRead = function toogleRead() {
  this.wasRead = !this.wasRead;
};

/* eslint-disable no-use-before-define */
const removeBook = (e) => {
  const { bookId } = e.target.dataset;
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render();
};

const readBook = (e) => {
  const { bookId } = e.target.dataset;
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleRead();
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render();
};
/* eslint-enable no-use-before-define */

const bookToHTML = (book) => `
  <div class="book col-md-6">
    <div class="card shadow">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
        <p class="card-text">${book.desc}</p>
        <button class="card-link btn btn-sm btn-read btn-${book.wasRead ? 'success' : 'secondary'}" data-book-id="${book.id}">
          ${book.wasRead ? 'Mark as unread' : 'Mark as read'}
        </button>
        <button class="card-link btn btn-sm btn-danger btn-remove-book" data-book-id="${book.id}">Remove book</button>
      </div>
    </div>
  </div>`;

const errorToHTML = (error) => `
  <div class="alert alert-danger" role="alert">
    ${error}
  </div>`;

function render() {
  const html = myLibrary.reduce((html, book) => `${html}${bookToHTML(book)}`, '');
  libraryDiv.innerHTML = html;
  const removeBookBtns = document.querySelectorAll('.btn-remove-book');
  removeBookBtns.forEach(button => button.addEventListener('click', removeBook));
  const readBookBtns = document.querySelectorAll('.btn-read');
  readBookBtns.forEach(button => button.addEventListener('click', readBook));
}

function addBookToLibrary() {
  const errors = [];
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const bookDesc = document.getElementById('desc');

  if (!bookTitle.value) { errors.push('No Title Given!'); }
  if (!bookAuthor.value) { errors.push('No Author Given!'); }
  if (!bookDesc.value) { errors.push('No Description Given!'); }
  if (errors.length > 0) {
    const html = errors.reduce((html, error) => `${html}${errorToHTML(error)}`, '');
    errorElem.innerHTML = html;
    return;
  }
  const book = new Book(bookTitle.value, bookAuthor.value, bookDesc.value);
  myLibrary.push(book);
  errorElem.innerHTML = '';
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
  render();
}

const storedBooks = localStorage.getItem('myLibrary');
if (storedBooks) {
  const books = JSON.parse(storedBooks).map((storedBook) => Object.assign(new Book(), storedBook));
  myLibrary = [...books];
  render();
}

btnAddBook.addEventListener('click', addBookToLibrary);
btnNewBook.addEventListener('click', () => { errorElem.innerHTML = ''; });
