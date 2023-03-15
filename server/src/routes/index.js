const { Router } = require('express');
const gamesRouter = require("./game.router.js");
const genresRoutes = require("./genre.router.js");

const router = Router();
router.use( "/games", gamesRouter );
router.use( "/genres", genresRoutes );

module.exports = router;
