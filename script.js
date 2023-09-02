const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

let data = [];

const newQuote = () => {
  const quote = data[Math.floor(Math.random() * data.length)];
  quoteText.textContent = quote.text;
  authorText.textContent = quote.author;
  if (!quote.author) {
    authorText.textContent = "Unknown";
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
};

async function getQoute() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    const collectData = await response.json();
    data = collectData;

    console.log(data);
    newQuote();
  } catch (error) {
    console.error("whoop!, no quote", error);
    newQuote();
  }
}

function getTweet() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}
// event handlers
newQuoteBtn.addEventListener("click", getQoute);
twitterBtn.addEventListener("click", getTweet);

getQoute();
