// Query selectors
const container = document.querySelector('.container');
const newBtn = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('.confirm');
const cancelBtn = document.querySelector('.cancel');
const selectName = document.querySelector('#name');
const selectAuthor = document.querySelector('#author');
const selectPages = document.querySelector('#pages');

// Library array creation
const myLibrary = [];

// Book constructor and function for adding the book to library
function Book(name, author, pages){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
}
function addBookToLibrary(name, author, pages){
    let book = new Book(name, author, pages);
    myLibrary.push(book);
}

// Add new book, opens modal on click
newBtn.addEventListener('click', (event) => {
    dialog.showModal();
});

// Confirm button to add the book to the library
confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(selectName.value, selectAuthor.value, selectPages.value);

    container.textContent = ''; // clears container on each book that is added

    // Loop to add and display books in the library
    for (let i=0 ; i<myLibrary.length ; i++){
        const card =  document.createElement('div');
        card.classList.add('card');
        container.appendChild(card);
        card.textContent = myLibrary[i].name + ' by ' + myLibrary[i].author + ', has ' + myLibrary[i].pages + ' pages.';
        
        // saving the book ID in the loop
        const bookId = myLibrary[i].id;

        // delete button and logic to remove specific book
        const delBtn = document.createElement('button');
        delBtn.textContent = 'X';
        container.appendChild(delBtn);
        delBtn.addEventListener('click', (event) => {
            card.remove();
            delBtn.remove();
    
            // find and remove the book from myLibrary
            const indexToRemove = myLibrary.findIndex(book => book.id === bookId);
            if (indexToRemove !== -1) {
                myLibrary.splice(indexToRemove, 1); // remove the correct book
            }
    });
    }
    dialog.close();
    selectName.value = '';
    selectAuthor.value = '';
    selectPages.value = ''; 
    
});

// Cancel button in adding the book modal
cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
})