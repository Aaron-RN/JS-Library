export const bookToHTML = (book) => `
  <div class="book col-md-6">
    <div class="card shadow">
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">By ${book.author}</h6>
        <h6 class="card-subtitle mb-2 text-muted font-italic">${book.pages} pages</h6>
        <p class="card-text">${book.desc}</p>
        <button class="card-link btn btn-sm btn-read btn-${book.wasRead ? 'success' : 'secondary'}" data-book-id="${book.id}">
          ${book.wasRead ? 'Mark as unread' : 'Mark as read'}
        </button>
        <button class="card-link btn btn-sm btn-danger btn-remove-book" data-book-id="${book.id}">Remove book</button>
      </div>
    </div>
  </div>`;

export const errorToHTML = (error) => `
  <div class="alert alert-danger" role="alert">
    ${error}
  </div>`;
