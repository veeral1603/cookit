"use script";

import { fetchData } from "./api.js";
import { openDetails, renderDetails } from "./details.js";
import { skeletonResultCard } from "./global.js";
import { printData } from "./home.js";
import { adjustFooter, scrollToTop } from "./main.js";
import { renderResults } from "./recipes.js";

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");
const headerTabsContainer = document.querySelector(".header-tabs");
const footer = document.querySelector(".footer");
const body = document.querySelector("body");

/**
 *
 * @param {string} tab home, recipes, saved
 */
export const changeNavTo = function (tab) {
  let newTab = document.querySelector(`[data-${tab.toLocaleLowerCase()}]`);
  let newTabBtn = document.querySelector(`[data-btn-${tab}]`);
  let headerTabBtn = document.querySelector(`[data-header-btn-${tab}]`);

  mobileNavBtns.forEach((btn) => btn.classList.remove("active"));
  newTabBtn.classList.add("active");
  contentContainers.forEach((cont) => {
    cont.setAttribute("hidden", "");
  });
  newTab.removeAttribute("hidden");

  headerTabsContainer.querySelectorAll(".header-tabs-item").forEach((li) => {
    li.classList.remove("active");
  });
  headerTabBtn.classList.add("active");

  if (tab == "home" || tab == "saved") window.location.hash = "";

  if (footer.classList.contains("hidden")) footer.classList.remove("hidden");

  body.style.overflow = "auto";

  adjustFooter();
  scrollToTop();
};

let recipesResultContainer = document.querySelector(
  ".recipes-result-container"
);
const loaderContainer = document.querySelector(".loader-container");

const checkHash = function () {
  const hash = window.location.hash.slice(1);

  if (hash === "") return;
  else if (hash.includes("recipe")) {
    // Recipe Details Page
    openDetails();

    const detailsContent = document.querySelector(
      ".recipe-details > .container"
    );

    detailsContent.innerHTML = "";

    loaderContainer.classList.remove("hidden");
    body.style.overflow = "hidden";

    console.log(hash);
    let path = [hash];

    fetchData(
      path,
      function (data) {
        renderDetails(data);
      },
      "path"
    );
  } else {
    // Results Page Queries
    let filterQueries = [];
    let queries = [hash];
    console.log(hash);

    recipesResultContainer.innerHTML = `
    <div class="grid-list">
        ${skeletonResultCard.repeat(20)}
    </div>
    `;

    adjustFooter();

    fetchData(queries, function (data) {
      renderResults(data);
    });
  }
};

window.addEventListener("hashchange", checkHash);
window.addEventListener("load", checkHash);
