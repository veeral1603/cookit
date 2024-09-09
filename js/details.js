"use script";

import { scrollToTop } from "./main.js";

// Opening recipe details on clicking result cards

const resultCards = document.querySelectorAll(".result-card");
const detailsContainer = document.querySelector("[data-details]");
const contentContainers = document.querySelectorAll("article.container");
let currentTab;

contentContainers.forEach((contianers) => {
  contianers.addEventListener("click", function (e) {
    if (!e.target.closest(".result-card") || e.target.closest(".bookmark-btn"))
      return;

    const recipeId = e.target.closest(".result-card").dataset.id;
    window.location.hash = recipeId;

    currentTab = e.target.closest("article");

    contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
    detailsContainer.removeAttribute("hidden");
    scrollToTop();
  });
});

// Leading Button

const leadingBtn = document.querySelector("[data-leading-btn]");

leadingBtn.addEventListener("click", function () {
  if (window.location.hash.includes("recipe")) {
    window.location.hash = "";
  }
  contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
  currentTab.removeAttribute("hidden");
});
