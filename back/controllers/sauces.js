/************************************************************************/
/************************** Import des modules nécessaires **************/

const Sauce = require('../models/sauce')



/*********************************************************************************/
/*************************** Routage de la ressource Sauce */
exports.getAllSauces = (req,res)  => {
  Sauce.find()
    .then((sauces) => res.status(200).json({data: sauces}))
    .catch(err => res.status(500).json({message: "Database error",error: err}))
}

exports.getSauce = (req,res)  => {
  Sauce.findOne({where: {_id:req.params.id}, raw: true})
    .then(sauce => res.status(200).json({data: sauce}))
    .catch(err => res.status(404).json({message: "La sauce n'existe pas", error: err}))
}

exports.addSauce = (req,res) =>{
  const sauceObject = JSON.parse(req.body.sauce)
  delete sauceObject._id
  delete sauceObject.userId       //voir s'il ne faut pas ecrire ._userId
  const lasauce = new Sauce ({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  lasauce.save()
    .then(() => res.status(201).json({message: "Sauce crée !"}))
    .catch(err => res.status(500).json({message: 'Le serveur ne marche pas', erro: err}))


}

exports.updateSauce = () => {


}

exports.deleteSauce = ()  => {

}

exports.likeSauces  = ()  => {

}