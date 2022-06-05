import { handleSubmit } from "./js/formHandler";
import { setDateFieldMinAndMax } from "./js/dateUtils";
import { print } from "./js/print";
import "./styles/main.scss";

setDateFieldMinAndMax();

const weatherSection = document.querySelector("#weather");
const imagesSection = document.querySelector("#images");

weatherSection.classList.add("hidden");
imagesSection.classList.add("hidden");

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("sbtn");
  submitBtn.addEventListener("click", (e) => {
    handleSubmit(e);
  });

  const printBtn = document.getElementById("print-btn");
  printBtn.addEventListener("click", (e) => {
    print(e);
  });
});
