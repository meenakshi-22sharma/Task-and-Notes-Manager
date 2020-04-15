const Task = require('../db').Tasks


function listAll(req, res) {
  
}

function addNew(req, res) {
   Task.create({
       Title : req.body.title,
      Description : req.body.description,
      Due_Date : req.body.dueDate,
      Status : req.body.status,
      Priority: req.body.priority


   }).then((task)=>{
       res.status(201).send(task)
   }).catch((err)=>{
       res.status(501).send({
           error:"Could not add new user"
           
       })
   })
}

function details(req, res) {
    res.send("Hey")
}

function updateDetails(req, res) {
    res.send("Hey")
}

module.exports = {
    listAll,
    addNew,
    details,
    updateDetails,
}