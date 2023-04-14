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
}

btnRandom.addEventListener("click", getRandomQuote);