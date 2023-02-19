/****************************************************/
/************** Import des modules nécessaires ******/

const multer = require('multer')

/***************************************************/
/************* Creation du multer *****************/

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/bmp': 'bmp',
    'image/webp': 'webp'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    //Modification du nom du fichier
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extention = MIME_TYPES[file.mimetype];
        //timestamp Date.now pour avoir un fichier unique
        callback(null, name + Date.now() + '.' + extention);
    }
})

module.exports = multer({storage}).single('image');