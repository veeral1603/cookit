"use script";

import * as api from "./api.js";

// Home Search

const homeSearchInput = document.querySelector("[data-homeSearchInput]");
const homeSearchBtn = document.querySelector("[data-homeSearchBtn]");

const printData = function (data) {console.log(data);}

homeSearchBtn.addEventListener("click" , function(){
    api.fetchData(homeSearchInput.value, printData);
});

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


