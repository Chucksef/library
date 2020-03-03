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
                                                <h2>Generic Book</h2>\
                                                <hr>\
                                                <p class=\"label\">Author</p>\
                                                <p class=\"detail\">Joey Wroteabook</p>\
                                                <p class=\"label\">Published:</p>\
                                                <p class=\"detail\">Jan 1 1975</p>\
                                                <p class=\"label\">Status:</p>\
                                                <p class=\"detail\">Read</p>\
                                              </div>")
}

function saveBook() {
  // convert form book to 'real' book
}

function generateColor() {
  // generates and returns a random color within an acceptable range for book background colors
}
