"use script";

import { resultCard, skeletonResultCard } from "./global.js";

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

// Render  Results

let recipesResultContainer = document.querySelector(
  ".recipes-result-container"
);

const loadMoreBtn = document.querySelector(".recipes-tab .show-more-btn");
const loadMoreLoader = document.querySelector("[recipe-loader]");

export const renderResults = function (data) {
  recipesResultContainer.innerHTML = `
    <div class="grid-list">
        ${skeletonResultCard.repeat(20)}
    </div>
  `;

  let nextLink = data._links.next.href;
  console.log(nextLink);

  const gridList = document.createElement("div");
  gridList.classList.add("grid-list");

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
    loadMoreBtn.style.display = "block";
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
