require('dotenv').config();
const cors = require('cors');
const express = require('express');
const logger = require("./logger");
const quotes = require('./quotes.json')

const app = express();
app.use(cors());
app.use(express.json())
app.use(logger);

app.get('/', (req, res) => {
    res.send(`Welcome to the quotes API! There are ${quotes.length} available. (Start with ID 0)`);
})

app.get('/quotes', (req, res) => {
    res.send(`<h1>All the quotes!</h1><br><br>${quotes.map((quote, index) =>
        `id:${index}. ${JSON.stringify(`«<em>${quote.text}</em>», Author: <b>${quote.author}</b>`)}<br><br>`
    )}`);
})

app.get('/quotes/random', (req, res) => {
    const randIdx = Math.floor(Math.random() * quotes.length);
    res.send(quotes[randIdx]);
})

app.get('/quotes/:id', (req, res) => {
    const idx = req.params.id;
    const currentQuote = quotes[idx];
    if (!currentQuote) {
        res.status(404).send(`The quote doesn't exist. Max quote ID is ${quotes.length - 1}.`)
    }
    res.send(currentQuote);
})
app.post("/quotes", (req, res) => {
    const newQuote = req.body;
    if (newQuote.text == '' || newQuote.author == '') {
        res.status(409).send("You need to fill both fields!!!");
    } else {
        newQuote["id"] = quotes.length;
        quotes.push(newQuote)
        res.status(201).send(newQuote);
    }
})
module.exports = app;
