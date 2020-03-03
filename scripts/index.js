var myLibrary = [];
document.querySelector("#add-book").addEventListener("click", addBookToLibrary);
let library = document.querySelector("#library");
let add_book = document.querySelector("#add-book");

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
															<div class=\"col form-buttons\">\
																<button class=\"form-button\" id=\"save-book\">\
																	<i class=\"material-icons\">check</i>\
																</button>\
																<button class=\"form-button\" id=\"remove-book\">\
																	<i class=\"material-icons\">block</i>\
																</button>\
															</div>\
														</div>\
													</form>\
												</div>")
}

function saveBook() {
	// convert form book to 'real' book
}

function generateColor() {
	// generates and returns a random color within an acceptable range for book background colors
}
