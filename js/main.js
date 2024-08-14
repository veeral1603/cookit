'use script';

import * as route from "./route.js";
import * as api from "./api.js";
import * as home from "./home.js";

// Home Search

// Meal Tabs 
const mealTabsContainer = document.querySelector(".tabs-container");
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

mealTabsContainer.addEventListener("click" , function(e){
    if(!e.target.classList.contains("tab-btn")) return;
    
    tabBtns.forEach(btn => btn.setAttribute("data-selected", "false"));
    e.target.setAttribute("data-selected" , "true");
    let tabNumber = e.target.dataset.tab;

    tabPanels.forEach(panel => {
        panel.setAttribute("hidden", "");
        
        if(panel.dataset.panel === tabNumber) panel.removeAttribute("hidden");
    });
});