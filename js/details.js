"use script";

import { fetchData } from "./api.js";
import { addBookmark, detailsAddBookmark } from "./bookmarks.js";
import { adjustFooter, scrollToTop, Capitalize, scrollTo } from "./main.js";
import { bookmarksArr } from "./bookmarks.js";
import { changeNavTo } from "./route.js";

// Opening recipe details on clicking result cards

const detailsContainer = document.querySelector("[data-details]");
const contentContainers = document.querySelectorAll("article.container");
const body = document.querySelector("body");
let currentTab;
let distanceFromTop;

const footer = document.querySelector(".footer");

export const openDetails = function (e) {
  if (e) {
    currentTab = e.target.closest("article");
  }

  contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
  detailsContainer.removeAttribute("hidden");

  footer.classList.add("hidden");
  adjustFooter();
};

contentContainers.forEach((contianers) => {
  contianers.addEventListener("click", function (e) {
    if (!e.target.closest(".result-card")) return;

    if (e.target.closest(".bookmark-btn")) {
      addBookmark(e);
    }
    if (!e.target.closest(".bookmark-btn")) {
      const recipeId = e.target.closest(".result-card").dataset.id;
      window.location.hash = `/${recipeId}`;
      openDetails(e);
    }
  });
});

// Render Details

const detailsContent = document.querySelector(".recipe-details > .container");
const loaderContainer = document.querySelector(".loader-container");

