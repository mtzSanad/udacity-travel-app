//Since API only can prediect 16 days a head so we will disallow selecting unavailable dates
const setDateFieldMinAndMax = () => {
  const dateField = document.querySelector("#trip-date");
  const today = new Date();

  //Setting minmum to todays date
  dateField.min = today.toISOString().split("T")[0];

  //Setting max day to current date + 15 days
  let maxDate = new Date();
  maxDate.setDate(today.getDate() + 15);
  dateField.max = maxDate.toISOString().split("T")[0];
};

const validateDate = () => {
  const dateField = document.querySelector("#trip-date");
  const returnField = document.querySelector("#return-date");

  const tripDuration = tripLength(dateField.value, returnField.value);

  //Trip return date is less than trip date generate error
  if (tripDuration < 0) {
    return false;
  }

  //In case of manually setting date, the value will be empty
  if (!dateField.value) {
    return false;
  } else {
    return true;
  }
};

const selectWeatherDate = (weatherData, tripDate) => {
  console.log(tripDate);
  return weatherData.filter((e) => {
    return tripDate == e.datetime;
  });
};

const tripLength = (tripDate, returnDate) => {
  return new Date(returnDate).getDate() - new Date(tripDate).getDate();
};

export { setDateFieldMinAndMax, validateDate, selectWeatherDate, tripLength };
