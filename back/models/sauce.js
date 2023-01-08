/************************************************/
/******** Import des modules nécessaires *******/

const mongoose = require('mongoose')

const DB = require('../app')

/********************************************/
/******** Definition du modèle Sauce *******/

const modelSauceShema = mongoose.Schema({
    userID: { type: String, require: true},
    name: { type:String, require: true},
    manufacturer: { type:String, require: true},
    description: { type:String, require: true},
    mainPepper: { type:String, require: true},
    imageUrl: { type: String, require: true},
    heat: { type: Number, require: true},
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    userLiked: { type: [String]},
    userDisliked: { type: [String]},
},{paranoid: true})




module.exports = mongoose.model('Sauce',modelSauceShema)