/*********************************/
/******************* Import des modules necessaires **********************/

const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')


/******************************/
/*****************   Definition du modèle User **********************/

const modelUserShema = mongoose.Schema({
    email: { type: String, require: true, unique: true},//configuration unique: true , empeche plusieurs users de s'inscrire avec le même email
    password: { type: String, require: true},
}) 
//des users ne peuvent pas partager le même email
modelUserShema.plugin(uniqueValidator)

module.exports = mongoose.model('User', modelUserShema)