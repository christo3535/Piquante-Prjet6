
/*****************************/
/***************** Import des modules necessaires */

const mongoose  = require('mongoose');


/*******************************************/
/**************** Conection à la base des donées */


 mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));



  const db = mongoose.conect

  module.exports = mongoose


  
  


