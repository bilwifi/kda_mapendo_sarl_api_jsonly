const express = require('express');
const EmployeeModel = require('../models/EmployeeModel');
const UserModel = require('../models/UserModel');

const router = express.Router();

router.get('/', async ({ query }, res) => {
  const clientKey = query.client_key;
  try {
    const user = await UserModel.findOne({});
    if (user) {
      try {
        const employees = await EmployeeModel.find({ clientKey });
        if (employees) {
          return res.send(employees);
        } else {
          return res.send('Employé non trouvé').status(404);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.json(
        "Vous n'êtes pas autorisé à acceder à la ressource demandé"
      );
    }
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async ({ query, params }, res) => {
  const clientKey = query.client_key;
  try {
    const employee = await EmployeeModel.findOne({
      clientKey,
      _id: params.id
    });
    if (employee) {
      return res.send(employes);
    } else {
      return res.send('Employé non trouvé').status(404);
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/', async ({ query }, res) => {});

router.put('/:id', async ({ query }, res) => {});

router.delete('/:id', async ({ query }, res) => {});

module.exports = router;
