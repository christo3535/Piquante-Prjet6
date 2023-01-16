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
  delete sauceObject._userId       //voir s'il ne faut pas ecrire ._userId
  const laSauce = new Sauce ({
      ...sauceObject,
      userId: req.auth.userId,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  laSauce.save()
    .then(() => res.status(201).json({message: "Sauce crée !"}))
    .catch(err => res.status(500).json({message: 'Le serveur ne marche pas', error: err}))
}

exports.updateSauce = (req,res) => {
  const laSauce = req.file ? {
     ...JSON.parse(req.body.sauce),
     image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body};

  delete laSauce._userId;
  Sauce.findOne({_id: req.params.id})
    .then((sauce) => {
      if(sauce.userId != req.auth.userId){
        res.status(401).json({message: 'Vous ne pouvez pas modifier cette sauce'})
      }else{
        Sauce.updateOne({_id: req.params.id},{ ...laSauce, _id: req.params.id})
        .then(() => res.status(200).json({message: 'Sauce update'}))
        .catch(err => res.status(401).json({message: 'ERROR',error: err}))
      }
    })
    .catch(err => res.status(500).json({message:'Error', error: err}))



}

exports.deleteSauce = (req,res)  => {

}

exports.likeSauces  = (req,res)  => {

}