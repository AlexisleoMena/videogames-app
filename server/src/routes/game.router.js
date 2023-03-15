const { Router } = require("express");
const { getGames, getGameById, addGame } = require("../controllers/game.controller");

const router = Router();

http://localhost:3001/games or http://localhost:3001/games?name=NAME
router.get( "/", getGames)

http://localhost:3001/games/:id
router.get( "/:id", getGameById)

router.post( "/", addGame)

module.exports = router;