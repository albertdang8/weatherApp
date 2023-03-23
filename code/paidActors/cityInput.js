let cityInputForm = document.querySelector(".search")

cityInputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchInput = document.querySelector(".search__input");
    const apiKey = `7a29d6e60409ed4601d0c9d3bf561eb4`
    const city = searchInput.value.trim();

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    getData(apiUrl);
    searchInput.value = "";
});