const libraryDiv = document.getElementById('Library');
const errorElem = document.getElementById('errors');
const btnNewBook = document.getElementById('btnNewBook');
const btnAddBook = document.getElementById('btnAddBook');
let myLibrary = [];

function Book(title, author, pages, desc) {
  this.constructor = Book;
  this.id = Math.random().toString(36).substr(2, 9);
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.desc = desc;
  this.wasRead = false;
}

Book.prototype.toggleRead = function toogleRead() {
  this.wasRead = !this.wasRead;
};

const saveToLocalStorage = () => {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
};

/* eslint-disable no-use-before-define */
const removeBook = (e) => {
  const { bookId } = e.target.dataset;
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  saveToLocalStorage();
  render();
};

const readBook = (e) => {
  const { bookId } = e.target.dataset;
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleRead();
  saveToLocalStorage();
  render();
};
/* eslint-enable no-use-before-define */

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
  const bookTitle = document.getElementById('title').value;
  const bookAuthor = document.getElementById('author').value;
  const bookPages = parseInt(document.getElementById('pages').value, 10);
  const bookDesc = document.getElementById('desc').value;

  if (!bookTitle) { errors.push('No Title Given!'); }
  if (!bookAuthor) { errors.push('No Author Given!'); }
  if (Number.isNaN(bookPages) || bookPages < 1) { errors.push('No valid Number of pages Given!'); }
  if (!bookDesc) { errors.push('No Description Given!'); }

  if (errors.length > 0) {
    const html = errors.reduce((html, error) => `${html}${errorToHTML(error)}`, '');
    errorElem.innerHTML = html;
    return;
  }
  const book = new Book(bookTitle, bookAuthor, bookPages, bookDesc);
  myLibrary.push(book);
  errorElem.innerHTML = '';
  saveToLocalStorage();
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
