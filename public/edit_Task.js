function edit_task_success(Id){
   

    $('#editTask').click(function () {
        let id = Id;
        let dueDate = $('#inputDueDate')
    
        let priority = $('#selectPriority')
        let status = $("input[name='optradio']:checked").val();

        editTask(
                id,
                dueDate.val(),
                status,
                priority.val()),
            function (editTask) {
               
                window.alert("Edited" + Id + "  to Database")
            }
    })
 
    //$('#createNewTask').show();
   // $('#editTask').hide();
}

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

function editButton(e) {

    var parent_id = $(e).parent().parent();
    console.log(parent_id)
    var childID = $(parent_id).children('.card-footer');
    var taskId = $(childID).children('.text-muted').text();
    console.log(taskId)

    /* var description = $(parent_id).children('.card-text').text();
     var list = $(parent_id).children('#list')
     var dd = $(list).children('#due').text();
     var dueDate = dd.substr(dd.indexOf(":") + 3).trim();
     var s = ($(list).children('#state').text());
     var status = s.substr(s.indexOf(":") + 3);
     var p = $(list).children('#pri').text();
     var priority = p.substr(p.indexOf(":") + 3);*/
    $('#createNewTask').hide();
    $('#editTask').show();
    $('#statusButton').show();

    putDataForEdit(taskId);
}