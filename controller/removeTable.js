const Task = require('../db').Tasks


Task.destroy({
  where: {},
  truncate: true
})