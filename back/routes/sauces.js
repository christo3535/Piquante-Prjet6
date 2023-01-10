/***************************************************************/
/********************** Import des modules necessaires **********/

const express = require('express')
const multer = require('multer')

/**********************************************************/
/********************** Récupération du router d'express */
const router = require('./users')


/************************************************************/
/********************** Routage de la ressource Sauce *********/

router.get('',saucesCtrl.getAllsSauces)

router.get('/:id',saucesCtrl.getSauce)

router.post('',multer, saucesCtrl.addSauce)

router.put('/:id',multer, saucesCtrl.updateSauce)

router.delete('/:id',saucesCtrl.deleteSauce)

router.post('/:id/like',saucesCtrl.likeSauces)