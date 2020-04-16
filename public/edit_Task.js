/*-----------Sending edited task form data back to database for edit-----------------*/

function edit_task_success(Id){
   

    $('#editTask').click(function () {
        let id = Id;
        let dueDate = $('#inputDueDate')
    
        let priority = $('#selectPriority')
        let status = $("input[type='radio'][name='optradio']:checked").val();

        editTask(
                id,
                dueDate.val(),
                status,
                priority.val()),
            function (editTask) {
               
                window.alert("Edited" + Id + "  to Database")
            }
    })
 
}


/* ----------------Retrieve data from database and put values over the form to let user edit them---------------*/
function putDataOnForm(data){
    $('#titleInput').val(data.Title)
     $('#description').val(data.Description)
     console.log(data.Id)
     let DATE = data.Due_Date;
     let formatedDate = DATE.substr(0,DATE.indexOf("T"));
     $('#inputDueDate').val(formatedDate)
     $('#selectPriority').val(data.Priority)
     $("input[name='optradio']").val(data.Status);



        edit_task_success(data.Id);
   
}


/*-----------------Request to get the data of task that is requested for editing -----------------------*/
function putDataForEdit(task_id) {

  console.log('http://localhost:4567/tasks/'+task_id)

    var dataToEdit =  $.ajax({
        type: 'GET',
        url: 'http://localhost:4567/tasks/'+task_id,

        contentType: 'application/json',
     
       success: function(data){
           console.log(data)
           putDataOnForm(data)
       }
     });


}

/*----------------Get the id of clicked task card-------------------*/

function editButton(e) {
    var parent_id = $(e).parent().parent();
    console.log(parent_id)
    var childID = $(parent_id).children('.card-footer');
    var taskId = $(childID).children('.text-muted').text();
    console.log(taskId)
    $('#createNewTask').hide();
    $('#editTask').show();
    $('#statusButton').show();

    putDataForEdit(taskId);
}