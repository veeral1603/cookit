"use script";

import * as route from "./route.js";
import * as api from "./api.js";
import * as details from "./details.js";
import * as home from "./home.js";
import * as recipes from "./recipes.js";
import * as global from "./global.js";
import * as bookmarks from "./bookmarks.js";
import * as theme from "./theme.js";

const footer = document.querySelector(".footer");
const header = document.querySelector(".header");

// Stikcy tabs
const tabsContainer = document.querySelector(".tabs-section .tabs-container");
tabsContainer.style.top = `${header.offsetHeight - 1}px`;

// Sticky Sidebar on recpies page
document.querySelector(
  ".recipes-tab .content-left"
).style.top = `calc(${header.offsetHeight}px + 0.8rem)`;

// Loader Container hieght on Details Page

const loaderContainer = document.querySelector(".loader-container");
if (window.innerWidth < 768) {
  loaderContainer.style.height = `calc(100vh - ${header.offsetHeight}px - 66px)`;
} else {
  loaderContainer.style.height = `calc(100vh - ${header.offsetHeight}px`;
}

// Capitalize Function

export const Capitalize = function (str) {
  const capStr = str[0].toUpperCase() + str.slice(1);
  return capStr;
};

// Navigation

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");
const headerTabsContainer = document.querySelector(".header-tabs");
const headerBookmarkBtn = document.querySelector("[data-header-bookmark]");

// Mobile
mobileNavContainer.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    e.target.classList.contains("mobile-nav-list") ||
    e.target.classList.contains("mobile-nav")
  )
    return;

  const tab = `${e.target
    .closest(".list-item")
    .querySelector(".nav-label")
    .innerHTML.toLowerCase()}`;

  recipes.closeFiltersRows();
  recipes.closeFilters();
  route.changeNavTo(tab);
});

//PC

headerTabsContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("header-tabs-item")) return;

  const tab = `${e.target.innerHTML.toLowerCase()}`;

  route.changeNavTo(tab);
  recipes.closeFiltersRows();
});

headerBookmarkBtn.addEventListener("click", function () {
  headerTabsContainer.querySelectorAll(".header-tabs-item").forEach((li) => {
    li.classList.remove("active");
  });
  route.changeNavTo("saved");
});

// Adjust Footer

const body = document.querySelector("body");

export const adjustFooter = function () {
  if (body.offsetHeight < window.innerHeight) {
    footer.classList.add("sticky");
    footer.style.bottom = `${mobileNavContainer.offsetHeight}px`;
  } else {
    footer.classList.remove("sticky");
  }
};

// Scroll to top

export const scrollToTop = function () {
  window.scrollTo(0, 0);
};
export const scrollTo = function (y) {
  window.scrollTo(0, y);
};

// Popup message

const popUpContainer = document.querySelector(".popup");
const closePopUpBtn = document.querySelector(".close-popup-btn");
const popUpMessage = document.querySelector(".popup p");

export const openPopUp = function (str = "msg") {
  popUpMessage.innerHTML = str;
  popUpContainer.classList.toggle("active");
};

export const closePopUp = function () {
  popUpContainer.classList.toggle("active");
};

closePopUpBtn.addEventListener("click", closePopUp);

// Error 404

export const error404 = function () {
  console.log("Error 404");
};
