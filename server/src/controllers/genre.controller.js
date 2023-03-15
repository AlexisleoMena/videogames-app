const axios = require("axios");
const { Genre } = require("../db.js");
const { apiKey } = require("../utils/config/index.js");
const { GENRES_URL } = require("../utils/constants.utility.js");


async function APIsGenres() {
  let { data: { results } } = await axios(`${GENRES_URL}?key=${apiKey}`);
  return results.map( ({name}) => ({name}) );
}

async function getGenres(req, res) {
  try {
    let genresInDB = await Genre.findAll();
    if(!genresInDB.length) {
      let genres = await APIsGenres();
      await Genre.bulkCreate(genres);
      genresInDB = await Genre.findAll();
    }
    genresInDB = genresInDB.map( ({dataValues}) => dataValues.name );
    res.status(200).json(genresInDB.sort())
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  getGenres
};
