const searchInput = document.querySelector(".search-movie");
const searchBtn = document.querySelector(".search-btn");
const addBtn = document.querySelector(".add-btn");
let holdData;
let holdData2 = [];
let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
        addToWatchlist(event.target.dataset.id);
    }
});

function addToWatchlist(id) {
    const existingMovie = watchlist.find((item) => {
        return item.imdbID === id;
    });
    if (!existingMovie) {
        const filterMovie = holdData2.filter((item) => {
            return item.imdbID === id;
        });
        watchlist.push(...filterMovie);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
        alert("Movie added to watchlist!");
    } else {
        alert("This movie is already in the watchlist!");
    }
}

searchBtn.addEventListener("click", async () => {
    holdData2 = [];
    const res = await fetch(
        `https://www.omdbapi.com/?s=${searchInput.value}&apikey=88171955`
    );
    const data = await res.json();
    if (data.Response === "False") {
        document.querySelector(
            ".start-div"
        ).innerHTML = `<p class="start-text">Unable to find what you’re looking for. Please try another search.</p>`;
    } else {
        document.querySelector("main").innerHTML = "";
        data.Search.map((id) => {
            fetch(`https://www.omdbapi.com/?i=${id.imdbID}&apikey=88171955`)
                .then((res) => res.json())
                .then((data) => {
                    holdData2.push(data);
                    document.querySelector(
                        "main"
                    ).innerHTML += `<div class="container">
                <img src=${data.Poster}>
                <div class="container-two">
                    <div class="inner-container">
                        <h2 class="title">${data.Title}</h2>
                        <span>${data.Year}</span>
                        <span>${data.imdbRating}</span>
                    </div>
                    <div class="inner-container">
                        <span>${data.Runtime}</span>
                        <span>${data.Genre}</span>
                        <button class="add-btn" data-id=${data.imdbID}>Watchlist</button>
                    </div>
                    <div class="inner-container">
                        <p>${data.Plot}</p>
                    </div>
                </div>
            </div>`;
                });
        });
    }
});
