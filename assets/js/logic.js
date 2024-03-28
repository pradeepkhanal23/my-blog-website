function highlightActiveLink() {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(function (link) {
    if (link.pathname === window.location.pathname) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function loadBlogsFromLocalStorage() {
  let blogs = JSON.parse(localStorage.getItem("blogs"));

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
    window.location.href = "blog.html";
  }
}

function toggleIcon() {
  //getting theme icon from the DOM
  const themeIcon = document.querySelector(".theme-switcher i");

  //toggling the icon based on its class, if it is a sun, change to moon, if it is a moon, change to sun
  if (themeIcon.classList.contains("fa-sun")) {
    themeIcon.classList.remove("fa-sun");
    themeIcon.classList.add("fa-moon");
  } else {
    themeIcon.classList.remove("fa-moon");
    themeIcon.classList.add("fa-sun");
  }
}

//function to toggle the theme
function toggleTheme() {
  // Retrieve the current theme status from localStorage
  const isDarkMode = JSON.parse(localStorage.getItem("darkMode"));

  // Toggle the theme class based on the current status
  if (!isDarkMode) {
    document.querySelector("body").classList.add("dark");
    localStorage.setItem("darkMode", JSON.stringify(true));
    toggleIcon();
  } else {
    document.querySelector("body").classList.remove("dark");
    localStorage.setItem("darkMode", JSON.stringify(false));
    toggleIcon();
  }
}

//fucntion that gets called when the page loades
function loadTheme() {
  // Retrieve the theme status from localStorage
  const storedValue = localStorage.getItem("darkMode");

  // If the key does not exist, return null
  if (storedValue === null) {
    return null;
  }

  // Parse the string back to a boolean
  const parsedValue = JSON.parse(storedValue);

  return parsedValue;
}

function handleForm() {
  //  Getting elements from the DOM
  const form = document.querySelector("form#blog-form");

  form.addEventListener("submit", handleSubmit);
}

function eventHandlers() {
  document
    .querySelector(".theme-switcher i")
    .addEventListener("click", toggleTheme);
}

function loadThemeOnPageLoad() {
  const isDarkMode = loadTheme();

  if (isDarkMode) {
    document.querySelector("body").classList.add("dark");

    //because we dont know the icon type when the page loads,we call toggle again to make sure it preserves the value between page reloads
    toggleIcon();
  }
}

function initialLoading() {
  let currentPage = window.location.pathname;
  switch (currentPage) {
    case "/index.html":
      handleForm();
      break;
    case "/blog.html":
      loadBlogsFromLocalStorage();
      break;
  }

  //as soon as the page loads, we load the theme i.e. whatever we have in the locak storage
  loadThemeOnPageLoad();

  //check for active link
  highlightActiveLink();

  //event listeners are made ready
  eventHandlers();
}

document.addEventListener("DOMContentLoaded", initialLoading);
