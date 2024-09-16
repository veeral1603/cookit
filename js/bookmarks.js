"use script";

import { resultCard } from "./global.js";
import { closePopUp, openPopUp } from "./main.js";

export let bookmarksArr = [];

const headerBookmarkBtn = document.querySelector(".bookmarks-btn");
const mobileNavBookmatkBtn = document.querySelector("[data-btn-saved]");
const messageContainer = document.querySelector(".none-saved");
const bookmarkTabBtns = [headerBookmarkBtn, mobileNavBookmatkBtn];

export const addBookmark = function (e) {
  let bookmarkBtn;

  let card = e.target.closest(".result-card");
  bookmarkBtn = card.querySelector(".bookmark-btn");

  let imageLink = card.querySelector("img").src;
  let recipeName = card.querySelector(".card-title a").innerHTML;
  let recipeUri = card.querySelector(".card-title a").href;
  let time = card.querySelector(".meta-label").innerHTML.slice(0, -8);
  let recipeID = card.dataset.id;

  const obj = { image: imageLink, recipeName, time, recipeID, recipeUri };

  const exists = bookmarksArr.some(
    (object) => object.recipeID === obj.recipeID
  );

  if (exists) {
    openPopUp("Bookmark Removed");
    bookmarksArr = bookmarksArr.filter((el) => el.recipeID !== obj.recipeID);
    console.log(bookmarksArr);
    bookmarkBtn.classList.add("removed");
    bookmarkBtn.classList.remove("saved");

    const all = document.querySelectorAll(`[data-id="${recipeID}"]`);
    all.forEach((el) => {
      const allBtns = el.querySelector(".bookmark-btn");
      if (allBtns) {
        allBtns.classList.add("removed");
        allBtns.classList.remove("saved");
      }
    });

    if (card.closest(".saved-tab")) {
      card.remove();

      if (bookmarksArr.length === 0) {
        messageContainer.removeAttribute("hidden");
        gridList.innerHTML = "";
        return;
      }
    }
  } else {
    openPopUp("Bookmark Added");
    bookmarksArr.push(obj);
    console.log(bookmarksArr);
    bookmarkBtn.classList.add("saved");
    bookmarkBtn.classList.remove("removed");
  }

  setTimeout(closePopUp, 3000);
};

export const detailsAddBookmark = function (e) {
  let details = e.target.closest(".recipe-details .container");
  let bookmarkBtn = details.querySelectorAll(".bookmarks-btn");

  let imageLink = details.querySelector(".recipe-image").src;
  let recipeName = details.querySelector(".recipe-title h2").innerHTML;
  let recipeUri = window.location.href;
  let time = details.querySelector(".time h2").innerHTML;
  let recipeID = document.querySelector(".recipe-image").dataset.id;

  const obj = { image: imageLink, recipeName, time, recipeID, recipeUri };

  const exists = bookmarksArr.some(
    (object) => object.recipeID === obj.recipeID
  );

  if (exists) {
    openPopUp("Bookmark Removed");
    bookmarksArr = bookmarksArr.filter((el) => el.recipeID !== obj.recipeID);
    console.log(bookmarksArr);
    bookmarkBtn.forEach((btn) => {
      btn.classList.add("removed");
      btn.classList.remov("saved");
    });

    const all = document.querySelectorAll(`[data-id="${recipeID}"]`);
    all.forEach((el) => {
      const allBtns = el.querySelector(".bookmark-btn");
      if (allBtns) {
        allBtns.classList.add("removed");
        allBtns.classList.remove("saved");
      }
    });
  } else {
    openPopUp("Bookmark Added");
    bookmarksArr.push(obj);
    console.log(bookmarksArr);
    bookmarkBtn.forEach((btn) => {
      btn.classList.add("saved");
      btn.classList.remove("removed");
    });

    const all = document.querySelectorAll(`[data-id="${recipeID}"]`);
    all.forEach((el) => {
      const allBtns = el.querySelector(".bookmark-btn");
      if (allBtns) {
        allBtns.classList.add("saved");
        allBtns.classList.remove("removed");
      }
    });
  }

  setTimeout(closePopUp, 3000);
};

const savedTab = document.querySelector(".saved-tab");
const savedSection = document.querySelector(".saved-section");
const gridList = document.querySelector(".saved-section .container .grid-list");

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
