var myLibrary = [];
document.querySelector("#add-book").addEventListener("click", showBookForm);
document.querySelector("#save-book").addEventListener("click", saveBook);
let library = document.querySelector("#library");
let add_button = document.querySelector("#add-book");
let book_form = document.querySelector("#book-form");

class Book {
	constructor(title, author, published, status, color=generateColor()) {
		this.title = title;
		this.author = author;
		this.published = published;
		this.status = status;
		this.color = color;
	}
}

function loadBooks() {
	for (i=0; i<myLibrary.length; i++){
		current_book = myLibrary[i];
		
		// draw each book
		book_form.insertAdjacentHTML("beforebegin", `
			<div class="book removable" style="background-color: ${current_book.color};">
				<h2>${current_book.title}</h2>
				<hr>
				<p class="label">Author</p>
				<p class="detail">${current_book.author}</p>
				<p class="label">Year:</p>
				<p class="detail">${current_book.published}</p>
				<p class="label">Status:</p>
				<p class="detail">${current_book.status}</p>
			</div>
		`)
	}
}

function clearBooks() {
	let removables = document.querySelectorAll(".removable");
	removables.forEach(function(book){
		removeBook(book);
	})

}

function removeBook(book) {
	library.removeChild(book);
}

function showBookForm() {
	if(getComputedStyle(book_form).display == "block") {
		alert("there's a new book");
	} else {
		new_color = generateColor();
		book_form.style.backgroundColor = new_color;
		book_form.style.display = "block";
		add_button.style.display = "none";
	}
}

function saveBook() {

	// get values of form elements
	let book_form = document.querySelector("#book-form");
	let new_title = document.querySelector("#book-title").value;
	let new_author = document.querySelector("#book-author").value;
	let new_published = document.querySelector("#book-published").value;

	// get selected radio button value
	let radios = document.getElementsByName("book-status");
	for (let i = 0; i < radios.length; i++){
		if(radios[i].checked){
			var new_status = radios[i].value;
			break;
		}
	}
	
	// get computed style of new book
	let new_book = document.querySelector("#book-form");
	let new_style = getComputedStyle(new_book);
	let new_color = new_style.backgroundColor;

	// create a new Book object
	const book = new Book(new_title, new_author, new_published, new_status, new_color);
	myLibrary.push(book)

	// hide/show relevant elements
	book_form.style.display = "none";
	add_button.style.display = "block";

	clearBooks();
	loadBooks();
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
	let r = (Math.floor(Math.random() * 100))+75;
	let g = (Math.floor(Math.random() * 100))+75;
	let b = (Math.floor(Math.random() * 100))+75;

	return `rgb(${r}, ${g}, ${b})`
}
