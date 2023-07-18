const express = require('express');
const app = express();
const path = require('path');
//const pokemons = require('./pokemon.json')
const fs = require('fs')

const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const port = 3000;

// MongoDB-Verbindungs-URL
const url = 'mongodb://mongodb:27017'; //wichtig


// MongoDB-Datenbankname und Sammlungsname
const dbName = process.env.MONGO_DATABASE.toString();
const collectionName = process.env.MONGO_COLLECTION.toString();


app.use(express.static('public'));

// being rendered res.render()
app.set('views', path.join(__dirname, 'public/views'));

// Set view engine as Pug
app.set('view engine', 'pug');

// Endpunkt zum Abfragen aller Datensätze
app.get('/', async (req, res) => {
  try {
    // Verbindung zur MongoDB herstellen
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Alle Dokumente in der Sammlung abfragen
    const pokemons = await collection.find({}).toArray();

    // Antwort senden
    res.render('index', { pokemons });

    // Verbindung zur MongoDB schließen
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});


//json in pug laden und root auf index verweisen
// app.get('/', async (req, res, next) => {
//   try {
//     const data = await fs.promises.readFile(path.resolve(__dirname, 'pokemon.json'), 'utf8');
//     const pokedata = JSON.parse(data);
//     res.render('index', { pokemons: pokedata });
//   } catch (err) {
//     next(err);
//   }
// });




// Pfad für die jeweilige Karten URL die auf der Rootseite getippt wird
app.get('/pokemons/:name', async (req, res) => {
  
  const name = req.params.name;
  
  try {
    // Verbindung zur MongoDB herstellen
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Alle Dokumente in der Sammlung abfragen
    const pokemons = await collection.find({}).toArray();

    // Antwort senden
    // Hier finden Sie das entsprechende Pokémon anhand seines Namens
    const pokemon = pokemons.find(pokemon => pokemon.Name === name);
    // hier wird der derzeitige Index als varibale gespeichert
    const currentIndex = pokemons.findIndex(p => p.Name === name);
  
    const nextIndex = (currentIndex + 1) % pokemons.length;
    const nextPokemon = pokemons[nextIndex];
    const nextPokemonName = nextPokemon.Name;


    const previousIndex = (currentIndex - 1 + pokemons.length) % pokemons.length;
    const prevPokemon = pokemons[previousIndex];
    const previousPokemonName = prevPokemon.Name;
  
    // Dann geben Sie die Daten an Ihre Pug-Datei weiter
    res.render('pokemonDetail', { pokemon, nextPokemonName, previousPokemonName });

    // Verbindung zur MongoDB schließen
    client.close();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Fehler beim Abrufen der Daten' });
  }
});
 





app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});


