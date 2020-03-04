var myLibrary = [];
document.querySelector("#add-book").addEventListener("click", addBookToLibrary);
let library = document.querySelector("#library");
let add_book = document.querySelector("#add-book");

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

	}
}

function clearBooks() {

}

function removeBook() {

}

function addBookToLibrary() {
	new_book = document.querySelector("#new-book")
	if(new_book) {
		console.log("there's a new book");
	} else {
		new_color = generateColor();
		new_book = add_book.insertAdjacentHTML("beforebegin", `\
			<div class=\"book\" id=\"new-book\" style=\"background-color: ${new_color}\">\
				<form>\
					<label for=\"book-title\">Title:</label>\
					<input class=\"form-element\" type=\"text\" id=\"book-title\" name=\"book-title\" value=\"Title\">\
					<label for=\"book-author\">Author:</label>\
					<input class=\"form-element\" type=\"text\" id=\"book-author\" name=\"book-author\" value=\"Author\">\
					<label for=\"book-published\">Publish Date:</label>\
					<input class=\"form-element\" type=\"text\" id=\"book-published\" name=\"book-published\" value=\"Date\">\
					<div class=\"columns\">\
						<div class=\"col form-radios\">\
							<span>\
								<input checked=\"true\" class=\"form-element\" type=\"radio\" id=\"read\" name=\"book-status\" value=\"read\">\
								<label for=\"status-read\">Read</label>\
							</span>\
							<span>\
								<input class=\"form-element\" type=\"radio\" id=\"unread\" name=\"book-status\" value=\"unread\">\
								<label for=\"status-unread\">Unread</label>\
							</span>\
							<span>\
								<input class=\"form-element\" type=\"radio\" id=\"wishlist\" name=\"book-status\" value=\"wishlist\">\
								<label for=\"status-wishlist\">Wishlist</label>\
							</span>\
						</div>\
					</div>\
				</form>\
					<div class=\"col form-buttons\">\
						<button class=\"form-button\" id=\"save-book\">\
							<i class=\"material-icons\">check</i>\
						</button>\
						<button class=\"form-button\" id=\"remove-book\">\
							<i class=\"material-icons\">block</i>\
						</button>\
					</div>\
			</div>`
		);
		document.querySelector("#save-book").addEventListener("click", saveBook);
	}
}

function saveBook() {

	// get values of form elements
	let new_title = document.querySelector("#book-title").value;
	let new_author = document.querySelector("#book-author").value;
	let new_published = document.querySelector("#book-published").value;

	//get selected radio button value
	let radios = document.getElementsByName("book-status");
	for (let i = 0; i < radios.length; i++){
		if(radios[i].checked){
			var new_status = radios[i].value;
			break;
		}
	}
	
	// get computed style of new book
	let new_book = document.querySelector("#new-book");
	let new_style = getComputedStyle(new_book);
	let new_color = new_style.backgroundColor;

	//create a new Book object
	const book = new Book(new_title, new_author, new_published, new_status, new_color);
	myLibrary.push(book)
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
	let r = (Math.floor(Math.random() * 100))+75;
	let g = (Math.floor(Math.random() * 100))+75;
	let b = (Math.floor(Math.random() * 100))+75;

	return `rgb(${r}, ${g}, ${b})`
}
