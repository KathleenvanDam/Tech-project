let filterButton = document.querySelector(".filterBtn");
filterButton.addEventListener("click", slide);

function slide(){
    let filter = document.querySelector(".filterForm");
    filter.classList.add("filterForm-show");
}

const likeButton = document.querySelector(".like");
likeButton.addEventListener("click", like);

function like(){
     likeButton.classList.toggle('active');
}