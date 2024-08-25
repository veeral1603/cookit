"use script";

//Mobile Filter Button 

const filterBtn = document.querySelector("[data-filterBtn]");
const filtersContainer = document.querySelector("[data-filters]");

const openFilters = function(){
    filtersContainer.classList.toggle("active");
    console.log("hi")
};

filterBtn.addEventListener("click" , openFilters)