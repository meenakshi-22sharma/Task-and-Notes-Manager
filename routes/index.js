const express= require('express').Router()


const route = express()
const taskController = require('../controller/taskController')
const notesController = require('../controller/notesController')

  
//list all tasks in array
route.get('/tasks',taskController.listAll)
//add a new todo
route.post('/tasks',taskController.addNew)
//details of todo with requested id 
route.get('/tasks/:id',taskController.details)
//update details of todo with requested id
route.patch('/tasks/:id', taskController.updateDetails)
//get list of all notes under todo with requested id
route.get('/tasks/:id/notes', notesController.getAll)
//add a new note under todo with given id 
route.post('/tasks/:id/notes', notesController.addNewNote)




exports =module.exports = {
  route
}