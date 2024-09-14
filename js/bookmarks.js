"use script";

import { resultCard } from "./global.js";
import { closePopUp, openPopUp } from "./main.js";

export let bookmarksArr = [];

const headerBookmarkBtn = document.querySelector(".bookmarks-btn");
const mobileNavBookmatkBtn = document.querySelector("[data-btn-saved]");
const bookmarkTabBtns = [headerBookmarkBtn, mobileNavBookmatkBtn];

export const addBookmark = function (e) {
  let imageLink, recipeName, recipeUri, time, recipeID, bookmarkBtn;

  if (e.target.closest(".result-card")) {
    let card = e.target.closest(".result-card");
    bookmarkBtn = card.querySelectorAll(".bookmark-btn");

    imageLink = card.querySelector("img").src;
    recipeName = card.querySelector(".card-title a").innerHTML;
    recipeUri = card.querySelector(".card-title a").href;
    time = card.querySelector(".meta-label").innerHTML.slice(0, -8);
    recipeID = card.dataset.id;
  }

  if (e.target.closest(".recipe-details")) {
    let details = document.querySelector(".recipe-details .container");
    bookmarkBtn = details.querySelectorAll(".bookmarks-btn");

    imageLink = details.querySelector("img").src;
    recipeName = details.querySelector(".recipe-title h2").innerHTML;
    recipeUri = window.location.href;
    time = details.querySelector(".time h2").innerHTML;
    recipeID = window.location.hash.slice(2);
  }

  const obj = { image: imageLink, recipeName, time, recipeID, recipeUri };
  console.log(obj);

  const exists = bookmarksArr.some(
    (object) => object.recipeID === obj.recipeID
  );

  if (exists) {
    openPopUp("Bookmark Removed");
    bookmarksArr = bookmarksArr.filter((el) => el.recipeID !== obj.recipeID);
    console.log(bookmarksArr);
  } else {
    openPopUp("Bookmark Added");
    bookmarksArr.push(obj);
    console.log(bookmarksArr);
  }

  bookmarkBtn.forEach((btn) => {
    btn.classList.toggle("saved");
    btn.classList.toggle("removed");
  });

  setTimeout(closePopUp, 3000);
};

export const detailsAddBookmark = function (e) {};

const savedTab = document.querySelector(".saved-tab");
const savedSection = document.querySelector(".saved-section");
const gridList = document.querySelector(".saved-section .container .grid-list");
const messageContainer = document.querySelector(".none-saved");

export const renderBookmarks = function () {
  if (bookmarksArr.length === 0) {
    messageContainer.removeAttribute("hidden");
    gridList.innerHTML = "";
    return;
  }

  messageContainer.setAttribute("hidden", "");
  gridList.innerHTML = "";

  bookmarksArr.forEach((recipe) => {
    const card = resultCard(
      recipe.recipeName,
      recipe.recipeUri,
      recipe.image,
      recipe.time
    );
    gridList.insertAdjacentHTML("afterbegin", card);
  });
};

bookmarkTabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    renderBookmarks();
  });
});

// Recipe details tab

const recipeDetailsBookmarkBtn = document.querySelectorAll(
  ".recipe-details .bookmarks-btn"
);
