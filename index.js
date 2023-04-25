import quotes from "./dummyAPI.js";

const btnRandom = document.getElementById("btn-random");
const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const btnCopy = document.getElementById("btn-copy");

const inputSearch = document.getElementById("input-search");
const error = document.getElementById("error");
const iconSearch = document.getElementById("search-icon");
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
  const copied = document.getElementById("copied");
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

function getQuotesByAuthor(inputAuthor) {
  let authorQuotes = quotes.filter((quote) => {
    if (
      quote.author &&
      quote.author.toLowerCase() === inputAuthor.toLowerCase()
    ) {
      return quote;
    }
  });
  return authorQuotes;
}

function appendSearchResults(quotes) {
  quotes.forEach((quote, idx) => {
    const blockQuote = createQuoteHTML(idx, quote);
    quoteSearch.appendChild(blockQuote);
  });

  function createQuoteHTML(idx, quote) {
    let blockQuote = document.createElement("blockquote");
    blockQuote.setAttribute("class", "bQuote");

    let pTextSearch = document.createElement("p");
    pTextSearch.setAttribute("class", "quote-text-search");

    let pAuthorSearch = document.createElement("p");
    pAuthorSearch.setAttribute("class", "quote-author-search");

    pTextSearch.innerHTML = `${idx + 1}. ${quote.text}`;
    pAuthorSearch.innerHTML = quote.author;

    blockQuote.appendChild(pTextSearch).appendChild(pAuthorSearch);

    return blockQuote;
  }
}

function handleQuotesByAuthor() {
  error.innerText = "";
  quoteSearch.innerText = "";
  const inputAuthor = inputSearch.value;
  if (!inputAuthor) {
    error.innerText = "This field is required";
    return;
  }
  let quotes = getQuotesByAuthor(inputAuthor);
  if (quotes.length === 0) {
    error.innerText = "Sorry! I don't have anything for this author!";
  }
  appendSearchResults(quotes);

  inputSearch.value = "";
}

function search(event) {
  if (event.key === "Enter") {
    handleQuotesByAuthor();
  }
  
}

iconSearch.addEventListener("click", handleQuotesByAuthor);
inputSearch.addEventListener("keydown", search);
