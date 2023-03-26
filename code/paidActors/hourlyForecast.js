async function getData(city) {
  const apiKey = `7a29d6e60409ed4601d0c9d3bf561eb4`;

  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    );
    const data = await result.json();
    isItPronouncedDataOr(data);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

function isItPronouncedDataOr(data) {
  let cardsHtml = "";
  let objectList = data.list;
  objectList.forEach((card, index) => {
    const date = new Date(card.dt_txt);
    const dateString = `${date.getMonth() + 1}-${date.getDate()}`;
    const timeString = format12HourTime(date.getHours(), date.getMinutes());
    cardsHtml += `<article class="accordion-panel">
    <input id="accordion-question-${index}" name="accordion" type="radio" />
      <label for="accordion-question-${index}">
      <span>${timeString} ${dateString}</span>
        <i class="ri-add-line open"></i>
        <i class="ri-subtract-line close"></i>
      </label>
      <div class="accordion-body">
        <p class="accordion-answer">
        ${data.city.name}
        </p>
        </div>
    </article>`;
  });
  document.querySelector("#card-container").innerHTML = cardsHtml;
  //flourishing some silly goose code because i aint got no time for serious sally work at 4am.
  let cityTitle = document.querySelector("title");
  let cityHead = document.querySelector("#cityHead");
  cityTitle.innerHTML = `${data.city.name}'s 3-Hour Forecast`;
  cityHead.innerHTML = data.city.name;
}

function format12HourTime(hours, minutes) {
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

getData("fullerton");

const cityInputForm = document.querySelector(".search");

cityInputForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchInput = document.querySelector(".search__input");
  city = searchInput.value.trim();
  await getData(city);
  searchInput.value = "";
});
