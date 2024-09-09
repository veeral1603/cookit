"use script";

import { resultCard, skeletonResultCard } from "./global.js";
import { adjustFooter } from "./main.js";
import { changeNavTo } from "./route.js";

const filterRowsTitle = document.querySelectorAll(".filter-title-container"); //Filter  Rows

//Mobile Filter Button

const filterBtn = document.querySelector("[data-filterBtn]");
const filtersContainer = document.querySelector("[data-filters]");

const openFilters = function () {
  filtersContainer.classList.toggle("active");
  closeFiltersRows();
};

filterBtn.addEventListener("click", openFilters);

// Close Filter Container

export const closeFilters = function () {
  filtersContainer.classList.remove("active");
};

// Close Filter Rows

export const closeFiltersRows = function () {
  filterRowsTitle.forEach((row) => {
    row
      .closest(".filter-row")
      .querySelector(".filter-content")
      .classList.remove("active");
    row
      .closest(".filter-row")
      .querySelector(".icon")
      .classList.remove("active");
  });
};

// Mobile Filters

filterRowsTitle.forEach((row) => {
  row.addEventListener("click", function (e) {
    let siblingRows = Array.from(row.parentNode.parentNode.children).filter(
      (sibling) =>
        sibling !== row.parentNode &&
        !sibling.classList.contains("filter-action-container")
    );

    siblingRows.forEach((sibling) => {
      sibling.querySelector(".filter-content").classList.remove("active");
      sibling.querySelector(".icon").classList.remove("active");
    });

    row
      .closest(".filter-row")
      .querySelector(".filter-content")
      .classList.toggle("active");
    row
      .closest(".filter-row")
      .querySelector(".icon")
      .classList.toggle("active");
  });
});

// Search Input on recipes page

const recipesSearchInput = document.querySelector("[data-recipesSearchInput]");
const recipesSearchBtn = document.querySelector("[data-recipesSearchBtn]");

recipesSearchBtn.addEventListener("click", function (e) {
  if (recipesSearchInput.value) {
    let query = [`&q=${recipesSearchInput.value}`];
    changeNavTo("recipes");

    window.location.hash = query.join("");
  } else {
  }
});

// Render  Results

let recipesResultContainer = document.querySelector(
  ".recipes-result-container"
);

const loadMoreBtn = document.querySelector(".recipes-tab .show-more-btn");
const loadMoreLoader = document.querySelector("[recipe-loader]");
const messageContainer = document.querySelector(
  ".recipes-tab .message-section"
);

export const renderResults = function (data) {
  let nextLink;
  loadMoreBtn.style.display = "none";

  if (data._links.next) nextLink = data._links.next.href;

  messageContainer.style.display = "none";

  const gridList = document.createElement("div");
  gridList.classList.add("grid-list");

  if (data.hits.length === 0) {
    recipesResultContainer.innerHTML = "";
    messageContainer.style.display = "flex";
    adjustFooter();
    return;
  }

  data.hits.forEach((hit) => {
    const {
      images: {
        REGULAR: { url: smallImage },
      },
      label: recipeName,
      totalTime,
      uri,
    } = hit.recipe;

    const recipeNameCapitalized =
      recipeName[0].toUpperCase() + recipeName.slice(1);
    const recipeID = uri.split("#")[1];

    gridList.insertAdjacentHTML(
      "beforeend",
      resultCard(recipeName, uri, smallImage, totalTime)
    );
  });

  setTimeout(() => {
    recipesResultContainer.innerHTML = "";
    recipesResultContainer.append(gridList);
    if (data._links.next.href) loadMoreBtn.style.display = "block";
    adjustFooter();
  }, 3000);

  loadMoreBtn.addEventListener("click", async function () {
    try {
      loadMoreLoader.removeAttribute("hidden");

      const response = await fetch(nextLink);
      const newData = await response.json();

      newData.hits.forEach((newHit) => {
        const {
          images: {
            REGULAR: { url: newSmallImage },
          },
          label: newRecipeName,
          totalTime: newTotalTime,
          uri: newUri,
        } = newHit.recipe;

        const newRecipeNameCapitalized =
          newRecipeName[0].toUpperCase() + newRecipeName.slice(1);
        const newRecipeID = newUri.split("#")[1];

        setTimeout(() => {
          loadMoreLoader.setAttribute("hidden", "");
          gridList.insertAdjacentHTML(
            "beforeend",
            resultCard(newRecipeName, newUri, newSmallImage, newTotalTime)
          );
        }, 3000);
      });

      nextLink = newData._links.next.href;
    } catch (err) {
      console.error(err);
    }
  });
};

// Filters Logic

const applyFilterBtn = document.querySelector("[data-apply-filters]");
const clearFilterBtn = document.querySelector("[data-clear-filters]");

applyFilterBtn.addEventListener("click", function (e) {
  let checked = Array.from(
    document.querySelectorAll(".filter-wrapper input:checked")
  );

  let checkedValues = checked.map((cb) => cb.value);
  const filterQuerySet = new Set(checkedValues);
  const filterQueryString = Array.from(filterQuerySet).join("");
  let searchQueryString = `&q=${recipesSearchInput.value}`;
  window.location.hash = searchQueryString + filterQueryString;
});

clearFilterBtn.addEventListener("click", function () {
  const inputs = document.querySelectorAll(".filter-wrapper input");
  inputs.forEach((input) => (input.checked = false));

  window.location.hash = `&q=${recipesSearchInput.value}`;
});
