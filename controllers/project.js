const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Projects Collection Functions
const getAllProjects =  (req, res) => {
 mongodb
 .getDB()
 .db('new-project')
 .collection('projects')
 .find()
 .toArray((err, lists) => {
  if (err) {
    res.status(400).json({message: err});
  }
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(lists);
 });
};

const getSingleProject =  (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to find a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  mongodb
  .getDB()
  .db('new-project')
  .collection('projects')
  .find({_id: userId})
  .toArray((err, result) => {
   if (err) {
     res.status(400).json({message: err});
   }
   res.setHeader('Content-Type', 'application/json');
   res.status(200).json(result[0]);
  });
 };

const createNewProject = async (req, res) => {
  const contact = {
    projectName: req.body.projectName,
    projectUser: req.body.projectUser,
    projectDueDate: req.body.projectDueDate,
    projectCompany: req.body.projectCompany,
    projectTeamMembers: req.body.projectTeamMembers,
  };
  const response = await mongodb.getDB().db('new-project').collection('projects').insertOne(contact);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the contact.');
  }
};

const updateExistingProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to update a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const contact = {
    projectName: req.body.projectName,
    projectUser: req.body.projectUser,
    projectDueDate: req.body.projectDueDate,
    projectCompany: req.body.projectCompany,
    projectTeamMembers: req.body.projectTeamMembers,
  };
  const response = await mongodb
    .getDB()
    .db('new-project')
    .collection('projects')
    .replaceOne({ _id: userId }, contact);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteSomeProject = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid contact id to delete a contact. ');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDB().db('new-project').collection('projects').deleteOne({ _id: userId }, true);
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};
 

module.exports = { getAllProjects, getSingleProject, createNewProject, updateExistingProject, deleteSomeProject};
