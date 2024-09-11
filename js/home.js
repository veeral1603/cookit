"use script";

import * as api from "./api.js";
import { resultCard, skeletonResultCard } from "./global.js";
import * as route from "./route.js";

const homeTab = document.querySelector("[data-home]");

// Home Search

const homeSearchInput = document.querySelector("[data-homeSearchInput]");
const homeSearchBtn = document.querySelector("[data-homeSearchBtn]");
const recipesSearchInput = document.querySelector("[data-recipesSearchInput]");

export const printData = function (data) {
  console.log(data);
};

homeSearchBtn.addEventListener("click", function () {
  if (homeSearchInput.value) {
    let query = [`&q=${homeSearchInput.value}`];
    route.changeNavTo("recipes");

    window.location.hash = query.join("");
    recipesSearchInput.value = homeSearchInput.value;
    const inputs = document.querySelectorAll(".filter-wrapper input");
    inputs.forEach((input) => (input.checked = false));

    homeSearchInput.value = "";
  } else {
  }
});

// Meal Tabs
const mealTabsContainer = document.querySelector(".tabs-container");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

let activePanel = document.querySelector("[data-tab-breakfast]");
let activeBtn = Array.from(tabBtns)[0];

mealTabsContainer.addEventListener("click", function (e) {
  if (!e.target.classList.contains("tab-btn")) return;

  activePanel = document.querySelector(
    `[data-tab-${e.target.innerHTML.toLowerCase()}]`
  );
  activeBtn = e.target;

  tabBtns.forEach((btn) => btn.setAttribute("data-selected", "false"));

  e.target.setAttribute("data-selected", "true");
  let tabNumber = e.target.dataset.tab;

  tabPanels.forEach((panel) => {
    panel.setAttribute("hidden", "");

    if (panel.dataset.panel === tabNumber) panel.removeAttribute("hidden");
  });
});

homeTab.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("show-more-btn") ||
    e.target.closest("[data-slider-item]")
  ) {
    route.changeNavTo("recipes");
  }
});

let panelMap = new Map([
  [1, "breakfast"],
  [2, "lunch"],
  [3, "dinner"],
  [4, "snack"],
  [5, "teatime"],
]);

/**
 *
 * @param {NodeList} panelsList List of panels
 */

const addTabContent = function (panelsList) {
  panelsList.forEach((panel) => {
    panel.innerHTML = `
              <div class="grid-list">
                  ${skeletonResultCard.repeat(12)}
              </div>
    `;

    const gridList = document.createElement("div");
    gridList.classList.add("grid-list");

    let query = [
      `&mealType=${panelMap.get(+panel.dataset.panel)}`,
      `&random=true`,
    ];

    const showMoreBtn = document.createElement("a");
    showMoreBtn.classList.add("show-more-btn");
    showMoreBtn.setAttribute(
      "href",
      `#&mealType=${panelMap.get(+panel.dataset.panel)}`
    );
    showMoreBtn.innerHTML = "Show More";

    api.fetchData(query, (data) => {
      for (let i = 0; i < 12; i++) {
        const {
          images: {
            REGULAR: { url: smallImage },
          },
          label: recipeName,
          totalTime,
          uri,
        } = data.hits[i].recipe;

        const recipeNameCapitalized =
          recipeName[0].toUpperCase() + recipeName.slice(1);
        const recipeID = uri.split("#")[1];

        gridList.insertAdjacentHTML(
          "afterbegin",
          resultCard(recipeName, uri, smallImage, totalTime)
        );
      }

      setTimeout(() => {
        panel.innerHTML = "";
        panel.append(gridList);
        panel.append(showMoreBtn);
      }, 3000);
    });
  });
};

// Sliders in home tab

const homeSliders = document.querySelectorAll(".home-tab .slider");

/**
 *
 * @param {NodeList} sliderList List of sliders in home tab
 */

