const libraryDiv = document.getElementById('Library');
const btnAddBook = document.getElementById('btnAddBook');
let myLibrary = [];

btnAddBook.addEventListener('click', addBookToLibrary);

function Book(title, author, desc) {
  this.constructor = Book;
  this.id = Math.random().toString(36).substr(2, 9);
  this.title = title;
  this.author = author;
  this.desc = desc;
  this.wasRead = false;
}

Book.prototype.toggleRead = () => {
  this.wasRead = !this.wasRead;
};

const removeBook = (e) => {
  const { bookId } = e.target.dataset;
  myLibrary = myLibrary.filter(book => book.id !== bookId);
  render();
};

const readBook = (e) => {
  const { bookId } = e.target.dataset;
  const book = myLibrary.find(book => book.id === bookId);
  book.toggleRead();
  render();
};

const bookToHTML = (book) => `
  <div class="book card">
    <div class="card-body">
      <h5 class="card-title">${book.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
      <p class="card-text">${book.desc}</p>
      <button class="card-link btn btn-read btn-read-book-${book.wasRead}" data-book-id="${book.id}">Read book</button>
      <button class="card-link btn btn-danger btn-remove-book" data-book-id="${book.id}">Remove book</button>
    </div>
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
  const bookTitle = document.getElementById('title');
  const bookAuthor = document.getElementById('author');
  const bookDesc = document.getElementById('desc');

  const book = new Book(bookTitle.value, bookAuthor.value, bookDesc.value);
  myLibrary.push(book);
  render();
}
