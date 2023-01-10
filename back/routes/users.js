/*****************************************************************************/
/****************** Import des modules necessaires ***************************/
const userCtrl = require("../controllers/users")

const express = require('express')

/************************************************************************/
/******************* Récuperation du routeur d'express *****************/
const router = express.Router()


/*********************************************************************/
/***************** Routage de la ressource User **********************/

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router