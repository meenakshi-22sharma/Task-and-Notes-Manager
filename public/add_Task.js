$(function(){
    let taskTitle = $('#titleInput')
    let taskDesc= $('#description')
    let dueDate = $('#inputDueDate')
    
    let priority= $('#selectPriority')
    let status = $("input[name='optradio']:checked").val();
   
    $('#createNewTask').click(function(){
        addTask(taskTitle.val(), 
                taskDesc.val(),
                dueDate.val(),
                status,
                priority.val()),
                function(addTask){
                    window.alert("Added" + addTask.taskTitle+"  to Database")
                }
    })
})