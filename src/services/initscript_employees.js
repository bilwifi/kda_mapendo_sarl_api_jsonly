const User = require('../models/UserModel');
const Employee = require('../models/EmployeeModel');
require('./DBinit');

const employees = [
  {
    nom: 'Lisangola',
    prenom: 'Christian',
    email: '',
    poste: 'Homme de ménage',
    numeroTelephone: ['+243908888888'],
    estMarie: false,
    pays: 'RDCongo'
  },
  {
    nom: 'Motoba',
    prenom: 'Claude',
    email: 'claude@gmail.com',
    poste: 'Architecte infrastructures',
    numeroTelephone: ['+243818885454', '+243844457484'],
    estMarie: true,
    pays: 'Liban'
  },
  {
    nom: 'Nyembo',
    prenom: 'Thesy',
    email: 'thesy.nyembo@gmail.com',
    poste: 'DevOPS & Développeuse Fullstack',
    numeroTelephone: ['+2438108488888', '+243844145444'],
    estMarie: false,
    pays: 'Djibouti'
  },
  {
    nom: 'Gael',
    prenom: 'Mapwata',
    email: 'mapwata.gael@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+243818897188', '+243844445744'],
    estMarie: true,
    pays: 'Inde'
  },
  {
    nom: 'Makengo',
    prenom: 'Stanislas',
    email: 'makengo.stanislas@gmail.com',
    poste: 'Chef de projet digital',
    numeroTelephone: ['+243814428888', '+243844446734'],
    estMarie: true,
    pays: 'Algérie'
  },
  {
    nom: 'Ndovia',
    prenom: 'Ruth',
    email: 'ruth.ndovia@gmail.com',
    poste: 'Administrateur systèmes & Réseaux',
    numeroTelephone: ['+24381458888', '+243844434444'],
    estMarie: false,
    pays: 'RDCongo'
  },
  {
    nom: 'Bondjali',
    prenom: 'Chris',
    email: '',
    poste: 'Cordonier',
    numeroTelephone: ['+24390999898'],
    estMarie: true,
    pays: 'RDCongo'
  }
];

(async function() {
  let users = null;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  const usersTokenArray = users.map(user => user.clientKey);
  for (let userToken of usersTokenArray) {
    for (let emp of employees) {
      const {
        nom,
        prenom,
        email,
        poste,
        numeroTelephone,
        estMarie,
        pays
      } = emp;
      const employee = new Employee({
        clientKey: userToken,
        nom,
        prenom,
        estMarie,
        pays,
        numeroTelephone,
        email,
        poste
      });
      await employee.save();
    }
  }
})();
