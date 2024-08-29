"use script";

const filterRowsTitle = document.querySelectorAll(".filter-title-container"); //Filter  Rows 

//Mobile Filter Button 

const filterBtn = document.querySelector("[data-filterBtn]");
const filtersContainer = document.querySelector("[data-filters]");

const openFilters = function(){
    filtersContainer.classList.toggle("active");
    closeFiltersRows();
};

filterBtn.addEventListener("click" , openFilters)

// Close Filter Container 

export const closeFilters = function(){
    filtersContainer.classList.remove("active");
};


// Close Filter Rows

export const closeFiltersRows = function() {

    filterRowsTitle.forEach(row => {
        row.closest(".filter-row").querySelector(".filter-content").classList.remove("active");
        row.closest(".filter-row").querySelector(".icon").classList.remove("active");
    });
}


// Mobile Filters  

filterRowsTitle.forEach((row) => {


    row.addEventListener("click" , function(e){
    
        let siblingRows = Array.from(row.parentNode.parentNode.children).filter(sibling => sibling !== row.parentNode && !sibling.classList.contains("filter-action-container"));
    
        
        siblingRows.forEach(sibling => {
            sibling.querySelector(".filter-content").classList.remove("active");
            sibling.querySelector(".icon").classList.remove("active");
        });

        row.closest(".filter-row").querySelector(".filter-content").classList.toggle("active");
        row.closest(".filter-row").querySelector(".icon").classList.toggle("active");
    });
});