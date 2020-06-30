const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

//  loading a quote
function loading (){
  loader.hidden = false
  quoteContainer.hidden = true;
}

// hide loader
function complete(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote
async function getQoute() {
  // Load
  loading ()
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // checking author
    if (data.quoteAuthor === '') {
      authorText.innerText = 'unknown';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // reduce long line
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;

    // stop loader, show quote
    complete()

  } catch (error) {
    console.log('whoop!, no quote', error);
  }
}



function getTweet(){
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
  window.open(twitterUrl,'_blank')
}
// event handlers
newQuoteBtn.addEventListener('click',getQoute)
twitterBtn.addEventListener('click',getTweet)




