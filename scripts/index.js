var myLibrary = [];
document.querySelector("#add_book").addEventListener("click", addBookToLibrary);
let library = document.querySelector("#library");
let add_book = document.querySelector("#add_book");

class Book {
	constructor(title, author, pubDate, status="unread", color=generateColor) {
		self.title = title;
		self.author = author;
		self.pubDate = pubDate;
		self.status = status;
		self.color = color;
	}
}

function addBookToLibrary() {
	add_book.insertAdjacentHTML("beforebegin", "<div class=\"book\">\
													<form>\
														<label for=\"book_title\">Title:</label>\
														<input class=\"form-element\" type=\"text\" id=\"book_title\" name=\"book_title\" value=\"Title\">\
														<label for=\"book_author\">Author:</label>\
														<input class=\"form-element\" type=\"text\" id=\"book_author\" name=\"book_author\" value=\"Author\">\
														<label for=\"book_published\">Publish Date:</label>\
														<input class=\"form-element\" type=\"text\" id=\"book_published\" name=\"book_published\" value=\"Date\">\
														<span>\
															<input class=\"form-element\" type=\"radio\" id=\"read\" name=\"status\" value=\"read\">\
															<label for=\"status_read\">Read</label>\
														</span>\
														<span>\
															<input class=\"form-element\" type=\"radio\" id=\"unread\" name=\"status\" value=\"unread\">\
															<label for=\"status_unread\">Unread</label>\
														</span>\
														<span>\
															<input class=\"form-element\" type=\"radio\" id=\"wishlist\" name=\"status\" value=\"wishlist\">\
															<label for=\"status_wishlist\">Wishlist</label>\
														</span>\
													</form>\
												</div>")
}

function saveBook() {
	// convert form book to 'real' book
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
}
