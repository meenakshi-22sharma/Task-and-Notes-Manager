const Notes = require('../db').Notes;

function getAll(req, res) {
    const taskId = parseInt(req.params.id);
    Notes.findAll({
        where: {
          taskId: taskId
        }
    })
    .then((notes) => res.send(notes))
    .catch((err) => {
      console.log('There was an error querying tasks', JSON.stringify(err))
      return res.send(err)
    });
}

function addNewNote(req, res) {
    const taskId = parseInt(req.params.id);
    Notes.create({
        Note: req.body.note,
        taskId: taskId,
    }).then((note) => {
        res.status(201).send(note);
    }).catch((err)=>{
        res.status(501).send({
            error:"Could not add new note to task"
        })
    });
}
module.exports = {
    getAll,
    addNewNote
}