"use script";

import { scrollToTop } from "./main.js";

// Opening recipe details on clicking result cards

const resultCards = document.querySelectorAll(".result-card");
const detailsContainer = document.querySelector("[data-details]");
const contentContainers = document.querySelectorAll("article.container");
let currentTab;

resultCards.forEach((card) => {
  card.addEventListener("click", function (e) {
    if (e.target.closest(".bookmark-btn")) return;

    currentTab = card.closest("article");

    contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
    detailsContainer.removeAttribute("hidden");
    scrollToTop();
  });
});

// Leading Button

const leadingBtn = document.querySelector("[data-leading-btn]");

leadingBtn.addEventListener("click", function () {
  contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
  currentTab.removeAttribute("hidden");
});
