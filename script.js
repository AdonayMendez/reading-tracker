const buttons = document.querySelectorAll('button:not(.form-Btn)');
const cardContainer = document.querySelector(".cards");
const form = document.querySelector("form");
const formBtn = document.getElementById("formBtn"); 
const input = document.querySelectorAll("input");

const bookTitle = document.getElementById("bookTitle");
const pagesRead = document.getElementById("pagesRead");

const bookTitleLabel = document.querySelector(".bookTitleLabel");
const bookTitleInput = document.querySelector(".bookTitleInput");
const bookPagesReadLabel = document.querySelector(".bookPagesReadLabel");
const bookPagesReadInput = document.querySelector(".bookPagesReadInput");
const radioReading = document.querySelector(".radioReading");
const radioCompleted = document.querySelector(".radioCompleted");


// const currentStatus = document.getElementById("currentStatus");


let books = [];

const handleClick = (e) => {
  const selectedBtn = e.target.textContent.toLowerCase();

  if (selectedBtn === "all") {
    cardContainer.innerHTML = "";

    books.forEach((book) => {
      const currentStatus = book.status; 

      const div = document.createElement("div");
      div.classList.add("card");

      if(currentStatus === "reading"){
        div.classList.add("reading"); 
      } else {
        div.classList.add("completed");
      }

      const addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.textContent = "+10 Pages";

      addBtn.addEventListener("click", (e) => {
        book.pagesRead += 10;

        div.innerHTML = `
          <h1>${book.title}</h1>
          <p>Pages Read: ${book.pagesRead}</p>
          <p>Status: ${book.status}</p>
        `;

        div.appendChild(addBtn);
      });

      div.innerHTML = `
      <h1>${book.title}</h1>
      <p>Pages Read: ${book.pagesRead}</p>
      <p>Status: ${book.status}</p>
    `;
      div.appendChild(addBtn);
      cardContainer.appendChild(div);
    });
  }

  if (selectedBtn === "reading") {
    cardContainer.innerHTML = "";

    const readingBooks = books.filter((book) => book.status === "reading");

    readingBooks.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add("reading");

      const addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.textContent = "+10 Pages";

      addBtn.addEventListener("click", (e) => {
        book.pagesRead += 10;

        div.innerHTML = `
          <h1>${book.title}</h1>
          <p>Pages Read: ${book.pagesRead}</p>
          <p>Status: ${book.status}</p>
        `;

        div.appendChild(addBtn);
      });

      div.innerHTML = `
        <h1>${book.title}</h1>
        <p>Pages Read: ${book.pagesRead}</p>
        <p>Status: ${book.status}</p>
      `;
      div.appendChild(addBtn);
      cardContainer.appendChild(div);
    });
  }

  if (selectedBtn === "completed") {
    cardContainer.innerHTML = "";

    const completedBooks = books.filter((book) => book.status === "completed");

    completedBooks.forEach((book) => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.classList.add("completed");

      const addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.textContent = "+10 Pages";

      addBtn.addEventListener("click", (e) => {
        book.pagesRead += 10;

        div.innerHTML = `
          <h1>${book.title}</h1>
          <p>Pages Read: ${book.pagesRead}</p>
          <p>Status: ${book.status}</p>
        `;

        div.appendChild(addBtn);
      });

      div.innerHTML = `
        <h1>${book.title}</h1>
        <p>Pages Read: ${book.pagesRead}</p>
        <p>Status: ${book.status}</p>
      `;
      div.appendChild(addBtn);
      cardContainer.appendChild(div);
    });
  }

  console.log(selectedBtn);

};

const handleSubmit = () => {
  const selectedStatus = document.querySelector('input[name="status"]:checked'); 

  if (bookTitle.value.trim() === ''){
    console.log("Error: No book title!");
    bookTitleLabel.classList.add("error"); 
    bookTitleLabel.textContent = 'Must enter a book title!';
    bookTitleInput.classList.add("inputError"); 
    return;
  } 
    bookTitleLabel.classList.remove("error"); 
    bookTitleInput.classList.remove("inputError"); 
    bookTitleLabel.textContent = 'Book Title?';

  if(Number(pagesRead.value) <= 0){
    console.log("Error: Pages read must be above 0"); 
    bookPagesReadLabel.classList.add("error"); 
    bookPagesReadLabel.textContent = 'Enter appropriate number!';
    bookPagesReadInput.classList.add("inputError"); 
    return; 
  } 
    bookPagesReadLabel.classList.remove("error"); 
    bookPagesReadLabel.textContent = 'Pages Read?';
    bookPagesReadInput.classList.remove("inputError"); 
  
  if (!selectedStatus){
    console.log("Error: Must select an option"); 
    radioReading.classList.add("error"); 
    radioCompleted.classList.add("error"); 
    return;
  } 
    radioReading.classList.remove("error"); 
    radioCompleted.classList.remove("error"); 

  const newBook = {
    title: bookTitle.value,
    pagesRead: Number(pagesRead.value),
    status: selectedStatus.value
  }

  books.push(newBook);

  const div = document.createElement("div"); 
  div.classList.add("card"); 

  if(newBook.status === "reading"){
    div.classList.add("reading"); 
  } else{
    div.classList.add("completed");
  }

  const addBtn = document.createElement("button"); 
  addBtn.classList.add("addBtn"); 
  addBtn.textContent = `+10 Pages`;

  addBtn.addEventListener("click", (e) => {
      newBook.pagesRead += 10; 

    div.innerHTML = `
      <h1>${newBook.title}</h1>
      <p>Pages Read: ${newBook.pagesRead}</p>
      <p>Status: ${newBook.status}</p>
    `;

    div.appendChild(addBtn); 
  });

  div.innerHTML = `
    <h1>${newBook.title}</h1>
    <p>Pages Read: ${newBook.pagesRead}</p>
    <p>Status: ${newBook.status}</p>
  `;

  div.appendChild(addBtn); 
  cardContainer.appendChild(div); 

  form.reset();
};


buttons.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});


form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
});




fetch("data.json")
  .then((response) => {
    if (!response.ok) {
      console.log("JSON data request failed");
      return [];
    }
    return response.json();
  })
  .then((data) => {
    books = data;


    books.forEach((book) => {
      const currentStatus = book.status;
      const div = document.createElement("div");
      div.classList.add("card");

      
      if(currentStatus === "completed"){
        div.classList.add("completed");
      } else {
        div.classList.add("reading");
      }

      const addBtn = document.createElement("button");
      addBtn.classList.add("addBtn");
      addBtn.textContent = "+10 Pages";

      addBtn.addEventListener("click", (e) => {
        book.pagesRead += 10;

        div.innerHTML = `
          <h1>${book.title}</h1>
          <p>Pages Read: ${book.pagesRead}</p>
          <p>Status: ${book.status}</p>
        `;

        div.appendChild(addBtn);
      });

      div.innerHTML = `
        <h1>${book.title}</h1>
        <p>Pages Read: ${book.pagesRead}</p>
        <p>Status: ${book.status}</p>
   
      `;
      div.appendChild(addBtn);
      cardContainer.appendChild(div);
    });
  });
