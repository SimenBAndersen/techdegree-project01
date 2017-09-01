// Written by Simen Bjerkeset Andersen, 2017


// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

// Keep track of which quotes are already previewed
var alreadyShown = [];

// Rotating background colors
var newBackgroundColor = ["#ffc0cb", "#008080", "#468499", "#e6e6fa", "#ff6666"];

// Keep track of backgroundColor index to use
var colorToShow = 0;

// Array containing all the objects and their information
// - Each object contains a quote and a source (year and citation is optionally added to some quotes)
// - Each object contains one or more tags
var quotes = [
	{
		quote: 	"I have a dream!",
		source: "Martin Luther King",
		year: 1963,
		tags: ["politics", "inspirational"]
	},
	{
		quote: "Strive not to be a success, but rather to be of value.",
		source: "Ablert Einstein",
		category: ["science", "inspirational"],
		tags: "Science magazine"
	},
	{
		quote: "I attribute my success to this: I never gave or took any excuse.",
		source: "Florence Nightingale",
		tags: ["politics", "nursing", "inspirational"]
	},
	{
		quote: "You miss 100% of the shots you don’t take.",
		source: "Wayne Gretzky",
		tags: ["sports", "inspirational"]
	},
	{
		quote: "The mind is everything. What you think you become.",
		source: "Buddha",
		tags: ["religion", "inspirational"]
	},
];

// Get a random quote from the quotes array that has not been previewed before
function getRandomQuote() {
	var randomQuote;
	var randomIndex;

	// Resets the array containing
	if (alreadyShown.length >= quotes.length) {
		alreadyShown = [];
	}

	// Generate the random index number of which object to preview
	randomIndex = Math.floor(Math.random() * quotes.length);

	// Control whether the quote has already been previewed
	// .. if so, generate a new index number and control again
	while (alreadyShown.includes(randomIndex)) {
		randomIndex = Math.floor(Math.random() * quotes.length);
	}

	// Assigns the quote-to-be-shown to the value that will be returned
	randomQuote = quotes[randomIndex];

	// Add the next quote's index to the array containing all the previously previewed quotes
	alreadyShown.push(randomIndex);

	return randomQuote;
}

function printQuote() {
	// Get the next quote to preview from the getRandomQuote function
	var randomQuote = getRandomQuote();

	// HTML string containing the quote and it's source
	// Leaving the second paragraph element open/unclosed in case something is to be added
	var html = '<p class="quote">' + randomQuote.quote + '</p>' + '<p class="source">' + randomQuote.source;

	// Add the citation to the HTML string if it is present in the object
	if (randomQuote.citation) {
		html += '<span class="citation">' + randomQuote.citation + '</span>';
	}

	// Add the year to the HTML string if it is present in the object
	if (randomQuote.year) {
		html += '<span class="year">' + randomQuote.year + '</span>';
	}

	// Closes the paragraph element
	html += '</p>'

	// Restart the rotating background colors of index has reached end of the color array
	if (colorToShow >= newBackgroundColor.length) {
		colorToShow = 0;
	}

	// Change the background color
	document.body.style.backgroundColor = newBackgroundColor[colorToShow];

	// Rotate the color index
	colorToShow++;

	// Changes the HTML content of the quote-box class in index.html
	document.getElementById('quote-box').innerHTML = html;
}

// Print new quote automatically after 5 seconds
setInterval(function(){printQuote();}, 5000);
