const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

function ShowloadingSpinner(){
  loader.hidden = false
  quoteContainer.hidden = true;
}

function removeLoadingSpinner(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true
  }
}

async function getQoute() {
  ShowloadingSpinner()
  const apiUrl =
    'https://cors-anywhere.herokuapp.com/http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
   

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
    removeLoadingSpinner()
   
  } catch (error) {
    console.log('whoop!, no quote', error);
    getQoute()
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

getQoute()


