import { validateDate, selectWeatherDate, tripLength } from "./dateUtils";

function handleSubmit(event) {
  event.preventDefault();

  let city = document.getElementById("city").value;
  let tripDate = document.getElementById("trip-date").value;
  const returnDate = document.getElementById("return-date").value;
  const tripDurationInDays = tripLength(tripDate, returnDate);
  const errorDiv = document.querySelector("#error");
  errorDiv.innerHTML = "";

  //Checking all fields have value
  if (city == "" || tripDate == "" || returnDate == "") {
    errorDiv.innerHTML = "<p>Error fill all the form data.</p>";
    return;
  }

  //Checking date validation
  const isValid = validateDate();

  if (!isValid) {
    errorDiv.innerHTML = "<p>Invalid Date</p>";
    return;
  }

  fetch("http://localhost:8080/travelapi", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    mode: "cors",
    body: JSON.stringify({
      city,
    }),
  })
    .then((res) => res.json())
    .then(function (data) {
      //Setting weather section data
      //Selecting correct weather date
      let correctWeatherDate;
      let todayShort = new Date().toISOString().split("T")[0];
      if (tripLength(todayShort, tripDate) <= 7) {
        correctWeatherDate = selectWeatherDate(data.weather, todayShort)[0];
      } else {
        correctWeatherDate = selectWeatherDate(data.weather, tripDate)[0];
      }

      const weatherHtml = `
        <p><span>Temprature :</span>${correctWeatherDate.temp}</p>
        <p><span>Max Temp. :</span>${correctWeatherDate.minTemp}</p>
        <p><span>Min Temp. :</span>${correctWeatherDate.maxTemp}</p>
        <p><span>Weather is&nbsp</span>${correctWeatherDate.desc}</p>
        `;
      document.getElementById("weather").innerHTML = weatherHtml;

      //Setting images data
      const imagesData = data.images;
      let imagesHtml = `<p class="highlight">Your trip duration is ${tripDurationInDays} Days</p>`;
      imagesData.forEach((e, index) => {
        if (index === 0) {
          imagesHtml += `<img class="big-img" src="${e.largeImageURL}" alt="${e.tags}" />`;
        } else {
          imagesHtml += `<img class="small-img" src="${e.previewURL}" alt="${e.tags}" />`;
        }
      });
      document.getElementById("images").innerHTML = imagesHtml;

      const weatherSection = document.querySelector("#weather");
      const imagesSection = document.querySelector("#images");

      weatherSection.classList.remove("hidden");
      imagesSection.classList.remove("hidden");
    });
}

export { handleSubmit };
