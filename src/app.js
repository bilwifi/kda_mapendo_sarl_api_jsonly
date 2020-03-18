const express = require('express');
require('./services/DBinit');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use('/api/employers', require('./routes/employees'));

const PORT = 4000 || process.env.PORT;

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});