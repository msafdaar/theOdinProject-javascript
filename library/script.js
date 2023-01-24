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
    toggelForm()
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
    //add header row
    document.getElementById("books_container").innerHTML = `
    <tr class="book book-header">
    <th class="book-title">Title</th>
    <th class="book-author"> Author</th>
    <th class="book-pages">Pages</th>
    <th class="book-status">Status</th>
    <th class="book-action">Action</th>
    </tr>`
    
    //then add data rows with another function
    this.storage.forEach((book,index) => {this.displaySingleBook(book, index)})    
    }

    displaySingleBook(book, buttonReference = "none"){
        let statusClass;
        if (book.read == "READ"){
            statusClass = "book-old";
        } else if(book.read == "NOT READ"){
            statusClass = "book-new"
        }
        let bookDiv = document.createElement("tr");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
        <td class="book-title">${book.title}</td>
        <td class="book-author">${book.author}</td>
        <td class="book-pages">${book.pages}</td>
        <td class="book-status ${statusClass}">${book.read}</td>
        <td class="book-action">
            <button onclick = "library.changeStatus(event)" data-reference="${buttonReference}">Change Status</button>
            <button onclick = "library.deleteBook(event)" data-reference="${buttonReference}">Delete Book</button>
        </td>`;
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
    x.classList.toggle("hidden")
}
