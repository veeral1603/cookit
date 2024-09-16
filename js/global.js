"use script";

import { getBookmarks } from "./bookmarks.js";

export const skeletonResultCard = `
                        <div class="card skeleton-card">
                            <div class="skeleton card-banner"></div>

                            <div class="card-body">
                                <div class="skeleton card-title"></div>
                            
                                <div class="skeleton card-text"></div>
                            </div>
                        </div>
`;

export const resultCard = function (recipeName, uri, smallImage, totalTime) {
  const recipeNameCapitalized =
    recipeName[0].toUpperCase() + recipeName.slice(1);
  const recipeID = uri.split("#")[1].replace("/", "");

  const card = ` <div class="card result-card" data-id="${recipeID}">
                            <div class="image-holder">
                                <img src="${smallImage}" width="200px" height="200px" class="result-card-image" alt="Image" loading="lazy">
                            </div>
  
                            <div class="card-body">
                                <h2 class="card-title">
                                    <a href="#/${recipeID}" class="card-title-link">${
    recipeNameCapitalized.length > 30
      ? `${recipeNameCapitalized.slice(0, 30)}...`
      : recipeNameCapitalized
  }</a>
                                </h2>
  
                                <div class="meta-wrapper">
                                    <div class="meta-item">
                                        <span class="material-symbols-outlined">schedule</span>
                                        <span class="meta-label">${
                                          totalTime || "20+"
                                        } Minutes</span>
                                    </div>
  
                                    <button class="bookmark-btn ${
                                      getBookmarks().some(
                                        (obj) => obj.recipeID == recipeID
                                      )
                                        ? "saved"
                                        : "removed"
                                    }">
                                        <span class="material-symbols-outlined bookmark-add">bookmark_add</span>
                                        <span class="material-symbols-outlined bookmark">bookmark</span>
                                    </button>
                                </div>
                            </div>
                        </div>
    `;

  return card;
};

// const card = ` <div class="card result-card" data-id="${recipeID}">
//                         <div class="image-holder">
//                             <img src="${smallImage}" width="200px" height="200px" class="result-card-image" alt="Image">
//                         </div>

//                         <div class="card-body">
//                             <h2 class="card-title">
//                                 <a href="#${recipeID}" class="card-title-link">${
//   recipeNameCapitalized.length > 30
//     ? `${recipeNameCapitalized.slice(0, 30)}...`
//     : recipeNameCapitalized
// }</a>
//                             </h2>

//                             <div class="meta-wrapper">
//                                 <div class="meta-item">
//                                     <span class="material-symbols-outlined">schedule</span>
//                                     <span class="meta-label">${
//                                       totalTime || "20+"
//                                     } Minutes</span>
//                                 </div>

//                                 <button class="bookmark-btn removed">
//                                     <span class="material-symbols-outlined bookmark-add">bookmark_add</span>
//                                     <span class="material-symbols-outlined bookmark">bookmark</span>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
// `;
