class Book{
    constructor(title = "unknown",author = "unknown", pages = "unknown", read = "unknown"){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;        
    }
}
class Library{

    constructor(){
    //default books
    this.storage = [new Book("A Game of Thrones", "George R. R. Martin", 694, "READ"),new Book("A Clash of Kings", "George R. R. Martin", 761, "NOT READ"),new Book("A Storm of Swords", "George R. R. Martin", 973, "NOT READ")];
    }

    addBook(){
    let author = document.getElementById("input_author").value;
    let title = document.getElementById("input_title").value;
    let pages = document.getElementById("input_pages").value;
    let readRadio = document.getElementById("read_true");
    let notReadRadio = document.getElementById("read_false");
    let status;
    if (readRadio.checked){
        status = "READ";
    } else if (notReadRadio.checked){
        status = "NOT READ"
    };
    this.storage.push(new Book(title, author, pages, status));
    this.displayAllBooks();    
    }

    displayAllBooks(){
    //add header row manually
    document.getElementById("books_container").innerHTML = `<div class="book book-header"><div class="book-title">Title</div> <div class="book-author"> Author</div> <div class="book-pages">Pages</div> <div class="book-status">Status</div> <div class="book-action">Action</div></div>`
    this.storage.forEach((book,index) => {this.displaySingleBook(book, index)})    
    }

    displaySingleBook(book, buttonReference = "none"){
        let statusClass;
        if (book.read == "READ"){
            statusClass = "book-old";
        } else if(book.read == "NOT READ"){
            statusClass = "book-new"
        }
        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <div class="book-pages">${book.pages}</div>
        <div class="book-status ${statusClass}">${book.read}</div>
        <div class="book-action"><button onclick = "library.changeStatus(event)" data-reference="${buttonReference}">Change Status</button><button onclick = "library.deleteBook(event)" data-reference="${buttonReference}">Delete Book</button></div>`;
        document.getElementById("books_container").appendChild(bookDiv);
    }

    changeStatus(event){
        let index = parseInt(event.target.dataset.reference, 10);
        if(this.storage[index].read == "READ"){
            this.storage[index].read = "NOT READ";
        } else {
            this.storage[index].read = "READ"
        }
        this.displayAllBooks();
    }

    deleteBook(event){
        let index = parseInt(event.target.dataset.reference, 10);
        this.storage.splice(index,1);
        this.displayAllBooks();
    }
}

let library = new Library()
library.displayAllBooks();

function toggelForm() {
    var x = document.getElementById("new_book_form");
    if (x.style.display === "none") {
      x.style.display = "flex";
    } else {
      x.style.display = "none";
    }
  }

toggelForm();