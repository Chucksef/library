window.addEventListener('load', main(), false);

class Book {
  constructor(title, author, pubDate, status="unread", color=generateColor()) {
    self.title = title;
    self.author = author;
    self.pubDate = pubDate;
    self.status = status;
    self.color = color;
  }
}

function addBookToLibrary() {
  // do stuff here
}

function generateColor() {
  
}

function main() {
  //basic variables for main function
  var library = document.querySelector("#library");
  var addBook = document.querySelector("#add_book");
  let myLibrary = [];
  
  addBook.addEventListener("click", addBookToLibrary());
  
}
