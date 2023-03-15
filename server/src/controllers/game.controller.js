const axios = require("axios");
const { validate } = require("uuid");
const { Game, Genre } = require("../db.js");
const { apiKey } = require("../utils/config/index.js");
const { GAMES_URL } = require("../utils/constants.utility.js");
const { v4: uuidv4 } = require("uuid");


async function APIsGames() {
  const wantedPages = 5;
  let games = [];
  for (let i = 1; i <= wantedPages; i++) {
    let { data: { results } } = await axios(`${GAMES_URL}?key=${apiKey}&page=${i}`);
    let dataRequired = results.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      genres: game.genres?.map(({ name }) => name),
      rating: game.rating,
      platforms: game.platforms?.map(({ platform: {name}}) => name),
      createdInDB: false,
    }));
    games = [...games, ...dataRequired ]
  }
  return games;
}

async function APIsGameById(id) {
  let { data: game } = await axios(`${GAMES_URL}/${id}?key=${apiKey}`);
  return {
    name: game.name,
    description: game.description,
    released: game.released,
    rating: game.rating,
    platforms: game.platforms?.map(({ platform: { name } }) => name),
    image: game.background_image,
    createdInDB: false,
    genres: game.genres?.map(({ name }) => name),
  };
}

async function DataBasesGames() {
  let games = await Game.findAll({ include: { model: Genre, as: "genres" }});
  return !games.length 
    ? games
    : games.map(({ dataValues }) => ({
      id: dataValues.id,
      name: dataValues.name,
      description: dataValues.description,
      released: dataValues.released,
      rating: dataValues.rating,
      platforms: dataValues.platforms,
      image: dataValues.image,
      createdInDB: dataValues.createdInDB,
      genres: dataValues.genres?.map(({ dataValues }) => dataValues.name),
    }));
}

async function allData() {
  const APIsData = await APIsGames();
  const DataBasesData = await DataBasesGames();
  return APIsData.concat(DataBasesData);
}

async function getGames(req, res) {
  let { name } = req.query;
  try {
    const allGames = await allData();
    if(name != undefined) {
      if(!name.length) return res.send([])
      name = name.toLowerCase();
      let response = allGames.filter((game) => {
        let reg = new RegExp(name,"g");
        return game.name.toLowerCase().match(reg)
      })
      return res.send(response)
    }
    res.send(allGames);
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function getGameById(req, res) {
  let id = req.params.id;
  if (validate(id)) {
    try {
      const game = await Game.findByPk(id, { include: { model: Genre, as: "genres" }});
      if (!game) return res.status(404).json({ msg: "Request failed with status code 404"});
      return res.json(game);
    } catch (error) {
      res.status(500).json({ msg: error.message })
    }
  }
  try {
    let game = await APIsGameById(id);
    res.send(game);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
}

function validateBodyParams( body ) {
  const { name, description, platforms } = body;
  if(!name || !description || !platforms || !Array.isArray(platforms)) return false;
  return true;
}

async function addGame(req, res) {
  if(!validateBodyParams(req.body)) return res.status(400).json({ msg: "Missing or invalid data!" })
  let id = uuidv4();
  try {
    let newGame = await Game.create({ ...req.body, id });
    let genresInDB = await Genre.findAll({ where: { name: req.body.genres } });
    await newGame.addGenre(genresInDB);
    res.status(201).json({ msg: "Game added successfully!" });
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

async function deleteGame(req, res) {
  try {
    let deletedRows = await Game.destroy({ where: { id: req.params.id } });
    if(deletedRows) return res.status(204).json({ msg: "Game deleted successfully!" });
    res.status(404).json({ msg: "There is not Game with that id!"})
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  getGames,
  getGameById,
  addGame,
  deleteGame
};
