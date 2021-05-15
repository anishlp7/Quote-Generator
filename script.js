// Get Quote From API

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterrBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Show Loading
function ShowLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide Loading
function removeLoadingSpinner() {
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote() {
    ShowLoadingSpinner();
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/';
    const apiurl= 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(proxyUrl + apiurl)
        let data = await response.json()
        console.log(data)

        //If Author is blank, add 'Unknown
        if(data.quoteAuthor === ''){
            quoteAuthor.innerText = "Unknown"
        } else {
            quoteAuthor.innerText = data.quoteAuthor
        }

        if(data.quoteText.length > 80){
            quoteText.classList.add('long-quote');
        } else{
            quoteText.classList.remove('long-list');
        }
        
        quoteText.innerText = data.quoteText
        // Stop Loader, Show Quotes
        removeLoadingSpinner()
    } catch(err) {
        getQuote()
        console.log("Got Some Error",err);
    }

}

// Twitter Function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;

    const twitterUrl =`https://twitter.com/intent/tweet?text=${quote} - ${author}`;

    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterrBtn.addEventListener('click', tweetQuote);


// On Load
getQuote();