function fetchTasks(done) {
    $.get('/tasks', function (data) {
       
        done(data)
    })
}

function addTask(title, description,dueDate,status,priority){
  
    $.post('/tasks',{
        title : title,
        description : description,
        dueDate : dueDate,
        status : status,
        priority : priority
    },function(data){
        alert("Added task")
        done(data)
    })

}


function editTask(id,dueDate,status,priority){
    console.log("editTask : ")
    console.log(id+", "+dueDate+" ,"+status+" ,"+priority)
   var data ={
    id:id,
    status : status,
    priority : priority,
    dueDate : dueDate

   }
   
   $.ajax({
    type: 'PATCH',
    url: 'http://localhost:4567/tasks/'+id,
    data: data,
    processData: false,
    contentType: 'application/merge-patch+json',
 
    /* success and error handling omitted for brevity */
 });
       
}

function createTaskCard(task) {
   let DATE = task.Due_Date;
   let formatedDate = DATE.substr(0,DATE.indexOf("T"));

   
    return $(` 
    <div class="card mb-3">
        <div class="row no-gutters">
            <div class="col-md-4 ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbV3Ao3QumlY4DhjxgrNiXMIUrMF8Ci8By_ygmXQAo4AAXv7hW&usqp=CAU"
                    class=" " alt="Task Picture">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title" >${task.Title}</h5>
                    <p class="card-text">${task.Description}</p>

                    <ul class="list-group list-group-flush" id="list">
                        <li class="list-group-item" id="due">Due Date :  ${formatedDate} </li> 
                        <li class="list-group-item" id="state">State :  ${task.Status} </li>
                        <li class="list-group-item" id="pri">Priority  :  ${task.Priority}</li>
                    </ul>
                    <button  type="button" class="btn btn-secondary btn-lg btn-block editButton" onclick="editButton(this)" >Edit</button>
                </div>
                <div class="card-footer">
                <small class="text-muted">${task.Id}</small>
                </div>
            </div>
        </div>
    </div>`)
}