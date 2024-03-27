const global = {
  currentPage: window.location.pathname,
};

function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(function (link) {
    if (link.pathname === global.currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function displayBlogsFromLocalStorage() {
  let blogs = JSON.parse(localStorage.getItem("blogs"));

  let info = document.querySelector(".portfolio-info");

  if (blogs) {
    blogs.forEach(function (blog) {
      addBlogToTheDOM(blog);
    });
  }
}

// //creating element including class name
//if classname is not passed it's defaulted to ""
function createElWithClass(newElement, className = "") {
  newElement = document.createElement(newElement);
  newElement.className = className;
  return newElement;
}

function addBlogToTheDOM({ username, title, content }) {
  const blogsEl = document.querySelector("#blogs-list");
  let article = createElWithClass("article", "blog");

  let h3 = createElWithClass("h3");
  let h3Text = document.createTextNode(title);
  h3.appendChild(h3Text);

  let p = createElWithClass("p");
  let pText = document.createTextNode(content);
  p.appendChild(pText);

  let h4 = createElWithClass("h4");
  h4.innerHTML = `
  Posted by @<span>${username}</span>
  
  `;

  article.append(h3, p, h4);

  blogsEl.appendChild(article);
}

function addBlogToLocalStorage(blog) {
  //initializing the blogs to an array to begin with
  let blogs = [];

  //checking to see if there is anything in the local storage first
  if (localStorage.getItem("blogs") === null) {
    //if its null(which means there's nothing in the key of "blogs"), the we push our received blog in the array
    blogs.push(blog);

    //save it in the local storage by stringifying it
    localStorage.setItem("blogs", JSON.stringify(blogs));
  } else {
    //if there was already blogs, we simply get the blogs out in an array, push the new blog and again store it by strigifying it
    blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.push(blog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
}

function handleSubmit(e) {
  e.preventDefault();

  const username = document.querySelector("#username");
  const title = document.querySelector("#title");
  const content = document.querySelector('textarea[name="content"]');

  if (!username.value || !content.value || !title.value) {
    alert("Please fill all the values in the form");
  } else {
    let blog = {
      username: username.value,
      title: title.value,
      content: content.value,
    };

    addBlogToLocalStorage(blog); //adding blog to the local storage

    username.value = "";
    title.value = "";
    content.value = "";

    // Redirect to blog page (after successful submission)
    window.location.href = "./blog.html";
  }
}

function handleForm() {
  //  Getting elements from the DOM
  const form = document.querySelector("form#blog-form");

  form.addEventListener("submit", handleSubmit);
}

function initialLoading() {
  switch (global.currentPage) {
    case "/index.html":
      handleForm();
      break;
    case "/blog.html":
      displayBlogsFromLocalStorage();
      break;
  }
}

function init() {
  //we can to wait till the DOM content is loaded before we call our event handlers
  window.addEventListener("DOMContentLoaded", initialLoading);

  //check for active link
  highlightActiveLink();
}

//this function runs as soon as the program starts
init();
