const Task = require('../db').Tasks


function listAll(req, res) {
    Task.findAll()
        .then((task) => res.send(task))
        .catch((err) => {
            console.log('There was an error querying tasks', JSON.stringify(err))
            return res.send(err)
        });
}

function addNew(req, res) {
    Task.create({
        Title: req.body.title,
        Description: req.body.description,
        Due_Date: req.body.dueDate,
        Status: req.body.status,
        Priority: req.body.priority
    }).then((task) => {
        res.status(201).send(task);
    }).catch((err) => {
        res.status(501).send({
            error: "Could not add new Task"
        })
    });
}

function details(req, res) {
    const taskId = parseInt(req.params.id);
    console.log(Task);
    Task.findByPk(taskId)
        .then((task) => {
            res.status(201).send(task);
        }).catch((err) => {
            res.status(501).send({
                error: `Could not get with id ${taskid}`
            })
        });
}

function updateDetails(req, res) {
    const taskId = parseInt(req.params.id);
    console.log(Task);
    Task.findByPk(taskId)
        .then((task) => {
            console.log(task);
            const {
                status,
                priority,
                title
            } = req.body;
            console.log(status, priority, title);
            return task.update({
                    Status: status,
                    Priority: priority,
                    Title: title
                })
                .then(() => res.send(task))
                .catch((err) => {
                    console.log('***Error updating task', JSON.stringify(err))
                    res.status(400).send(err)
                })
        }).catch((err) => {
            res.status(501).send({
                error: `Could not get task with id ${taskid} while updating details`
            })
        });
}

module.exports = {
    listAll,
    addNew,
    details,
    updateDetails,
}