/************************************************************************/
/************************** Import des modules nécessaires **************/

const Sauce = require("../models/sauce");
const fs = require("fs");
const jwt = require("jsonwebtoken");

/*********************************************************************************/
/*************************** Routage de la ressource Sauce ***********************/

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((Sauces) => res.status(200).json(Sauces))

    .catch((err) =>
      res.status(500).json({ message: "Database error", error: err })
    );
};

exports.getSauce = (req, res, next) => {
  console.log(req.params.id);


  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((err) =>
      res.status(404).json({ message: "La sauce n'existe pas", error: err })
    );
};

exports.addSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce); //parser la chaine de caractéres envoyer par le front
  delete sauceObject._id;
  delete sauceObject._userId;
  const laSauce = new Sauce({
    ...sauceObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${//{req.protocol}://${req.get("host")}/images/${req.file.filename} 
      req.file.filename
    }`,
    // likes: 0,
    // dislikes: 0,
    // usersLiked: [""],
    // usersDisliked: [""]
  });
  laSauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce crée !" }))
    .catch((err) =>
      res.status(500).json({ message: "Le serveur ne marche pas", error: err })
    );
};

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  delete sauceObject._userId;
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {// faut il ecrire userId or id?
        res
          .status(401)
          .json({ message: "Vous ne pouvez pas modifier cette sauce" });
      } else {
        Sauce.updateOne(
          { _id: req.params.id },
          { ...sauceObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Sauce update" }))
          .catch((err) =>
            res.status(401).json({ message: "ERROR", error: err })
          );
      }
    })
    .catch((err) => res.status(500).json({ message: "Error", error: err }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (sauce.userId != req.auth.userId) {//id or userId
        res.status(401).json({ message: "Action non autorisée !" });
      } else {
        const filename = sauce.imageUrl.split("/images")[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Sauce delete !" }))
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })

    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauces = (req, res, next) => {
  const likeOrDislike = req.body.like;
  const sauceId = req.params.id;
  const currentUser = req.body.userId;

  Sauce.findOne({ _id: sauceId }).then((sauceLiked) => {
    // console.log(sauceLiked);
    // console.log("sauceID");
    // console.log(typeof likeOrDislike);
    switch (likeOrDislike) {
      case 1:
        //verification si l'utilisateur a deja liké la sauce

        if (!sauceLiked.usersLiked.includes(currentUser)) {
          //usersLiked
          Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersLiked: currentUser }, $inc: { likes: +1 } }
          )
            .then(() => res.status(201).json({ message: "Sauce liké !" }))
            .catch(error => res.status(400).json({ error }));
        }
         //verification si l'utilisateur n'a pas deja disliké la sauce
          // if(sauceLiked.usersDisliked.includes(currentUser)){
          //   Sauce.updateOne(
          //     { _id: sauceId},
          //     { $pull: {usersDisliked: currentUser}, $inc: { like: -1}}
          //   )
          //   .then(() => res.status(200).json({message:'Sauce disliké'}))
          //   .catch(error => res.status(400).json({error}))
          // }
          else {
          res
            .status(409)
            .json({ message: "Vous avez deja liké cette sauce !" });
        }
        break;

      case 0:
        if (sauceLiked.usersLiked.includes(currentUser)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersLiked: currentUser }, $inc: { like: -1 } }
          )
            .then(() => res.status(200).json({ message: "Like rétiré" }))
            .catch((error) => res.status(400).json({ error }));
        }
        if (sauceLiked.usersDisliked.includes(currentUser)) {
          //usersDisliked
          Sauce.updateOne(
            { _id: sauceId },
            { $pull: { usersDisliked: currentUser }, $inc: { dislike: -1 } }
          )
            .then(() => res.status(200).json({ message: "Dislike retiré !" }))
            .catch((error) => res.status(400).json({ error }));
        }
        break;

        // case 0:
        //     Sauce.findOne({_id: sauceId})
        //         .then((sauce) => {
        //             if (sauce.usersLiked.includes(currentUser)) {
        //                 Sauce.updateOne({_id: sauceId}, {
        //                     $pull: {usersLiked: currentUser},
        //                     $inc: {likes: -1}
        //                 })
        //                     .then(() => res.status(200).json({message: 'Like removed'}))
        //                     .catch((error) => res.status(400).json({error}))
        //             }
        //             if (sauce.usersDisliked.includes(userId)) {
        //                 Sauce.updateOne({_id: sauceId}, {
        //                     $pull: {usersDisliked: currentUser},
        //                     $inc: {dislikes: -1}
        //                 })
        //                     .then(() => res.status(200).json({message: 'Dislike removed'}))
        //                     .catch((error) => res.status(400).json({error}))
        //             }
        //         })
        //         .catch((error) => res.status(404).json({error}))
        //     break;


      case -1:
        //verifie si l'utilisateur n'a pas déja duslike la sauce
        if (!sauceLiked.usersDisliked.includes(currentUser)) {
          Sauce.updateOne(
            { _id: sauceId },
            { $push: { usersDisliked: currentUser }, $inc: { dislike: +1 } }
          )
            .then(() => res.status(200).json({ message: "Sauce disliké !" }))
            .catch((error) => res.status(400).json({ error }));
        }
            else {
            res
            .status(409)
            .json({ message: "Vous avez déja disliké cette sauce" });
        }
        break;
    }
  });
};
