var myLibrary = [];
document.querySelector("#add_book").addEventListener("click", addBookToLibrary);
let library = document.querySelector("#library");

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
  // generate new book html in a form
}

function saveBook() {
  // convert form book to 'real' book
}

function generateColor() {
  // generates and returns a random color within an acceptable range for book background colors
}
