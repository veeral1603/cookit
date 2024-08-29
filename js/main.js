'use script';

import * as route from "./route.js";
import * as api from "./api.js";
import * as home from "./home.js";
import * as recipes from "./recipes.js";
import * as details from "./details.js";


// Mobile Navigation 

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");



mobileNavContainer.addEventListener("click" , function(e){
    
    if (e.target.classList.contains("mobile-nav-list") || e.target.classList.contains("mobile-nav")) return;

    const tab = `${e.target.closest(".list-item").querySelector(".nav-label").innerHTML.toLowerCase()}`;

    recipes.closeFiltersRows();
    recipes.closeFilters();
    route.changeNavTo(tab);

});

// Adjust Footer 

const footer = document.querySelector(".footer");
const body = document.querySelector("body");

export const adjustFooter = function(){
    if ( body.offsetHeight <  window.innerHeight)
    {
        footer.classList.add("sticky");
        footer.style.bottom = `${mobileNavContainer.offsetHeight}px`;
    }
    else {
        footer.classList.remove("sticky");
    }
};

// Scroll to top 

export const scrollToTop = function(){
    window.scrollTo(0, 0);
};


// Recipe details page 

const openDetails = function(){

};


// Error 404 

export const error404 = function () {
    console.log("Error 404");
};


// Render  Recipes 

export const renderRecipesResults = function(){

};