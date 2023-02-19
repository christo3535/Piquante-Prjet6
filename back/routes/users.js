
/*****************************************************************************/
/****************** Import des modules necessaires ***************************/
const express = require('express')

const userCtrl = require("../controllers/users")


/************************************************************************/
/******************* Récuperation du routeur d'express *****************/
const router = express.Router()


/*********************************************************************/
/***************** Routage de la ressource User **********************/

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router

