// global variables go here
var myLibrary = [];
document.querySelector("#add-book").addEventListener("click", showBookForm);
document.querySelector("#save-book").addEventListener("click", saveBook);
document.querySelector("#cancel-save").addEventListener("click", cancelSave);
let library = document.querySelector("#library");
let add_button = document.querySelector("#add-book");
let book_form = document.querySelector("#book-form");
let form_title = document.querySelector("#book-title");
let form_author = document.querySelector("#book-author");
let form_date = document.querySelector("#book-date");
let form_radios = document.getElementsByName("book-status");


// CLASSES

class Book {
	constructor(title, author, date, status, color=generateColor()) {
		this.title = title;
		this.author = author;
		this.date = date;
		this.status = status;
		this.color = color;
	}

	save() {
		let tmp_title = this.title.replace(" ", "");
		let tmp_author = this.author.replace(" ", "");
		let tmp_date = this.date.replace(" ", "");

		if (tmp_title == "" || tmp_author == "" || tmp_date == "" ){
			alert("Book fields cannot be blank!");
		} else {
			myLibrary.push(this);
		}
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
				<p class="detail">${current_book.date}</p>
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
		form_title.focus();
	}
}

function clearForm() {
	document.querySelector("#form").reset();
	document.querySelector("#unread").checked = true;
}

function cancelSave() {
	book_form.style.display = "none";
	add_button.style.display = "block";
	clearForm();
}

function saveBook() {

	// get selected radio button value
	for (let i = 0; i < form_radios.length; i++){
		if(form_radios[i].checked){
			var new_status = form_radios[i].value;
			break;
		}
	}
	
	// get computed style of new book
	let new_book = document.querySelector("#book-form");
	let new_style = getComputedStyle(new_book);
	let new_color = new_style.backgroundColor;

	// create and save a new Book object
	const book = new Book(form_title.value, form_author.value, form_date.value, new_status, new_color);
	book.save();

	// hide/show relevant elements
	book_form.style.display = "none";
	add_button.style.display = "block";

	clearBooks();
	loadBooks();
	clearForm();
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
	let r = (Math.floor(Math.random() * 100))+75;
	let g = (Math.floor(Math.random() * 100))+75;
	let b = (Math.floor(Math.random() * 100))+75;

	return `rgb(${r}, ${g}, ${b})`
}
