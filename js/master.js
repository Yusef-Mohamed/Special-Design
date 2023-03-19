// Random BackGround Option
let backgroundOption = true;
// Variable To Control Interval
let backgroundInterval;
// Checking localStorage
// Check Colors
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null) {
  // Add Color From To Root
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Remove Active Class
  document.querySelectorAll(".colors-list li").forEach((e) => {
    e.classList.remove("active");
    //Add Active if Data-color===localStorageData
    if (e.dataset.color === mainColors) {
      e.classList.add("active");
    }
  });
}
// Check BackGround Random
let backgroundLocalItem = localStorage.getItem("background-option");
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
    // If BackGround Option False Will Replace Last Background Img
    let backgroundUrlLocalItem = localStorage.getItem("background-url");
    if (backgroundUrlLocalItem !== null) {
      document.querySelector(".landing-page").style.backgroundImage =
        backgroundUrlLocalItem;
    }
  }
  // Remove Active Class
  // Remove Active Class
  document.querySelectorAll(".random-backgrounds span").forEach((e) => {
    e.classList.remove("active");
    //Add Active if Data-color===localStorageData
    if (backgroundLocalItem === "true") {
      document
        .querySelector(".random-backgrounds .yes")
        .classList.add("active");
    } else {
      document.querySelector(".random-backgrounds .no").classList.add("active");
    }
  });
}

// Settings box

let settings = document.querySelector(".toggle-settings i");
settings.addEventListener("click", () => {
  document.querySelector(".setting-box").classList.toggle("open");
  settings.classList.toggle("fa-spin");
});

// Color Settings

let colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    // Set Color In Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color To localStorage
    localStorage.setItem("color-option", e.target.dataset.color);
    // Remove Active Class
    cangeActive(e);
  });
});
// BackGround Settings

let randomBackEle = document.querySelectorAll(".random-backgrounds span");
randomBackEle.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    cangeActive(e);
    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomImage();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
      localStorage.setItem("background-url", landingPage.style.backgroundImage);
    }
  });
});
// Nav Setting
let NavChangeEle = document.querySelectorAll(".bullet-option span");
let bulletContianer = document.querySelector(".nav-bullet");
let navLocalItem = localStorage.getItem("display-option");
if (navLocalItem !== null) {
  NavChangeEle.forEach((e) => {
    e.classList.remove("active");
  });

  if (navLocalItem === "true") {
    document.querySelector(".nav-bullet").style.display = "block";
    document.querySelector(".bullet-option .yes").classList.add("active");
  } else {
    document.querySelector(".nav-bullet").style.display = "none";
    document.querySelector(".bullet-option .no").classList.add("active");
  }
}
NavChangeEle.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    cangeActive(e);
    if (e.target.dataset.display === "yes") {
      bulletContianer.style.display = "block";
      localStorage.setItem("display-option", true);
    } else {
      bulletContianer.style.display = "none";
      localStorage.setItem("display-option", false);
    }
  });
});
// Landing page
// Change Back Ground Image

let landingPage = document.querySelector(".landing-page");

// Array Of Image

let imgsArraay = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
// Change Back Ground Image option

function randomImage() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number

      let randomNumber = Math.floor(Math.random() * imgsArraay.length);

      // Change Background url

      landingPage.style.backgroundImage = `url("img/${imgsArraay[randomNumber]}")`;
    }, 1000);
  }
}
randomImage();

// Select Skills selctor
let ourskills = document.querySelector(".skills");
window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourskills.offsetTop;
  // Skills outer high
  let skillsOuterHeight = ourskills.offsetHeight;
  // Window Hight
  let widonwHight = this.innerHeight;
  // Calc
  // Window scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - widonwHight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((ele) => {
      ele.style.width = ele.dataset.prog;
    });
  }
};
// Image Pop up
let gallImgs = document.querySelectorAll(".our-gallery img");
gallImgs.forEach((e) => {
  e.onclick = function () {
    // Creat ELements
    let over = document.createElement("div");
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    let del = document.createElement("span");
    let img = document.createElement("img");
    // Add Classes
    over.classList.add("popup-overlay");
    div.classList.add("popup-box");
    // Add src
    img.src = e.src;
    // Add Text
    h2.appendChild(document.createTextNode(e.getAttribute("alt")));
    del.appendChild(document.createTextNode("X"));
    // Add Element to page
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(del);
    document.body.appendChild(div);
    document.body.appendChild(over);
    del.onclick = function () {
      div.remove();
      over.remove();
    };
  };
});
// Nav Bullet
let navLink = document.querySelectorAll(".nav-bullet .bullet");
let headerLink = document.querySelectorAll(".header-area .links a");
function scrollto(arrOfEle) {
  arrOfEle.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
function cangeActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  // Add Active To Element
  ev.target.classList.add("active");
}
scrollto(navLink);
scrollto(headerLink);
// rest

document.querySelector(".reset").onclick = function () {
  localStorage.clear();
  window.location.reload();
};
// Munu toggel
let toggelBtn = document.querySelector(".header-area .toggel-menu");
let links = document.querySelector(".header-area .links");
toggelBtn.onclick = function (e) {
  e.stopPropagation();

  toggelBtn.classList.toggle("active");
  links.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== toggelBtn && e.target !== links) {
    if (links.classList.contains("open")) {
      toggelBtn.classList.toggle("active");
      links.classList.toggle("open");
    }
  }
});
links.onclick = function (e) {
  e.stopPropagation();
};
