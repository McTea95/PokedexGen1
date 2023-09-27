// app.js
const express = require('express');
const app = express();
const path = require('path');
const { connectToMongoDB } = require('./db'); // Import the module

const port = 3000;

app.use(express.static('public'));
app.set('views', path.join('public/views'));
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  try {
    // Use the connectToMongoDB function from the module
    const { collection } = await connectToMongoDB();

    const pokemons = await collection.find({}).sort({ Nummer: 1 }).toArray();
    res.render('index', { pokemons });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});

app.get('/pokemons/:name', async (req, res) => {
  const name = req.params.name;

  try {
    const { collection } = await connectToMongoDB();

    const pokemons = await collection.find({}).sort({ Nummer: 1 }).toArray();
    const pokemon = pokemons.find((pokemon) => pokemon.Name === name);
    const currentIndex = pokemons.findIndex((p) => p.Name === name);

    const nextIndex = (currentIndex + 1) % pokemons.length;
    const nextPokemon = pokemons[nextIndex];
    const nextPokemonName = nextPokemon.Name;

    const previousIndex = (currentIndex - 1 + pokemons.length) % pokemons.length;
    const prevPokemon = pokemons[previousIndex];
    const previousPokemonName = prevPokemon.Name;

    res.render('pokemonDetail', { pokemon, nextPokemonName, previousPokemonName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
