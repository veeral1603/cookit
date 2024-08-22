'use script';

import { adjustFooter , scrollToTop } from "./main.js";

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");


/**
 * 
 * @param {string} tab home, recipes, saved 
 */
export const changeNavTo = function(tab){
    let newTab = document.querySelector(`[data-${tab.toLocaleLowerCase()}]`);
    let newTabBtn = document.querySelector(`[data-btn-${tab}]`);

    mobileNavBtns.forEach(btn => btn.classList.remove("active"));
    newTabBtn.classList.add("active");
    contentContainers.forEach(cont => { cont.setAttribute("hidden" , "")});
    newTab.removeAttribute("hidden");
    adjustFooter();
    scrollToTop();
};
