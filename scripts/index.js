// TO DO 
/*

	* Persistence (local? firebase?)
	* Make Look Prettier
	* Shrink Book Titles to available space

*/



// global variables go here
var myLibrary = [];
let library = document.querySelector("#library");
let add_button = document.querySelector("#add-book");
let book_form = document.querySelector("#book-form");
let form_title = document.querySelector("#book-title");
let form_author = document.querySelector("#book-author");
let form_date = document.querySelector("#book-date");
let form_radios = document.getElementsByName("book-status");

// event listeners
add_button.addEventListener("click", showBookForm);
document.querySelector("#save-book").addEventListener("click", saveBook);
document.querySelector("#cancel-save").addEventListener("click", cancelSave);


// CLASSES //

class Book {
	constructor(title, author, date, status, color=generateColor()) {
		this.title = title.trim();
		this.author = author.trim();
		this.date = date.trim();
		this.status = status;
		this.color = color;
	}

	save() {
		let tmp_title = this.title.replace(" ", "");
		let tmp_author = this.author.replace(" ", "");
		let tmp_date = this.date.replace(" ", "");
		let save_errors = [];

		// Do nothing if any form fields are blank...
		if (tmp_title == "") {
			save_errors.push("Title cannot be blank!");
		}
		
		if (tmp_author == "") {
			save_errors.push("Author cannot be blank");
		}

		if (tmp_date == "") {
			save_errors.push("Date cannot be blank");
		}

		if (findInLibrary(this.title)!=-1) {
			save_errors.push(`Book with title "${this.title}" already in library!`)
		}

		if (save_errors.length == 0) {
			myLibrary.push(this);
			book_form.style.display = "none";
			add_button.style.display = "block";
			
			drawLibrary();
			resetForm();
		} else {
			let error_string = "Error Submitting Book:\n";
			save_errors.forEach(function(error){
				error_string += `\n${error}`;
			})
			alert(error_string)
			form_title.focus();
		}
	}
}

// FUNCTIONS //

function loadLibrary() {

}

function drawLibrary() {

	// clear all visible books in the library
	clearBooks();

	// iterate over myLibrary array...
	for (i=0; i<myLibrary.length; i++){
		current_book = myLibrary[i];
		
		// ... and draw each book in the array
		book_form.insertAdjacentHTML("beforebegin", `
			<div class="book removable" style="background-color: ${current_book.color};">
				<div class="tools">
					<button class="btn read-book">Read?</button>
					<button class="btn remove-book">Remove!</button>
				</div>
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

	// query for all .removable elements and assign them on-hover event listeners
	books = document.querySelectorAll(".removable");
	books.forEach(function(book) {
		book.addEventListener("mouseenter", function(e){
			toggleTools(e.target);
		});
		book.addEventListener("mouseleave", function(e){
			toggleTools(e.target);
		});
	})

	// get all buttons
	read_book_buttons = document.querySelectorAll(".read-book");
	remove_book_buttons = document.querySelectorAll(".remove-book");
	
	read_book_buttons.forEach(function(button) {
		button.addEventListener("click", function(e){
			// get title of parent element's h2 tag
			let tmp_title = button.parentNode.parentNode.childNodes[1].innerHTML;
			
			// get index of element in myLibrary array
			let tmp_index = findInLibrary(tmp_title)

			// toggle read status or book in myLibrary array
			toggleRead(tmp_index);
			drawLibrary();
		})
	})
	remove_book_buttons.forEach(function(button) {
		button.addEventListener("click", function(e){
			// find title of parent element's h2 tag
			let tmp_title = button.parentNode.parentNode.childNodes[1].innerHTML;
			
			// get index of element in myLibrary array
			let tmp_index = findInLibrary(tmp_title)
			
			// delete entry in array
			deleteBookFromArray(tmp_index)
			drawLibrary();
		})
	})


}

function toggleTools(book) {
	let class_name = book.className;
	if (class_name.includes("tools-visible")) {
		// hide tools by removing tools-visible class
		book.className = class_name.replace(" tools-visible", "");
	} else {
		// show tools by adding tools-visible class
		book.className = `${class_name} tools-visible`;
	}
}

function clearBooks() {
	let removables = document.querySelectorAll(".removable");
	removables.forEach(function(book){
		removeBookFromLibrary(book);
	})
}

function deleteBookFromArray(index){
	// iterate over array and remove item with matching title
	let rem = myLibrary.splice(index, 1);
}

function toggleRead(index){
	// check if read status is "Read"
	if (myLibrary[index].status == "Read") {
		myLibrary[index].status = "Unread";
	} else {
		myLibrary[index].status = "Read";
	}
}

function removeBookFromLibrary(book) {
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

function resetForm() {
	document.querySelector("#form").reset();
	document.querySelector("#unread").checked = true;
}

function cancelSave() {
	book_form.style.display = "none";
	add_button.style.display = "block";
	resetForm();
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
}

function findInLibrary(title) {
	for(let i=0; i<myLibrary.length; i++){
		if (myLibrary[i].title == title) {
			return i;
		}
	}
	return -1;
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
	let r = 200;
	let g = 200;
	let b = 200;

	while (r+g+b > 500) {
		r = (Math.floor(Math.random() * 210));
		g = (Math.floor(Math.random() * 210));
		b = (Math.floor(Math.random() * 210));
	}

	return `rgb(${r}, ${g}, ${b})`
}


// The Following Runs on Page Load...

loadLibrary();
drawLibrary();
resetForm();