export const renderDetails = function (data) {
  if (!data) return;
  adjustFooter();

  const {
    label: recipeName,
    source,
    totalTime,
    calories,
    ingredientLines,
    images,
    url: fullRecipe,
    cuisineType,
    dishType,
    mealType,
    yield: servings,
  } = data.recipe;

  const smallImage = images.SMALL?.url;
  const regularImage = images.REGULAR?.url;
  const largeImage = images.LARGE?.url;

  const recipeID = window.location.hash.slice(2);

  const tags = [cuisineType, mealType, dishType]
    .flat()
    .filter((arr) => arr !== undefined)
    .map((el) => Capitalize(el));

  let ingItems = "";
  let tagItems = "";

  ingredientLines.forEach((ing) => {
    const ingMarkup = `<li class="list-item">${ing}</li>`;
    ingItems += ingMarkup;
  });

  tags.forEach((tag) => {
    const tagMarkup = `<li class="list-item">
                    <div class="recipe-tag">
                        <p>${tag}</p>
                    </div>
    </li>`;
    tagItems += tagMarkup;
  });

  const detailsContentLeft = document.createElement("div");
  detailsContentLeft.classList.add("content-left");

  const markupContentLeft = `
                      <section class="details-header section" >
                          <div class="leading-btn-container">
                              <button class="leading-btn" data-leading-btn>
                                  <span class="material-symbols-outlined">arrow_back</span>
                              </button>
                          </div>
                          <div class="container">
                                  
                                  <img src="${
                                    largeImage ? largeImage : regularImage
                                  }" class="recipe-image">  

                                  <div class="recipe-title-container">
                                      <div class="recipe-title">
                                          <h2>${recipeName}</h2>
                                      </div>

                                      <button class="bookmarks-btn ${
                                        bookmarksArr.some(
                                          (obj) => obj.recipeID === recipeID
                                        )
                                          ? "saved"
                                          : "removed"
                                      }">
                                          <span class="material-symbols-outlined bookmark-add">bookmark_add</span> <span id="label-save" class="bookmark-add">Save</span>
                                          <span class="material-symbols-outlined bookmark">bookmark</span> <span id="label-unsave" class="bookmark">Unsave</span>
                                      </button>
                                  </div>

                                  <div class="recipe-source-container">
                                      <p>by <span class="recipe-source"><a href= "${fullRecipe}" target="_blank">${source}</a></span></p>
                                  </div>
                          </div>
                      </section>           
    `;

  const detailsContentRight = document.createElement("div");
  detailsContentRight.classList.add("content-right");

  const markupContentRight = `
                                    <section class="details-header section" >
                                        <div class="recipe-title-container">
                                            <div class="recipe-title">
                                                <h2>${recipeName}</h2>
                                            </div>

                                            <button class="bookmarks-btn ${
                                              bookmarksArr.some(
                                                (obj) =>
                                                  obj.recipeID === recipeID
                                              )
                                                ? "saved"
                                                : "removed"
                                            }">
                                               <span class="material-symbols-outlined bookmark-add">bookmark_add</span> <span id="label-save" class="bookmark-add">Save</span>
                                            <span class="material-symbols-outlined bookmark">bookmark</span> <span id="label-unsave" class="bookmark">Unsave</span>
                                            </button>
                                        </div>

                                        <div class="recipe-source-container">
                                            <p>by <span class="recipe-source"><a href= "${fullRecipe}" target="_blank">${source}</a></span></p>
                                        </div>
                                    </section>

                                    <section class="details-content section" >

                                        <div class="recipe-meta">
                                            <div class="ingredients meta-box">
                                                <h2 class="ingredients-value">${
                                                  ingredientLines.length
                                                }</h2>
                                                <p class="ingredients-label">Ingredients</p>
                                            </div>
                                            <div class="time meta-box">
                                                <h2 class="ingredients-value">${
                                                  totalTime ? totalTime : "25+"
                                                }</h2>
                                                <p class="ingredients-label">Minutes</p>
                                            </div>
                                            <div class="calories meta-box">
                                                <h2 class="ingredients-value">${Math.round(
                                                  calories
                                                )}</h2>
                                                <p class="ingredients-label">Calories</p>
                                            </div>
                                        </div>

                                        <div class="recipe-tags-container">
                                            <ul class="tags-list">
                                                ${tagItems}
                                            </ul>
                                        </div>

                                        <div class="recipe-ingredients">
                                            <div class="ingredients-header">
                                                <h2>Ingredients</h2>
                                                <p class="servings">for <span class="servings-count">${servings}</span> servings</p>
                                            </div>

                                            <div class="ingredients-content">
                                                <ul class="ingredients-list">
                                                    ${ingItems}
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="details-action">
                                            <a href= "${fullRecipe}" class="full-recipe-btn action-btn" target="_blank">
                                                <span class="material-symbols-outlined">menu_book</span>
                                                <span class="label">Full Recipe</span>
                                            </a>

                                            <button class="social-share-btn action-btn">
                                                <span class="material-symbols-outlined">share</span>
                                                <span class="label">Share</span>
                                            </button>
                                        </div>

                                    </section>


    `;

  detailsContentLeft.insertAdjacentHTML("afterbegin", markupContentLeft);
  detailsContentRight.insertAdjacentHTML("afterbegin", markupContentRight);

  detailsContent.append(detailsContentLeft);
  detailsContent.append(detailsContentRight);
  adjustFooter();

  setTimeout(() => {
    scrollToTop();
    body.style.overflow = "auto";
    loaderContainer.classList.add("hidden");
  }, 3000);
};

// Leading Button

document.addEventListener("mousedown", function (e) {
  if (e.target.closest(".leading-btn-container")) return;
  distanceFromTop = window.scrollY;
});

const leadingBtn = document.querySelector("[data-leading-btn]");

detailsContainer.addEventListener("click", function (e) {
  if (e.target.closest(".leading-btn-container")) {
    if (window.location.hash.includes("recipe")) {
      window.location.hash = "";
    }
    contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
    if (currentTab) {
      currentTab.removeAttribute("hidden");
    } else {
      changeNavTo("home");
    }
    footer.classList.remove("hidden");
    adjustFooter();
    scrollTo(distanceFromTop);
  }

  if (e.target.closest(".bookmarks-btn")) {
    addBookmark(e);
  }

  if (e.target.closest(".social-share-btn")) {
    if (navigator.share) {
      const recTitle = document.querySelector(".recipe-title h2").innerHTML;
      const shareData = {
        text: recTitle,
        url: window.location,
        title: recTitle,
      };
      navigator.share(shareData);
    } else {
      navigator.clipboard.writeText();
    }
  }
});
