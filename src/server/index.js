const path = require("path");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

//Configureing the environment variables
const dotenv = require("dotenv");
dotenv.config();

const PORT = 8080;

const app = express();
//Serving static files from dist folder
app.use(express.static("dist"));

//Handling cors between front and back
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile("dist/index.html", { root: "." });
});

//handling requesting sentiment
app.post("/travelapi", async (req, resp) => {
  //User submited city and trip date
  const city = req.body.city;

  try {
    //calling geonames api to get lat and lng
    const geoNamesResponse = await axios(
      `http://api.geonames.org/postalCodeSearchJSON?placename=${city}&maxRows=1&username=${process.env.GEO_API_KEY}`
    );
    //Getting data from geonames api
    const { countryCode, lat, lng } = geoNamesResponse.data.postalCodes[0];

    //Calling weatherbit API
    const weatherBitResponse = await axios(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${process.env.API_KEY}`
    );

    //Getting weather data for 16 day
    const weatherBit16DayForecast = weatherBitResponse.data.data;
    // console.log(weatherBit16DayForecast);

    //Extracting useful data only
    const weatherBit16DayForecastMinimized = weatherBit16DayForecast.map(
      (wData) => ({
        temp: wData?.temp,
        datetime: wData?.datetime,
        minTemp: wData?.min_temp,
        maxTemp: wData?.max_temp,
        desc: wData?.weather?.description,
      })
    );
    // console.log(weatherBit16DayForecastMinimized);

    //Getting image data using pixabay API
    let pixaBayResponse = await axios(
      `https://pixabay.com/api/?key=${process.env.PIXBAY_KEY}&q=${city}&image_type=photo`
    );

    //Image API data
    let pixaBayData = pixaBayResponse.data.hits;

    //No image, then search by country
    if (pixaBayData.length === 0) {
      pixaBayResponse = await axios(
        `https://pixabay.com/api/?key=${process.env.PIXBAY_KEY}&q=${countryCode}&image_type=photo`
      );
      pixaBayData = pixaBayResponse.data.hits;
    }

    // Extracting useful data only
    const pixaBayDataMinimized = pixaBayData.map((e) => ({
      tags: e.tags,
      previewURL: e.previewURL,
      largeImageURL: e.largeImageURL,
    }));
    // console.log(pixaBayDataMinimized);

    resp.send({
      weather: weatherBit16DayForecastMinimized,
      images: pixaBayDataMinimized,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/test", function (req, res) {
  res.send("test");
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Server listening on port ${PORT}!`);
});

//exporting app to use it in the unit testing
module.exports = app;
