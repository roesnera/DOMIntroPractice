import quotes from "./dummyAPI.js";

const btnRandom = document.getElementById("btn-random");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const btnCopy = document.getElementById("btn-copy");
const copied = document.getElementById("copied");

const inputSearch = document.getElementById("input-search");
const error = document.getElementById("error");
const btnSearch = document.getElementById("btn-search");
const quoteSearch = document.getElementsByClassName("quote-search")[0];

// get random quote index
function random() {
  return Math.floor(Math.random(0) * quotes.length);
}

function getRandomQuote() {
  const randomIdx = random();
  quoteText.innerText = quotes[randomIdx].text;
  quoteAuthor.innerText = quotes[randomIdx].author;
  showCopy();
}

function showCopy() {
  document.getElementById("btn-copy").style.visibility = "visible";
}

function fadeOut(el) {
  let intervalId = setInterval(function () {
    var opacity = el.style.opacity;
    if (opacity > 0) {
      opacity -= 0.1;
      el.style.opacity = opacity;
    } else {
      clearInterval(intervalId); // Stop the interval when opacity reaches 0
      el.style.display = "none"; // Hide the element
    }
  }, 100);
}

const handleCopy = async () => {
  const quoteText = document.querySelector(".quote").innerText;
  let copied = document.getElementById("copied");
  copied.style.opacity = 1;
  copied.style.display = "block";
  try {
    await navigator.clipboard.writeText(quoteText);
    copied.innerText = "Copied to clipboard!";
    fadeOut(copied);
  } catch (error) {
    copied.innerText = "Something went wrong!";
  }
};

btnRandom.addEventListener("click", getRandomQuote);
btnCopy.addEventListener("click", handleCopy);