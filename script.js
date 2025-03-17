// query selectors
const container = document.querySelector('.container');
const newBtn = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('.confirm');
const cancelBtn = document.querySelector('.cancel');
const selectName = document.querySelector('#name');
const selectAuthor = document.querySelector('#author');
const selectPages = document.querySelector('#pages');

// library array creation
const myLibrary = [];

// book constructor and function for adding the book to library
function Book(name, author, pages){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID();
    this.read = 'unread';
    this.current = 'currentNo';
}
function addBookToLibrary(name, author, pages){
    let book = new Book(name, author, pages);
    myLibrary.push(book);
}

Book.prototype.toggleRead = function(){
    if (this.read === 'unread'){
        this.read = 'read';
    } else if (this.read === 'read'){
        this.read = 'unread';
    }
}

Book.prototype.toggleCurrent = function(){
    if (this.current === 'currentNo'){
        this.current = 'currentYes';
    } else if (this.current === 'currentYes'){
        this.current = 'currentNo';
    }
}

// add new book, opens modal on click
newBtn.addEventListener('click', (event) => {
    dialog.showModal();
});

// confirm button to add the book to the library
confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addBookToLibrary(selectName.value, selectAuthor.value, selectPages.value);

    // clears container on each book that is added
    const books = document.querySelectorAll('.card');
    books.forEach(book => book.remove());

    // loop to add and display books in the library
    for (let i=0 ; i<myLibrary.length ; i++){
        const book = myLibrary[i];
        const card =  document.createElement('div');
        card.classList.add('card');

        if (book.read === 'read') {
            card.classList.add('read');
        } else {
            card.classList.add('unread');
        }
        
        if (book.current === 'currentYes') {
            card.classList.add('currentYes');
        } else {
            card.classList.add('currentNo');
        }


        container.appendChild(card);
        function updateCardText(card, book) {
            card.textContent = book.name 
                + (window.matchMedia("(max-width: 768px)").matches 
                    ? '\u00A0\u00A0\u00A0\n' 
                    : '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0')
                + book.author 
                + (window.matchMedia("(max-width: 768px)").matches 
                    ? '\u00A0\u00A0\u00A0\n' 
                    : '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0')
                + book.pages 
                + ' pages';
        }
        
        updateCardText(card, myLibrary[i]);
        
        window.addEventListener('resize', () => updateCardText(card, myLibrary[i]));        
        
        // card.textContent = myLibrary[i].name + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + myLibrary[i].author + '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' + myLibrary[i].pages + ' pages';
        // saving the book ID in the loop
        const bookId = myLibrary[i].id;

        // mark currently being read button
        const currentBtn = document.createElement('button');
        currentBtn.textContent = '📖';
        currentBtn.classList.add('currentBtn');
        card.appendChild(currentBtn);

        // checks if the button is currently toggled and applies class based on it
        if (book.current === 'currentYes') {
            currentBtn.classList.add('currentBtnYes');
        } else {
            currentBtn.classList.add('currentBtnNo');
        }

        currentBtn.addEventListener('click', (event) => {  
            if (book.current === 'currentNo'){
                card.classList.remove('currentNo');
                card.classList.add('currentYes');
                currentBtn.classList.remove('currentBtnNo')
                currentBtn.classList.add('currentBtnYes')
            } else if (book.current === 'currentYes'){
                card.classList.remove('currentYes');
                card.classList.add('currentNo');
                currentBtn.classList.remove('currentBtnYes')
                currentBtn.classList.add('currentBtnNo')
            }
            book.toggleCurrent();
        });

        // read toggle button
        const readBtn = document.createElement('button');
        readBtn.textContent = '✔️';
        readBtn.classList.add('readBtn');
        card.appendChild(readBtn);

        // checks if the button is currently toggled and applies class based on it
        if (book.read === 'read') {
            readBtn.classList.add('readBtnYes');
        } else {
            readBtn.classList.add('readBtnNo');
        }

        readBtn.addEventListener('click', (event) => {  
            if (book.read === 'unread'){
                card.classList.remove('unread');
                card.classList.add('read');
                card.classList.remove('currentYes');
                currentBtn.classList.remove('currentBtnYes')
                currentBtn.classList.add('currentBtnNo')
                readBtn.classList.remove('readBtnNo')
                readBtn.classList.add('readBtnYes')
            } else if (book.read === 'read'){
                card.classList.remove('read');
                card.classList.add('unread');
                readBtn.classList.add('readBtnNo')
                readBtn.classList.remove('readBtnYes')
            }
            book.toggleRead();
        });

        // delete button and logic to remove specific book
        const delBtn = document.createElement('button');
        delBtn.textContent = '✘';
        delBtn.classList.add('delBtn');
        card.appendChild(delBtn);
        delBtn.addEventListener('click', (event) => {
            card.remove();
            delBtn.remove();
            readBtn.remove();
    
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

// Function to limit number of pages allowable to enter
function limitInputPages(input) {
    if (input.value.length > 5) {
        input.value = input.value.slice(0, 5); // Trim excess digits
    }
}