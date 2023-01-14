// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const User = require('../models/accounts');

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_SALT_ROUND))
//       .then(hash => {
//         const user = new User({
//           email: req.body.email,
//           password: hash
//         });
//         user.save()
//           .then(() => res.status(201).json({ message: 'New user !' }))
//           .catch(error => res.status(400).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
// };
