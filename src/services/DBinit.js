const mongoose = require('mongoose');
const CONFIG = require('../config/keys');
let MONGO_URL;
if (process.env.NODE_ENV === 'production') {
  const { MONGO_DBNAME, MONGO_PASSWORD, MONGO_USER, MONGO_URL } = CONFIG;
  MONGO_URL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}/${MONGO_DBNAME}`;
} else {
  const { MONGO_DBNAME } = CONFIG;
  MONGO_URL = `mongodb://localhost/${MONGO_DBNAME}`;
}

mongoose
  .connect(MONGO_URL, { useNewUrlParser: false, useUnifiedTopology: false })
  .then(() => console.log('La connexio à base de données MongoDB est établie'))
  .catch(err =>
    console.log(
      `Erreur lors de la connexion à la base de données à de \n${err}`
    )
  );

module.exports = mongoose;
