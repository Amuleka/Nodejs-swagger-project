const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

 // Clients Collection Functions
 const getAllClients =  (req, res) => {
  mongodb
  .getDB()
  .db('new-project')
  .collection('clients')
  .find()
  .toArray((err, lists) => {
   if (err) {
     res.status(400).json({message: err});
   }
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(lists);
  });
 };
 
 const getSingleClient =  (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
     res.status(400).json('Must use a valid contact id to find a contact. ');
   }
   const userId = new ObjectId(req.params.id);
   mongodb
   .getDB()
   .db('new-project')
   .collection('clients')
   .find({_id: userId})
   .toArray((err, result) => {
    if (err) {
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result[0]);
   });
  };
 
 const createNewClient = async (req, res) => {
   const contact = {
    clientName: req.body.clientName,
    clientCity: req.body.clientCity,
    userInCharge: req.body.userInCharge,
    yearsWithTheCompany: req.body.yearsWithTheCompany

   };
   const response = await mongodb.getDB().db('new-project').collection('clients').insertOne(contact);
   if (response.acknowledged) {
     res.status(201).json(response);
   } else {
     res.status(500).json(response.error || 'Some error occurred while creating the contact.');
   }
 };
 
 const updateExistingClient = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
     res.status(400).json('Must use a valid contact id to update a contact. ');
   }
   const userId = new ObjectId(req.params.id);
   // be aware of updateOne if you only want to update specific fields
   const contact = {
    clientName: req.body.clientName,
    clientCity: req.body.clientCity,
    userInCharge: req.body.userInCharge,
    yearsWithTheCompany: req.body.yearsWithTheCompany

   };
   const response = await mongodb
     .getDB()
     .db('new-project')
     .collection('clients')
     .replaceOne({ _id: userId }, contact);
   console.log(response);
   if (response.modifiedCount > 0) {
     res.status(204).send();
   } else {
     res.status(500).json(response.error || 'Some error occurred while updating the contact.');
   }
 };
 
 const deleteSomeClient = async (req, res) => {
   if (!ObjectId.isValid(req.params.id)) {
     res.status(400).json('Must use a valid contact id to delete a contact. ');
   }
   const userId = new ObjectId(req.params.id);
   const response = await mongodb.getDB().db('new-project').collection('clients').deleteOne({ _id: userId }, true);
   console.log(response);
   if (response.deletedCount > 0) {
     res.status(204).send();
   } else {
     res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
   }
 };

 module.exports = {
  getAllClients, getSingleClient, createNewClient, updateExistingClient, deleteSomeClient
 }