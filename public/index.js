// TO DO 
/*

	* Make Look Prettier
	* Shrink Book Titles to available space

*/



// global variables go here
let myLibrary = {};
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
	constructor(title, author, date, status, color_primary=generateColor()) {
		this.title = title.trim();
		this.author = author.trim();
		this.date = date.trim();
		this.status = status;
		this.color_primary = color_primary;
		this.color_secondary = generateColor(color_primary);
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
			// add the new book to fire store
			db.collection('myLibrary').add({
				title: this.title,
				author: this.author,
				date: this.date,
				color_primary: this.color_primary,
				color_secondary: this.color_secondary,
				status: this.status
			})

			// capture the new book's ID by querying the new title
			let new_book = this;
			db.collection('myLibrary').where('title', '==', `${this.title}`)
				.get()
				.then(function(snapshot) {
					snapshot.forEach(function(doc){
						// add the document to the array
						myLibrary[doc.id] = new_book;
						book_form.style.display = "none";
						add_button.style.display = "block";
						
						resetForm();
						drawLibrary();
					})
				});	
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
	db.collection('myLibrary').get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
			myLibrary[doc.id] = doc.data();
			drawLibrary();
		})
	})
}

function drawLibrary() {

	// clear all visible books in the library
	clearBooks();

	// iterate over myLibrary array...
	for (key in myLibrary){
		current_book = myLibrary[key];
		
		// ... and draw each book in the array
		book_form.insertAdjacentHTML("beforebegin", `
			<div id="${key}" class="book removable" style="background-color: ${current_book.color_primary};">
				<div class="tools" style="border: 3px solid ${current_book.color_secondary}">
					<button class="btn read-book" style="background-color: ${current_book.color_secondary}"><i class="material-icons">check_box</i></button>
					<button class="btn remove-book" style="background-color: ${current_book.color_secondary}"><i class="material-icons">delete_forever</i></button>
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
			// get id
			let book_ID = button.parentNode.parentNode.id;

			// toggle read status or book in myLibrary array
			toggleRead(book_ID);
			drawLibrary();
		})
	})
	remove_book_buttons.forEach(function(button) {
		button.addEventListener("click", function(e){
			// find title of parent element's h2 tag
			let book_ID = button.parentNode.parentNode.id;
			
			// get index of element in myLibrary array
			let tmp_index = findInLibrary(book_ID)
			
			// delete entry in array
			deleteBook(book_ID)
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

function deleteBook(book_ID){
	// iterate over array and remove item with matching title
	delete myLibrary[book_ID]
	db.collection("myLibrary").doc(book_ID).delete();
}

function toggleRead(book_ID){
	// check if read status is "Read"

	status = myLibrary[book_ID].status;

	if (status == "Read") {
		db.collection("myLibrary").doc(book_ID).update({
			status: "Unread"
		})
		myLibrary[book_ID].status = "Unread";
	} else {
		db.collection("myLibrary").doc(book_ID).update({
			status: "Read"
		})
		myLibrary[book_ID].status = "Read";
	}
}

function removeBookFromLibrary(book) {
	library.removeChild(book);
}

function showBookForm() {
	if(getComputedStyle(book_form).display == "block") {
		alert("there's a new book");
	} else {
		new_primary = generateColor();
		new_secondary = generateColor(new_primary);
		book_form.style.backgroundColor = new_primary;
		book_form.style.border = `3px solid ${new_secondary}`;
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

function generateColor(primary=null) {

	if (primary == null){
		// generates and returns a random color_primary within an acceptable range for book background color_primarys
		let r = (Math.floor(Math.random() * 250));
		let g = (Math.floor(Math.random() * 250));
		let b = (Math.floor(Math.random() * 250));

		let dom = Math.max(r, g, b);
		
		let r_ratio = r/dom;
		let g_ratio = g/dom;
		let b_ratio = b/dom;

		r = Math.floor(25 + (r_ratio * 60));
		g = Math.floor(25 + (g_ratio * 60));
		b = Math.floor(25 + (b_ratio * 60));

		return `rgb(${r}, ${g}, ${b})`

	} else {
		let rgb = primary.substring(4,primary.length-1).split(", ");
		let r = rgb[0];
		let g = rgb[1];
		let b = rgb[2];

		let dom = Math.max(r,g,b);

		let r_ratio = r/dom;
		let g_ratio = g/dom;
		let b_ratio = b/dom;

		r = (r_ratio * 255);
		g = (g_ratio * 255);
		b = (b_ratio * 255);

		return `rgb(${r}, ${g}, ${b})`
	}
}


// The Following Runs on Page Load...

loadLibrary();
drawLibrary();
resetForm();