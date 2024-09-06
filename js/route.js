'use script';

import { adjustFooter , scrollToTop } from "./main.js";

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");
const headerTabsContainer = document.querySelector(".header-tabs");


/**
 * 
 * @param {string} tab home, recipes, saved 
 */
export const changeNavTo = function(tab){
    let newTab = document.querySelector(`[data-${tab.toLocaleLowerCase()}]`);
    let newTabBtn = document.querySelector(`[data-btn-${tab}]`);
    let headerTabBtn = document.querySelector(`[data-header-btn-${tab}]`)

    mobileNavBtns.forEach(btn => btn.classList.remove("active"));
    newTabBtn.classList.add("active");
    contentContainers.forEach(cont => { cont.setAttribute("hidden" , "")});
    newTab.removeAttribute("hidden");

    headerTabsContainer.querySelectorAll(".header-tabs-item").forEach((li) => {
        li.classList.remove("active");
    });
    headerTabBtn.classList.add("active");
    
    adjustFooter();
    scrollToTop();
};
