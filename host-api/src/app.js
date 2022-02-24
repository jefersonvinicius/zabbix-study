const express = require('express');
const { postPet, getPets, getOnePet } = require('./controller/pets');

const app = express();

app.use(express.json());
app.post('/pets', postPet);
app.get('/pets', getPets);
app.get('/pets/:id', getOnePet);

module.exports = app;
