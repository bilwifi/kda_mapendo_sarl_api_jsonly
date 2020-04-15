const express = require('express');
const {Employee,validate} = require('../models/employee');
const User = require('../models/user.js');
const _=require('lodash');

const router = express.Router();

router.get('/', async ({ query }, res) => {
  const clientKey = query.api_key;
  try {
    const user = await User.findOne({ clientKey });
    if (user) {
      try {
        const employees = await Employee.find({ clientKey });
        if (employees) {
          return res.send(employees);
        } else {
          return res.send('Employés non trouvé').status(404);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json(
        {message:"Vous n'êtes pas autorisé à acceder à la ressource demandé",code:'API_KEY_ERROR'}
      ).status(400);
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async ({ query, params }, res) => {
  const clientKey = query.api_key;
  const user=await User.findOne({clientKey});
  if(!user)return res
             .status(400)
             .send({
               message:
                 "Vous n'êtes pas autorisé à acceder à la ressource demandé",
               code: 'API_KEY_ERROR',
             });
  try {
    const employee = await Employee.findOne({
      clientKey,
      _id: params.id
    });
    if (employee) {
      return res.send(employee);
    } else {
      return res.send('Employé non trouvé').status(404);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async (req, res) => {
  const clientKey = req.query.api_key;
  const body = req.body;
  const {error}=validate(body);
   const user = await User.findOne({ clientKey });
   if (!user)
     return res.status(400).send({
       message: "Vous n'êtes pas autorisé à acceder à la ressource demandé",
       code: 'API_KEY_ERROR',
     });
  if(error) return res.status(400).send(error.details[0].message)
  
  body.clientKey=clientKey;
  const employee=new Employee(body);
  try {
    await employee.save();
    const result = _.pick(employee, [
      'nom',
      'prenom',
      'email',
      'dateNaissance',
      'poste',
      'numerTelephone',
      'estMarie',
      'pays',
    ]);
    return res.send({ message: 'Ok', result });
  } catch (error) {
    console.log(error)
  }
  
});

router.put('/:id', async (req, res) => {
   const clientKey = req.query.api_key;
   const body = req.body;
    const user = await User.findOne({ clientKey });
    if (!user)
      return res.status(400).send({
        message: "Vous n'êtes pas autorisé à acceder à la ressource demandé",
        code: 'API_KEY_ERROR',
      });
   const { error } = validate(body);
   if (error) return res.status(400).send(error.details[0].message);

   body.clientKey = clientKey;
   const employee = await Employee.findByIdAndUpdate(req.params.id,body);
   if(!employee) return res.status(400).send('Employé non trouvé')
   const result = _.pick(employee, [
       'nom',
       'prenom',
       'email',
       'dateNaissance',
       'poste',
       'numerTelephone',
       'estMarie',
       'pays',
     ]);
     return res.send(result);
});

router.delete('/:id', async (req, res) => {
  const clientKey = req.query.api_key;
   const user = await User.findOne({ clientKey });
   if (!user)
     return res.status(400).send({
       message: "Vous n'êtes pas autorisé à acceder à la ressource demandé",
       code: 'API_KEY_ERROR',
     });
    const employee = await Employee.findOneAndRemove({
      clientKey,
      _id: req.params.id,
    });
   if(!employee) return res.status(404).send('L\'employée que vous essayer de supprimer est introuvable');
   return res.send({ message: 'ok', result: employee });
});

module.exports = router;
