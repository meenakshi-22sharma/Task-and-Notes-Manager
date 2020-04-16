$(function () {

    let taskList = $('#tasks')
    fetchTasks(function (tasks) {
        taskList.empty()
        for (task of tasks) {
            taskList.append(createTaskCard(task))
        }
    })
})