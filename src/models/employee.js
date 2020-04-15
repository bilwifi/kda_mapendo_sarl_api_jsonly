const moongose = require('mongoose');
const Joi=require('joi');

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

function validateEmployee(employee){
  const schema = {
    nom: Joi.string()
      .min(2)
      .max(50)
      .required()
      .label('Le nom ne doit pas être vide ou avoir < 2 caractères'),
    prenom: Joi.string()
      .min(2)
      .max(50)
      .required()
      .label('Le prenom ne doit pas être vide ou avoir < 2 caractères'),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .label("L'adresse mail est invalid"),
    numeroTelephone: Joi.array().items(
      Joi.string().length(13).label('Numéro(s) de téléphone non valide')
    ),
    dateNaissance: Joi.date().label(
      'Le champs date de naissance contient un format invalid'
    ),
    poste: Joi.string().required('Le poste ne peut pas être vide'),
    estMarie:Joi.string().required().label('L\'etat marital ne peut pas être vide'),
    pays:Joi.string().required().label('Le pays ne peut pas être vide')
  };

  return Joi.validate(employee,schema);
}

const Employee = moongose.model('Employee', EmployeesSchema);
exports.Employee = Employee;
exports.validate = validateEmployee;

