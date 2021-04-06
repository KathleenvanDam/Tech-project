
// Filterbutton
let filterButton = document.querySelector(".filterBtn");
filterButton.addEventListener("click", slide);

function slide(){
    let filter = document.querySelector(".filterForm");
    filter.classList.add("filterForm-show");
}

// Like button
// const likeButton = document.querySelector(".like-btn");
// likeButton.addEventListener("click", liked);

// function liked(){
//      likeButton.classList.toggle('true');
// }

