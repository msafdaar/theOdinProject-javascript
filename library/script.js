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
    this.storage = [
        new Book("A Game of Thrones", "George R. R. Martin", 694, "Yes"),
        new Book("A Clash of Kings", "George R. R. Martin", 761, "No"),
        new Book("A Storm of Swords", "George R. R. Martin", 973, "No"),
        new Book("Fire & Blood", "George R. R. Martin", 973, "No"),
        new Book("The Winds of Winter", "George R. R. Martin", 973, "No"),
        new Book("A Dance with Dragons", "George R. R. Martin", 973, "No"),
        new Book("The Rise of the Dragon: An Illustrated History", "George R. R. Martin", 973, "No"),
        new Book("A Dream of Spring", "George R. R. Martin", 973, "No"),
        new Book("A Knight of the Seven Kingdoms", "George R. R. Martin", 973, "No"),
        new Book("A Feast for Crows", "George R. R. Martin", 973, "No"),
        new Book("The Princess and the Queen", "George R. R. Martin", 973, "No"),
        new Book("The Ice Dragon", "George R. R. Martin", 973, "No"),
        new Book("Tales of Dunk and Egg", "George R. R. Martin", 973, "No"),
    ];
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
        status = "Yes";
    } else if (notReadRadio.checked){
        status = "No"
    };
    this.storage.push(new Book(title, author, pages, status));
    this.displayAllBooks();    

    document.querySelector("form").reset();
    }

    displayAllBooks(){
    //add header row
    document.getElementById("books_container").innerHTML = `
    <tr>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " >Title</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " >Author</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " >Pages</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " >Read</th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " ></th>
    <th class="text-left bg-slate-200 pt-4 pb-2 px-2 border border-slate-400 " ></th>
    </tr>`
    
    //then add data rows with another function
    this.storage.forEach((book,index) => {this.displaySingleBook(book, index)})    
    }

    displaySingleBook(book, buttonReference = "none"){
        let statusClass;
        if (book.read == "Yes"){
            statusClass = "bg-green-100";
        } else if(book.read == "No"){
            statusClass = "bg-yellow-100"
        }
        let bookDiv = document.createElement("tr");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
        <td class="border border-slate-500 p-1 ${statusClass}">${book.title}</td>
        <td class="border border-slate-500 p-1 ${statusClass}">${book.author}</td>
        <td class="border border-slate-500 p-1 font-mono ${statusClass}">${book.pages}</td>
        <td class="border border-slate-500 p-1 ${statusClass}">${book.read}</td>
        <td class="border border-slate-500 text-xs hover:bg-slate-100  active:bg-blue-200">
            <button class="underline w-full h-full p-1" onclick = "library.changeStatus(event)" data-reference="${buttonReference}">Toggel Read</button>
        </td>
        <td class="border border-slate-500 text-xs hover:bg-slate-100  active:bg-red-400">
            <button class="underline w-full h-full p-1" onclick = "library.deleteBook(event)" data-reference="${buttonReference}">Delete Book</button>
        </td>
        `
        document.getElementById("books_container").appendChild(bookDiv);
    }

    changeStatus(event){
        let index = parseInt(event.target.dataset.reference, 10);
        if(this.storage[index].read == "Yes"){
            this.storage[index].read = "No";
        } else {
            this.storage[index].read = "Yes"
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
