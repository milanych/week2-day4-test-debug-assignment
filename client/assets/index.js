const textElement = document.querySelector("#text");
const authorElement = document.querySelector("#author");
const form = document.querySelector("#create-form");
const randomiseButton = document.querySelector("#btn-randomise");


async function fetchQuotesData() {
  try {
    const repsData = await fetch(`http://localhost:3000/quotes/random`)
    const quote = await repsData.json();
    displayQuote(quote);
  } catch (e) {
    console.log(e);
  }
}

function displayQuote(quote) {
  console.log(quote)
  textElement.textContent = quote["text"];
  authorElement.textContent = quote["author"];
}

async function createNewQuote(e) {
  e.preventDefault();

  const data = {
    text: e.target.quote.value,
    author: e.target.author.value
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }

  const response = await fetch("http://localhost:3000/quotes", options);
  if (response.status == 201) {
    e.target.quote.value = ''
    e.target.author.value = ''
    alert("Quote added.")
  } else {
    alert("Fill both fields!!!")
  }
}

form.addEventListener("submit", createNewQuote);
randomiseButton.addEventListener('click', fetchQuotesData);
