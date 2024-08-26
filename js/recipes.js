"use script";

//Mobile Filter Button 

const filterBtn = document.querySelector("[data-filterBtn]");
const filtersContainer = document.querySelector("[data-filters]");

const openFilters = function(){
    filtersContainer.classList.add("active");
};

filterBtn.addEventListener("click" , openFilters)

// Mobile Filter Close Button 

const filterCloseBtn = document.querySelector("[data-filterCloseBtn]");

const closeFilters = function() {
    filtersContainer.classList.remove("active");
}

filterCloseBtn.addEventListener("click" , closeFilters);


// Mobile Filters  

const filterRows = document.querySelectorAll(".filter-row");

filterRows.forEach((row) => {
    row.addEventListener("click" , function(e){
        
        row.querySelector(".filter-content").classList.toggle("active");
        row.querySelector(".icon").classList.toggle("active");
    });
});