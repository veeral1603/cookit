"use script";

//Mobile Filter Button 

const filterBtn = document.querySelector("[data-filterBtn]");
const filtersContainer = document.querySelector("[data-filters]");

const openFilters = function(){
    filtersContainer.classList.toggle("active");
};

filterBtn.addEventListener("click" , openFilters)

// Mobile Filter Close Button 

// const filterCloseBtn = document.querySelector("[data-filterCloseBtn]");

const closeFilters = function() {
    filtersContainer.classList.remove("active");
}

// filterCloseBtn.addEventListener("click" , closeFilters);


// Mobile Filters  

const filterRowsTitle = document.querySelectorAll(".filter-title-container");

filterRowsTitle.forEach((row) => {

    row.addEventListener("click" , function(e){
    
        row.closest(".filter-row").querySelector(".filter-content").classList.toggle("active");
        row.closest(".filter-row").querySelector(".icon").classList.toggle("active");
    });
});