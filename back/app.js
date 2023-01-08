
/*****************************/
/***************** Import des modules necessaires */

const mongoose  = require('mongoose');


/*******************************************/
/**************** Conection à la base des donées */


 mongoose.connect('mongodb+srv://christo3535:1105soliste@cluster1.w9e2c31.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  module.exports = mongoose


  
  