export const addSliderContent = function (sliderList) {
  sliderList.forEach((slid) => {
    const skeletonList = `<li class="slider-item">${skeletonResultCard}</li>
        `;
    slid.querySelector(".slider-wrapper").innerHTML = skeletonList.repeat(12);
  });

  sliderList.forEach((slider) => {
    const cuisineType = slider
      .closest(".container")
      .querySelector(".section-heading")
      .innerHTML.split(" ")[1]
      .toLowerCase();
    const query = [`&cuisineType=${cuisineType}`, `&random=true`];

    const showMoreBtn = `<li class="slider-item" data-slider-item>
                            <a href="#&cuisineType=${cuisineType}" class="load-more-card has-state">
                                <span class="load-more-label">Show More</span>
                                <span class="material-symbols-outlined">navigate_next</span>
                            </a>
                        </li>
    `;

    const sliderWrapper = document.createElement("ul");
    sliderWrapper.classList.add("slider-wrapper");

    api.fetchData(query, (data) => {
      for (let i = 0; i < 12; i++) {
        const {
          images: {
            REGULAR: { url: smallImage },
          },
          label: recipeName,
          totalTime,
          uri,
        } = data.hits[i].recipe;

        const recipeNameCapitalized =
          recipeName[0].toUpperCase() + recipeName.slice(1);
        const recipeID = uri.split("#")[1];

        const card = ` <li class="slider-item">
                            ${resultCard(
                              recipeName,
                              uri,
                              smallImage,
                              totalTime
                            )}
                        </li>

        `;

        sliderWrapper.insertAdjacentHTML("afterbegin", card);
      }

      sliderWrapper.insertAdjacentHTML("beforeend", showMoreBtn);
      setTimeout(() => {
        slider.innerHTML = "";
        slider.append(sliderWrapper);
      }, 3000);
    });
  });
};

// Tags Section

const tags = document.querySelectorAll(".btn-tag");
const tagsSection = document.querySelector(".tags-section .container");

const addTags = function () {
  const dietTags = [
    "Balanced",
    "High Fiber",
    "High Protein",
    "Low Carb",
    "Low Fat",
    "Low Sodium",
  ];

  const healthTags = [
    "Alcohol Free",
    "Celery Free",
    "Crustcean Free",
    "Dairy Free",
    "DASH",
    "Egg Free",
    "Fish Free",
    "FODMAP Free",
    "Gluten Free",
    "Immuno Supportive",
    "Keto Friendly",
    "Kidney Friendly",
    "Low Potassium",
    "Low Sugar",
    "Lupin Free",
    "Mediterranean",
    "Mollusk Free",
    "Mustard Free",
    "No Oil Added",
    "Peanut Free",
    "Pescatarian",
    "Pork Free",
    " Red Meat Free",
    "Sesame Free",
    "Shellfish Free",
    "Soy Free",
    "Sugar Conscious",
    "Sulfite Free",
    "Tree Nut Free",
    "Vegan",
    "Vegetarian",
    "Wheat Free",
  ];

  const tagsContainer = document.createElement("div");
  tagsContainer.classList.add("tags");

  dietTags.forEach((diet) => {
    const hash = diet.toLocaleLowerCase().replace(" ", "-");
    const btn = `<a href="#&diet=${hash}" class="btn-tag diet-tag">${diet}</a>`;

    tagsContainer.insertAdjacentHTML("beforeend", btn);
  });

  healthTags.forEach((health) => {
    const hash = health.toLocaleLowerCase().replace(" ", "-");
    const btn = `<a href="#&health=${hash}" class="btn-tag health-tag">${health}</a>`;
    tagsContainer.insertAdjacentHTML("beforeend", btn);
  });

  tagsSection.append(tagsContainer);
};

tagsSection.addEventListener("click", (e) => {
  if (!e.target.classList.contains("btn-tag")) return;

  route.changeNavTo("recipes");
});

addTabContent(tabPanels);
addSliderContent(homeSliders);
addTags();
