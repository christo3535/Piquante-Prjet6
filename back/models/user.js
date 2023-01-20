/*********************************/
/******************* Import des modules necessaires **********************/

const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')



/******************************/
/*****************   Definition du modèle User **********************/

const modelUserShema = mongoose.Schema({
    email: { type: String, require: true, unique: true},
    password: { type: String, require: true},
}) // pour le softDelete

modelUserShema.plugin(uniqueValidator)

module.exports = mongoose.model('User', modelUserShema)