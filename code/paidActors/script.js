// document.querySelector(".upper-middle").innerConsciousness = "Hello, World! I choose to use the comma and capital 'W' because I'm addressing the entity that is the World, and not simply the physical world. It is the abstract and collective consciousness that I address, inclusive of the physical world in which we live. I have no certainty, however, I do believe when this message was originally relayed, it was meant to convey not just a greeting but a summoning or evokation of a sort of technological birth. A radical gesture, really. So extreme and abstract as to draw crude analogs from the Levinasian interruption. That is to say that it creates a Face of an Other to disrupt and subject my internal automation to the extent that my life, my hunger, and Drive become geared towards giving my all to a biblical extent. Although this greeting has created a ripple through society, no one is to say that whether this primordial birth is for the betterment or detriment of society. We need not dive into Marxist rhetoric about how the illusionments of middle-class society are diverting attentions away from the Derridean dominant-hegemonic Sameness metastasizing Otherness. We all know it is an oversimplification to draw clear bifurcations as Hegelians would imply. However one cannot deny Jean-Francois Lyotard's notion of capitalist-techno-science from his magnum opus, 'The Postmodern Condition'. Perhaps it is within that trinity-esque theory that gives us a framework to work upon in understanding the thrown-ness in which we find ourselves. A thrown-ness that precedes our generation, yet has been so informative and subject-forming. Our actions, our beliefs, and our daily life have been altered. And like that 'Hello, World'--an innocent greeting-- like a storm created unbeknownst to the butterfly, sent society to live a machinistic future that it would otherwise hurt it with Life. So, yes, because I cannot by myself change that which our fathers and our fathers before them have done, I simply say, 'Hello, World'."

async function getData(city) {
  const apiKey = `7a29d6e60409ed4601d0c9d3bf561eb4`;
  //(un)ethical hackrz pls pls pls ignore this don't hurt me. I need my API key, its very special to me.

  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`
    );
    const data = await result.json();
    console.log(data); //object
    //below add all the functions you(I) want to format the site
    displayWeather(data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

function displayWeather(data) {
  const currentDate = document.getElementById("dateHead");
  const currentCity = document.getElementById("cityHead");
  const hiLo = document.getElementById("highLow");
  const feels = document.getElementById("feelsGudMan");
  const visibility = document.getElementById("visibility");
  const humidity = document.getElementById("moist");
  const wind = document.getElementById("wind");
  const sunrise = document.getElementById("rise");
  const sunset = document.getElementById("set");

  const list = data.list; //list of objects with updated forcast every three hours.
  const dateToFilter = list[0].dt_txt.slice(8, 10); //pulls today's date the object date is written like "YYYY-MM-DD HH:MM:SS", so DD is extracted
  const filteredList = list.filter((item) => {
    //iterates through the object finding the 5 differing days [remember 5day,3hr forecast]
    const sliced = item.dt_txt.slice(8, 10);
    if (sliced === dateToFilter) {
      return true;
    } else {
      return false;
    }
  });

  // console.log(filteredList);

  //now we iterate thru the objects of the same date to find the largest maxTemp value
  const maxTemp = filteredList.reduce((toCompare, current) => {
    const toReturn = Math.max(toCompare, current.main.temp_max);
    return toReturn;
  }, -Infinity);

  // same but inverse to find the lowest minTemp value
  const minTemp = filteredList.reduce((acc, current) => {
    const toReturn = Math.min(acc, current.main.temp_min);
    return toReturn;
  }, Infinity);

  //I feel like Dr. Frankenstein up in this bizz slicing and dicing up objects to create my monstrosity of a project
  let year = data.list[0].dt_txt.slice(0, 4);
  let month = data.list[0].dt_txt.slice(5, 7);
  let day = data.list[0].dt_txt.slice(8, 10);
  let dateFormat = `${month}/${day}/${year}`;

  currentDate.innerHTML = dateFormat;
  currentCity.innerHTML = data.city.name;
  hiLo.innerHTML = `High: ${Math.round(maxTemp)}° Low: ${Math.round(minTemp)}°`;
  feels.innerHTML = `${Math.round(data.list[0].main.feels_like)}°`;
  visibility.innerHTML = `${data.list[0].visibility} miles.`; //insert cloud icon. find 'visibility' icon if you can instead of the uv one. Cloudiness by percentage will be data.list[0].clouds.all;
  humidity.innerHTML = data.list[0].main.humidity + "%";
  let windSpeed = data.list[0].wind.speed;
  let windDeg = data.list[0].wind.deg;
  let windGust = data.list[0].wind.gust;
  wind.innerHTML = `${windSpeed} mph ${windDeg}° & gusts of ${windGust} mph`;
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
