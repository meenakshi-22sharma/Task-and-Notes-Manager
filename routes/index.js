const router= require('express').Router()
const taskController = require('../controller/taskController')
const notesController = require('../controller/notesController')

  
//list all tasks in array
router.get('/tasks',taskController.listAll)
//add a new todo
router.post('/tasks',taskController.addNew)
//details of todo with requested id 
router.get('/tasks/:id',taskController.details)
//update details of todo with requested id
router.patch('/tasks/:id', taskController.updateDetails)
//get list of all notes under todo with requested id
router.get('/tasks/:id/notes', notesController.getAll)
//add a new note under todo with given id 
router.post('/tasks/:id/notes', notesController.addNewNote)




exports =module.exports = {
  router
}