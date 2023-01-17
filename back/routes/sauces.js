/***************************************************************/
/********************** Import des modules necessaires **********/

const express = require("express");

const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

const saucesCtrl = require("../controllers/sauces");

/**********************************************************/
/********************** Récupération du router d'express */
const router = express.Router();

/************************************************************/
/********************** Routage de la ressource Sauce *********/

router.get("", auth, saucesCtrl.getAllSauces);

router.get("/:id", auth, saucesCtrl.getSauce);

router.post("", auth, multer, saucesCtrl.addSauce);

router.put("/:id", auth, multer, saucesCtrl.updateSauce);

router.delete("/:id", auth, saucesCtrl.deleteSauce);

router.post("/:id/like", auth, saucesCtrl.likeSauces);

module.exports = router;
