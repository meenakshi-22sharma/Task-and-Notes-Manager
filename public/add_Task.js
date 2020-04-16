$(function(){
    let taskTitle = $('#titleInput')
    let taskDesc= $('#description')
    let dueDate = $('#inputDueDate')
    
    let priority= $('#selectPriority')
    let status = "Incomplete"
   
    $('#createNewTask').click(function(){
        addTask(taskTitle.val(), 
                taskDesc.val(),
                dueDate.val(),
                priority.val()),
                function(addTask){
                    window.alert("Added" + addTask.taskTitle+"  to Database")
                }
    })
})