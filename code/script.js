// document.querySelector("html").innerHTML = "Hello, World! I use the comma and capital 'W' because I'm addressing the entity that is the World, and not simply the physical world. It is the abstract and collective consciousness that I address, inclusive of the physical world in which we live. I have no certainty, however, I do believe when this message was originally relayed, it was meant to convey not just a greeting but a summoning or evokation of birth. A radical gesture, really. So extreme and abstract as to draw crude analogies from the Levinasian interruption. That is to say that it creates a Face of an Other to disrupt and subject my internal automation to the extent that my life, my hunger, and Drive become geared towards giving my all to a biblical extent. Although this greeting has created a ripple through society, no one is to say that whether this primordial birth is for the betterment or detriment of society. We need not dive into Marxist rhetoric about how the illusionments of middle-class society are diverting attentions away from the Derridean dominant-hegemonic Sameness metastasizing Otherness. We all know it is an oversimplification to draw clear bifurcations as Hegelians would imply. However one cannot deny Jean-Francois Lyotard's notion of capitalist-techno-science from his magnum opus, 'The Postmodern Condition'. Perhaps that trinity gives us a framework to work upon in understanding the thrown-ness in which we find ourselves. A thrown-ness that precedes our generation, yet has been so informative and subject-forming. Our actions, our beliefs, and our daily life have been altered. And like that 'Hello, World'--an innocent greeting-- like a storm created unbeknownst to the butterfly, sent society to live a machinistic future that it would otherwise hurt it with Life. So, yes, because I cannot by myself change that which our fathers and our fathers before them have done, simply say, 'Hello, World'."

const example = document.querySelector(".example");

async function getData() {
  const apiKey = `7a29d6e60409ed4601d0c9d3bf561eb4`;
  const city = `fullerton`;

  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
    );
    const data = await result.json();
    console.log(data); //object
    //below add all the functions you want to format the site
    displayWeather(data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

function displayWeather(data) {
  const weatherList = document.getElementById("example");

  for (let i = 0; i < data.list.length; i++) {
    const weather = data.list[i];
    const kelvinTemp = weather.main.temp;
    const celsiusTemp = (kelvinTemp - 273.15).toFixed(1);
    const fahrenheitTemp = (kelvinTemp * 1.8 - 459.67).toFixed(1);
    const weatherElement = document.createElement("li");
    weatherElement.innerHTML = `
      <h3>${weather.dt_txt}</h3>
      <p>Temperature: ${celsiusTemp} &deg;C / ${fahrenheitTemp} &deg;F</p>
      <p>Humidity: ${weather.main.humidity}%</p>
      <p>Description: ${weather.weather[0].description}</p>
    `;
    weatherList.appendChild(weatherElement);
  }
}
getData();
