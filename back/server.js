/**********************************************/
/**************** Import des modules necessaires ****************/

const express = require("express");
const cors = require("cors");

/*****************************/
/******** Import de la conection à la DB */

let DB = require("./app.js");
/************************************************/
/***************** Initialisation de l' API *****************/

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*******************************************************************/
/************************ Mis en place du routage *****************/

app.get("/", (req, res) => res.send("Je suis  online!!!!!"));

app.get("*", (req, res) => res.status(501).send("Mauvaise recherche"));

/*************************************************************/
/******************************* Start du serveur  ***********/

    app.listen(process.env.SERVER_PORT, () => {
      console.log(`Le serveur marche sur le port ${process.env.SERVER_PORT || '3000'}`);
    });

