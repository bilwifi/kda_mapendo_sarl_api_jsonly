const moongose = require('mongoose');

const EmployeesSchema = new moongose.Schema({
  // nom, prenom, email, age, poste, numéro de téléphone, statut marital et pays d'origine
  clientKey: {
    type: String,
    required: true
  },
  nom: {
    type: String,
    required: true
  },
  prenom: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  dateNaissance: {
    type: String,
    required: false
  },
  poste: {
    type: String,
    required: true
  },
  numeroTelephone: {
    type: [String],
    required: true
  },
  estMarie: {
    type: Boolean,
    required: true
  },
  pays: {
    type: String,
    required: true
  }
});

const Employee = moongose.model('Employee', EmployeesSchema);
module.exports = Employee;
