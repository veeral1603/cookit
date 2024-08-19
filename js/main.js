'use script';

import * as route from "./route.js";
import * as api from "./api.js";
import * as home from "./home.js";

// Mobile Navigation (To be done using route later)

const mobileNavContainer = document.querySelector(".mobile-nav");
const mobileNavBtns = document.querySelectorAll(".mobile-nav-list li");
const contentContainers = document.querySelectorAll("article.container");



mobileNavContainer.addEventListener("click" , function(e){
    
    if (e.target.classList.contains("mobile-nav-list")) return

    mobileNavBtns.forEach(btn => {
        btn.classList.remove("active");
    });

    e.target.closest(".list-item").classList.add("active");

    let clicked = e.target.closest(".list-item").querySelector(".nav-label").innerHTML.toLowerCase()
    let currentTab = document.querySelector(`[data-${clicked}]`);

    contentContainers.forEach(cont => { cont.setAttribute("hidden" , "")});
    currentTab.removeAttribute("hidden");


});

