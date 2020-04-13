const route = require('express')

let todos = [
    { task: 'Learn NodeJS', done: false, due: '2020-04-05' },
    { task: 'Learn SQL', done: false, due: '2020-04-06' },
    { task: 'Learn HTML and CSS', done: true, due: '2020-04-01' }
  ]
  
route.use('/', express.static(__dirname + '/public'))
  
route.get('/tasks/:id', function (req, res) {

})
route.patch('/tasks/:id', function (req, res) {

})
route.get('/tasks/:id/notes', function (req, res) {

})
route.post('/tasks/:id/notes', function (req, res) {

})


module.exports = route;