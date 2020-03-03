var myLibrary = [];
document.querySelector("#add-book").addEventListener("click", addBookToLibrary);
let library = document.querySelector("#library");
let add_book = document.querySelector("#add-book");

class Book {
	constructor(title, author, pubDate, status, color=generateColor) {
		self.title = title;
		self.author = author;
		self.pubDate = pubDate;
		self.status = status;
		self.color = color;
	}
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
								<input class=\"form-element\" type=\"radio\" id=\"read\" name=\"status\" value=\"read\">\
								<label for=\"status-read\">Read</label>\
							</span>\
							<span>\
								<input class=\"form-element\" type=\"radio\" id=\"unread\" name=\"status\" value=\"unread\">\
								<label for=\"status-unread\">Unread</label>\
							</span>\
							<span>\
								<input class=\"form-element\" type=\"radio\" id=\"wishlist\" name=\"status\" value=\"wishlist\">\
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
	// convert form book to 'real' book
	new_title = document.querySelector("#book-title").value;
	new_author = document.querySelector("#book-author").value;
	new_published = document.querySelector("#book-published").value;
	// new_status = document.querySelector("#book-status").value;
	
	// get computed style of new book
	new_book = document.querySelector("#new-book");
	new_style = getComputedStyle(new_book);
	new_color = new_style.backgroundColor;

	new_book.style.backgroundColor = generateColor();
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
	let r = (Math.floor(Math.random() * 100))+75;
	let g = (Math.floor(Math.random() * 100))+75;
	let b = (Math.floor(Math.random() * 100))+75;

	return `rgb(${r}, ${g}, ${b})`

}
