//dear, future me, here: ° . thank me later xoxox UwU

async function getData(city) {
  const apiKey = `7a29d6e60409ed4601d0c9d3bf561eb4`;
  const photoApi = `TDS2ZnsBwXIvsBAdjtz9TLvaivU3hK4GVdDi_-UTHDs`
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
  //experi-mentally unstable thoughts
  // try {
  //   const unsplashResult = await fetch(`https://api.unsplash.com/photos/random?query=${city}&client_id=${photoApi}`);
  //   const unsplashData = await unsplashResult.json();
  //   setBodyBackground(unsplashData)
  //   console.log(unsplashData);
  // } catch (error) {
  //   console.log(error);
  // }
}

function isItPronouncedDataOr(data) {
  let objectList = data.list;
  let cardsHtml = "";

  objectList.forEach((card, index) => {
    let temp = Math.round(objectList[index].main.temp); //F
    const minTemp = Math.round(objectList[index].main.temp_min);
    const maxTemp = Math.round(objectList[index].main.temp_max);
    let moistness = objectList[index].main.humidity; //%
    let mainWeather = objectList[index].weather[0].main;
    let mainDescription = objectList[index].weather[0].description;
    let clouds = objectList[index].clouds.all; //%
    let windSpeed = objectList[index].wind.speed; //mph
    let gust = objectList[index].wind.gust; //mph

    let hardCard = `<ul>
    <li>Temp: ${temp}°F with a potential low of ${minTemp}° and a high of ${maxTemp}°.</li>
    <li>Weather: ${mainWeather} — <span class="smol">${mainDescription}.</li>
    <li>Wind: ${windSpeed}mph with potential gusts of ${gust}.</li>
    <li>Humidity: ${moistness}% Clouds: ${clouds}%</li>
    </ul>`;

    const date = new Date(card.dt_txt);
    const monthName = date.toLocaleString("default", { month: "long" });
    const dateString = `${monthName}, ${date.getDate()}`;
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
          ${hardCard}
          </p>
          </div>
          </article>`;
  });
  document.querySelector("#card-container").innerHTML = cardsHtml;
  //flourishing some silly goose code because i aint got no time for serious sally work at 4am.
  let cityTitle = document.querySelector("title");
  let cityHead = document.querySelector("#cityHead");
  cityTitle.innerHTML = `${data.city.name}'s 3-Hour Forecast`;
  cityHead.innerHTML = ` for ${data.city.name}`;
}

function format12HourTime(hours, minutes) {
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

getData("Fullerton");

const cityInputForm = document.querySelector(".search");

cityInputForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const searchInput = document.querySelector(".search__input");
  city = searchInput.value.trim();
  await getData(city);
  searchInput.value = "";
});

// ya boi bit off more than he could chew
// function setBodyBackground(backgroundUrl) {
//   document.body.style.backgroundImage = `url(${backgroundUrl.urls.regular})`;
//   document.body.style.backgroundRepeat = "no-repeat";
//   document.body.style.backgroundSize = "cover";
// }