const mainTwo = document.querySelector(".main-two");
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

updateWatchlistDisplay();

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        handleRemoveItem(e.target.dataset.id);
    }
});

function handleRemoveItem(id) {
    watchlist = watchlist.filter((item) => {
        return item.imdbID !== id;
    });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    updateWatchlistDisplay();
    alert("Movie removed from watchlist!");
}

function updateWatchlistDisplay() {
    if (watchlist.length === 0) {
        mainTwo.innerHTML = `<div class="start-div">
                <p>Your watchlist is looking a little empty...</p>
                <a href="index.html">+ Let's add some movies!</a>
            </div>`;
    } else {
        const getMovies = watchlist.map((item) => {
            return `<div class="container">
                <img src=${item.Poster}>
                <div class="container-two">
                    <div class="inner-container">
                        <h2 class="title">${item.Title}</h2>
                        <span>${item.Year}</span>
                        <span>${item.imdbRating}</span>
                    </div>
                    <div class="inner-container">
                        <span>${item.Runtime}</span>
                        <span>${item.Genre}</span>
                        <button class="remove-btn" data-id=${item.imdbID}>Remove</button>
                    </div>
                    <div class="inner-container">
                        <p>${item.Plot}</p>
                    </div>
                </div>
            </div>`;
        });
        mainTwo.innerHTML = getMovies.join("");
    }
}
