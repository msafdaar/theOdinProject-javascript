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

    document.querySelector("form").reset();
    }

    displayAllBooks(){
    //add header row
    document.getElementById("books_container").innerHTML = `
    <tr>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400" >Title</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400" >Author</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 w-10" >Pages</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 w-10" >Status</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 w-10" >Action</th>
    </tr>`
    
    //then add data rows with another function
    this.storage.forEach((book,index) => {this.displaySingleBook(book, index)})    
    }

    displaySingleBook(book, buttonReference = "none"){
        let statusClass;
        if (book.read == "READ"){
            statusClass = "text-green-600";
        } else if(book.read == "NOT READ"){
            statusClass = "text-yellow-600"
        }
        let bookDiv = document.createElement("tr");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
        <td class="border p-1">${book.title}</td>
        <td class="border p-1">${book.author}</td>
        <td class="border p-1 font-mono">${book.pages}</td>
        <td class="border p-1 ${statusClass}">${book.read}</td>
        <td class="border p-1 flex flex-col text-xs">
            <button class="border bg-slate-200 active:ring text-slate-900" onclick = "library.changeStatus(event)" data-reference="${buttonReference}">Toggel Status</button>
            <button class="border bg-slate-200 active:ring text-slate-900 mt-1" onclick = "library.deleteBook(event)" data-reference="${buttonReference}">Delete Book</button>
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
