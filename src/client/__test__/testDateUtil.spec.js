import { selectWeatherDate, tripLength } from "../js/dateUtils";

describe("Date Util tests", () => {
  //Test  fail case
  test("Validating trip length fail", () => {
    expect(tripLength("2022-06-10", "2022-06-06")).toBe(-4);
  });

  //Test success case
  test("Validating trip length success", () => {
    expect(tripLength("2022-06-06", "2022-06-10")).toBe(4);
  });

  //Test success selecting weather date object from list
  let data = [
    {
      datetime: "2022-06-05",
      desc: "Scattered clouds",
      maxTemp: 25.8,
      minTemp: 13.1,
      temp: 19.1,
    },
    {
      datetime: "2022-06-06",
      desc: "Scattered clouds",
      maxTemp: 24.8,
      minTemp: 23.1,
      temp: 16.1,
    },
  ];

  test("Validating selecting weather date object from list success", () => {
    expect(selectWeatherDate(data, "2022-06-05")).toContainEqual({
      datetime: "2022-06-05",
      desc: "Scattered clouds",
      maxTemp: 25.8,
      minTemp: 13.1,
      temp: 19.1,
    });
  });
});
