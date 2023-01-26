/**********************************************/
/**************** Import des modules necessaires ****************/

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");



/************************************************/
/***************** Initialisation de l' API *****************/

const app = express();

app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE' , '0PTION'],
  allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/********************************************************************/
/***************** Import des modules du routage *******************/

const user_router = require("./routes/users");
const sauce_router = require("./routes/sauces");
const path = require("path");

require('dotenv').config()

/*******************************************************************/
/************************ Mis en place du routage *****************/

app.get("/", (req, res) => res.send("Je suis encore online!!!!!"));

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use("/api/auth", user_router);

app.use("/api/sauces", sauce_router);


app.all("*", (req, res) => res.status(501).send("Mauvaise recherche"));

/*************************************************************/
/******************************* Start du serveur  ***********/

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Le serveur marche sur le port ${process.env.SERVER_PORT || "3000"}`
      );
      console.log("Connexion à MongoDB réussie !");
    });
  })

  .catch(() => console.log("Connexion à MongoDB échouée !"));
