"use strict";

/** @type {Book[]} */
const myLibrary = [];

/**
 * Generates a unique id for a book.
 * `crypto.randomUUID()` only works in a secure context (https, or
 * http://localhost). If this page is opened directly as a file
 * (file:// in the address bar), that API doesn't exist and throws —
 * which silently breaks every "Add Book" submission. This fallback
 * keeps the app working no matter how the page was opened.
 * @returns {string}
 */
function generateId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID();
    }
    return `book-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/**
 * @constructor
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} readStatus
 */
function Book(title, author, pages, readStatus) {
    this.id = generateId();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

Book.prototype.toggleRead = function toggleRead() {
    this.readStatus = !this.readStatus;
};

/**
 * Creates a Book and adds it to the library.
 * @param {string} title
 * @param {string} author
 * @param {number} pages
 * @param {boolean} readStatus
 * @returns {Book} the book that was added
 */
function addBookToLibrary(title, author, pages, readStatus) {
    const newBook = new Book(title, author, pages, readStatus);
    myLibrary.push(newBook);
    return newBook;
}

function removeBook(bookId) {
    const index = myLibrary.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayBooks();
    }
}

function toggleReadStatus(bookId) {
    const book = myLibrary.find((book) => book.id === bookId);
    if (book) {
        book.toggleRead();
        displayBooks();
    }
}

/* ====================================
   DOM REFERENCES
   ==================================== */

const container = document.getElementById("libraryDisplay");
const dialog = document.getElementById("bookDialog");
const newBookBtn = document.getElementById("newBookBtn");
const cancelBtn = document.getElementById("cancelBtn");
const bookForm = document.getElementById("bookForm");

// data-action values used for event delegation on the card buttons
const ACTION_TOGGLE = "toggle";
const ACTION_REMOVE = "remove";

/* ====================================
   RENDERING
   ==================================== */

/**
 * Builds a single book card element. Kept separate from displayBooks()
 * so each piece of the render pipeline has one job.
 * @param {Book} book
 * @returns {HTMLElement}
 */
function createBookCard(book) {
    const card = document.createElement("div");
    card.className = "book-card";
    card.dataset.bookId = book.id;

    const title = document.createElement("div");
    title.className = "book-title";
    title.textContent = `📖 ${book.title}`;

    const author = document.createElement("div");
    author.className = "book-author";
    author.textContent = `Author: ${book.author}`;

    const pages = document.createElement("div");
    pages.className = "book-pages";
    pages.textContent = `Pages: ${book.pages}`;

    const status = document.createElement("div");
    status.className = `book-status ${book.readStatus ? "read" : "unread"}`;
    status.textContent = book.readStatus ? "Status: ✅ Read" : "Status: ❌ Not Read";

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const toggleBtn = document.createElement("button");
    toggleBtn.className = "btn btn-outline";
    toggleBtn.textContent = book.readStatus ? "Mark as Unread" : "Mark as Read";
    toggleBtn.dataset.action = ACTION_TOGGLE;
    toggleBtn.dataset.bookId = book.id;

    const removeBtn = document.createElement("button");
    removeBtn.className = "btn btn-danger";
    removeBtn.textContent = "Remove";
    removeBtn.dataset.action = ACTION_REMOVE;
    removeBtn.dataset.bookId = book.id;

    actions.append(toggleBtn, removeBtn);
    card.append(title, author, pages, status, actions);

    return card;
}

function renderEmptyState() {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.innerHTML = `
        <span class="empty-icon">📚</span>
        <h3>Your library is empty</h3>
        <p>Click the "New Book" button to add your first book!</p>
    `;
    container.appendChild(empty);
}

function displayBooks() {
    container.innerHTML = "";

    if (myLibrary.length === 0) {
        renderEmptyState();
        return;
    }

    myLibrary.forEach((book) => {
        container.appendChild(createBookCard(book));
    });
}

/* ====================================
   EVENT HANDLERS
   ==================================== */

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
});

cancelBtn.addEventListener("click", () => {
    dialog.close();
    bookForm.reset();
});

// Click outside the dialog's content area (on the backdrop) to close it
dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
        dialog.close();
    }
});

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const pages = Number(document.getElementById("pages").value);
    const readStatus = document.getElementById("readStatus").checked;

    addBookToLibrary(title, author, pages, readStatus);
    displayBooks();

    bookForm.reset();
    dialog.close();
});

// Event delegation: one listener handles every card's toggle/remove buttons,
// including cards added after the page first loaded.
container.addEventListener("click", (event) => {
    const { action, bookId } = event.target.dataset;

    if (action === ACTION_REMOVE) {
        removeBook(bookId);
    } else if (action === ACTION_TOGGLE) {
        toggleReadStatus(bookId);
    }
});

/* ====================================
   INITIAL SEED DATA
   ==================================== */

function seedLibrary() {
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
    addBookToLibrary("Dune", "Frank Herbert", 412, false);
    addBookToLibrary("1984", "George Orwell", 328, true);
    addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
}

seedLibrary();
displayBooks();