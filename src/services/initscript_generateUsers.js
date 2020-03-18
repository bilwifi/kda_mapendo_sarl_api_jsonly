const User = require('../models/UserModel');
require('./DBinit');
const letters = 'a b c d e f g h i j k l m n o p q r s t u v w x y z'.split(
  ' '
);

const usedCombinaisons = [];
const generatedKeysList = [];
const numberOfLetters = 7;

for (let i = 0; i <= 20; i++) {
  let generatedKey = '';
  do {
    generatedKey = '';
    for (let j = 0; j < numberOfLetters; j++) {
      const randomKey = Math.floor(Math.random() * letters.length);
      generatedKey += letters[randomKey];
    }
    if (!usedCombinaisons.includes(generatedKey)) {
      const user = new User({ clientKey: generatedKey });
      if (user.save()) {
        console.log(true);
      } else {
        console.log("Erreur lors de l'enregistrement");
      }
      usedCombinaisons.push(generatedKey);
      generatedKeysList.push(generatedKey);
    }
  } while (!usedCombinaisons.includes(generatedKey));
}
