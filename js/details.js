"use script";

import { fetchData } from "./api.js";
import { adjustFooter, scrollToTop } from "./main.js";

// Opening recipe details on clicking result cards

const detailsContainer = document.querySelector("[data-details]");
const contentContainers = document.querySelectorAll("article.container");
let currentTab;

contentContainers.forEach((contianers) => {
  contianers.addEventListener("click", function (e) {
    if (!e.target.closest(".result-card") || e.target.closest(".bookmark-btn"))
      return;

    const recipeId = e.target.closest(".result-card").dataset.id;
    window.location.hash = `/${recipeId}`;

    currentTab = e.target.closest("article");

    contentContainers.forEach((cont) => cont.setAttribute("hidden", ""));
    detailsContainer.removeAttribute("hidden");
    scrollToTop();
    adjustFooter();
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

// Render Details

const detailsContent = document.querySelector(".recipe-details > .container");

export const renderDetails = function (data) {
  detailsContent.innerHTML = "";
  console.log(data);
  const details = `<div class="content-left">
            
                      <section class="details-header section" >
                          <div class="leading-btn-container">
                              <button class="leading-btn" data-leading-btn>
                                  <span class="material-symbols-outlined">arrow_back</span>
                              </button>
                          </div>
                          <div class="container">
                                  
                                  <img src="Assets/Food/Food.jpg" class="recipe-image">  

                                  <div class="recipe-title-container">
                                      <div class="recipe-title">
                                          <h2>Recipe Name Very big name very very big</h2>
                                      </div>

                                      <button class="bookmarks-btn removed">
                                          <span class="material-symbols-outlined bookmark-add">bookmark_add</span> <span id="label-save">Save</span>
                                          <span class="material-symbols-outlined bookmark">bookmark</span> <span id="label-unsave" hidden>Unsave</span>
                                      </button>
                                  </div>

                                  <div class="recipe-source-container">
                                      <p>by <span class="recipe-source"><a href= "">Veeral Narang</a></span></p>
                                  </div>
                          </div>
                      </section>

                    </div>

                    <div class="content-right">
                        <section class="details-header section" >
                            <div class="recipe-title-container">
                                <div class="recipe-title">
                                    <h2>Recipe Name Very big name very </h2>
                                </div>

                                <button class="bookmarks-btn removed">
                                    <span class="material-symbols-outlined bookmark-add">bookmark_add</span> <span id="label-save">Save</span>
                                    <span class="material-symbols-outlined bookmark">bookmark</span> <span id="label-unsave" hidden>Unsave</span>
                                </button>
                            </div>

                            <div class="recipe-source-container">
                                <p>by <span class="recipe-source"><a href= "">Veeral Narang</a></span></p>
                            </div>
                        </section>

                        <section class="details-content section" >

                            <div class="recipe-meta">
                                <div class="ingredients meta-box">
                                    <h2 class="ingredients-value">4</h2>
                                    <p class="ingredients-label">Ingredients</p>
                                </div>
                                <div class="time meta-box">
                                    <h2 class="ingredients-value">15</h2>
                                    <p class="ingredients-label">Minutes</p>
                                </div>
                                <div class="calories meta-box">
                                    <h2 class="ingredients-value">450</h2>
                                    <p class="ingredients-label">Calories</p>
                                </div>
                            </div>

                            <div class="recipe-tags-container">
                                <ul class="tags-list">

                                    <li class="list-item">
                                        <div class="recipe-tag">
                                            <p>Low-Carb</p>
                                        </div>
                                    </li>
                                    <li class="list-item">
                                        <div class="recipe-tag">
                                            <p>Chicken</p>
                                        </div>
                                    </li>

                                    <li class="list-item">
                                        <div class="recipe-tag">
                                            <p>Dinner</p>
                                        </div>
                                    </li>
                                    
                                    <li class="list-item">
                                        <div class="recipe-tag">
                                            <p>American</p>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div class="recipe-ingredients">
                                <div class="ingredients-header">
                                    <h2>Ingredients</h2>
                                    <p class="servings">for <span class="servings-count">6</span> servings</p>
                                </div>

                                <div class="ingredients-content">
                                    <ul class="ingredients-list">
                                        <li class="list-item">1 Tomato very very big</li>
                                        <li class="list-item">1 Potato sliced finely</li>
                                        <li class="list-item">1 tablespoon Sugar</li>
                                        <li class="list-item">1 cup Water</li>
                                        <li class="list-item">1 cup Water</li>
                                        <li class="list-item">1 cup Water</li>
                                        <li class="list-item">1 cup Water</li>
                                        
                                    </ul>
                                </div>
                            </div>

                            <div class="details-action">
                                <a href= "" class="full-recipe-btn action-btn">
                                    <span class="material-symbols-outlined">menu_book</span>
                                    <span class="label">Full Recipe</span>
                                </a>

                                <a href = "" class="social-share-btn action-btn">
                                    <span class="material-symbols-outlined">share</span>
                                    <span class="label">Share Recipe</span>
                                </a>
                            </div>

                        </section>

                      /div>
  `;
};
