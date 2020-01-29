let libraryDiv = document.getElementById("Library");
let btnAddBook = document.getElementById("btnAddBook");
let myLibrary = [];

btnAddBook.addEventListener("click", addBookToLibrary);

function Book(title, author, desc) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.desc = desc;
}

function render(){
    const html = myLibrary
    .reduce((html, book) => {
        `${html}
        <div class="">${book.title}</div>
        <div class="">${book.author}</div>
        <div class="">${book.desc}</div>`
        return html;
    }, '');
    console.log(html);
}

function addBookToLibrary() {
    let bookTitle = document.getElementById("title");
    let bookAuthor = document.getElementById("author");
    let bookDesc = document.getElementById("desc");

    let book = new Book(bookTitle.value, bookAuthor.value, bookDesc.value);
    myLibrary.push(book);
    render();
}