

/******************************************************************************/
/*************************** Importation des modules nécessaires **************/
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");


/**************************************************************************/
/********************** Enregistrement des nouveaux utilisateurs **********/

exports.signup = (req, res) => {
  
  bcrypt
    .hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
    
      user
        .save()
        .then((user) =>
          res.status(201).json({ message: "Utilisateur crée !", data: user })
        )
        .catch((err) =>
          res
            .status(409)
            .json({ message: "L'adresse mail existe déja !", error: err })
        );
    })
    .catch((err) => res.status(500).json({ message: "Error", error: err }));
};

exports.login = (req, res) => {
  User.findOne( { email: req.body.email })
    .then((user) => {
      //verification si l'utilisateur existe
      if (user === null) {
        return res
          .status(401)
          .json({ message: "Identient ou mot de passe incorect" });
      }
      //Verification de mot de passe
      bcrypt
        .compare(req.body.password, user.password)
        .then((test) => {
          if (!test) {
            return res.status(401).json({ message: "Mot de passe incorect" });
          }
         return res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: process.env.JWT_DURING,
            }),
          });
        })
        .catch((err) => res.status(500).json({ message: "ERROR", error: err }));
      
    })
    .catch((err) =>
      res.status(500).json({ message: "Database Error", error: err })
    );
};