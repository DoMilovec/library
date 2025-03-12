const container = document.querySelector('.container');
const newBtn = document.querySelector('#new-book');
const dialog = document.querySelector('dialog');
const confirmBtn = document.querySelector('.confirm');
const cancelBtn = document.querySelector('.cancel');
const selectName = document.querySelector('#name');
const selectAuthor = document.querySelector('#author');
const selectPages = document.querySelector('#pages');

const myLibrary = [];

function Book(name, author, pages){
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.id = crypto.randomUUID;
}

function addBookToLibrary(name, author, pages){
    let book = new Book(name, author, pages);
    myLibrary.push(book);
}

// addBookToLibrary('The Great Gatsby', 'Scott Fitzgerald', 246);
// addBookToLibrary('Ulysses', 'James Joyce', 514);
// addBookToLibrary('In Search of Lost Time', 'Marcel Proust', 652);
// addBookToLibrary('One Hundred Years of Solitude', 'Gabriel Garcia', 523);
// addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 423);
// addBookToLibrary('Nineteen Eighty Four', 'George Orwell', 254);

for (let i=0 ; i<myLibrary.length ; i++){
    const card =  document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);
    card.textContent = myLibrary[i].name + ' by ' + myLibrary[i].author + ', has ' + myLibrary[i].pages + ' pages.';
}

newBtn.addEventListener('click', (event) => {
    dialog.showModal();
});

confirmBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const card =  document.createElement('div');
    card.classList.add('card');
    container.appendChild(card);
    card.textContent = selectName.value + ' by ' + selectAuthor.value + ', has ' + selectPages.value + ' pages.';
    dialog.close();
    selectName.value = '';
    selectAuthor.value = '';
    selectPages.value = '';
});

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault();
    dialog.close();
})