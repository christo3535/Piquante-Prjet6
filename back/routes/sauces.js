/***************************************************************/
/********************** Import des modules necessaires **********/



const express = require('express')
const multer = require('multer')

const saucesCtrl = require('../controllers/sauces')

/**********************************************************/
/********************** Récupération du router d'express */
const router = express.Router()


/************************************************************/
/********************** Routage de la ressource Sauce *********/

router.get('',saucesCtrl.getAllSauces)

router.get('/:id',saucesCtrl.getSauce)

router.post('',multer, saucesCtrl.addSauce)

router.put('/:id',multer, saucesCtrl.updateSauce)

router.delete('/:id',saucesCtrl.deleteSauce)

router.post('/:id/like',saucesCtrl.likeSauces)


module.exports = router