"use script";

import * as api from "./api.js";
import { skeletonResultCard } from "./global.js";
import * as route from "./route.js";

// Home Search

const homeSearchInput = document.querySelector("[data-homeSearchInput]");
const homeSearchBtn = document.querySelector("[data-homeSearchBtn]");

const printData = function (data) {
  console.log(data);
};

homeSearchBtn.addEventListener("click", function () {
  if (homeSearchInput.value) {
    api.fetchData([homeSearchInput.value], printData);
    route.changeNavTo("recipes");
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
      `#/mealType=${panelMap.get(+panel.dataset.panel)}`
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
        } = data.hits[i].recipe;

        const card = ` <div class="card result-card">
                            <div class="image-holder">
                                <img src="${smallImage}" width="200px" height="200px" class="result-card-image" alt="Image">
                            </div>
  
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="" class="card-title-link">${
                                      recipeName.length > 30
                                        ? `${recipeName.slice(0, 30)}...`
                                        : recipeName
                                    }</a>
                                </h2>
  
                                <div class="meta-wrapper">
                                    <div class="meta-item">
                                        <span class="material-symbols-outlined">schedule</span>
                                        <span class="meta-label">${
                                          totalTime || 15
                                        } Minutes</span>
                                    </div>
  
                                    <button class="bookmark-btn removed">
                                        <span class="material-symbols-outlined bookmark-add">bookmark_add</span>
                                        <span class="material-symbols-outlined bookmark">bookmark</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        `;

        gridList.insertAdjacentHTML("afterbegin", card);
      }

      setTimeout(() => {
        panel.innerHTML = "";
        panel.append(gridList);
        panel.append(showMoreBtn);
      }, 2000);
    });
  });
};

addTabContent(tabPanels);
