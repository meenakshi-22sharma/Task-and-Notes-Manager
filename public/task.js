//--------------------------------Fetching Task's Data to Display on main page ------------
function fetchTasks(done) {
    $.get('/tasks', function (data) {

        done(data)
    })
}

//-------------------------  Sending post request to save Task data------------------------------------------
function addTask(title, description, dueDate, status, priority) {

    $.post('/tasks', {
        title: title,
        description: description,
        dueDate: dueDate,
        status: status,
        priority: priority
    }, function (data) {
        alert("Added task")
        
    })

}

//------------------------------- Sending  Ajax request to backend -----------------
function editTask(id, dueDate, status, priority) {
    console.log(id + ", " + dueDate + " ," + status + " ," + priority)
    var data = {
        id: id,
        status: status,
        priority: priority,
        dueDate: dueDate

    }

    $.ajax({
        type: 'PATCH',
        url: 'http://localhost:4567/tasks/' + id,
        data: JSON.stringify(data),
        // processData: false,
        contentType: 'application/json',
        success: function () {
            console.log("HUrraya");
        }

        /* success and error handling omitted for brevity */
    });

}

function createTaskCard(task) {
    // ---------------------------Formatting date to display----------------------------------
    let DATE = task.Due_Date;
    let formatedDate = DATE.substr(0, DATE.indexOf("T"));

    //----------------------------Dynamically creating task cards--------------------
    return $(` 
    <div class="task card mb-5">
        <div class="row no-gutters">
            <div class="col-md-4 ">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTbV3Ao3QumlY4DhjxgrNiXMIUrMF8Ci8By_ygmXQAo4AAXv7hW&usqp=CAU"
                    class=" " alt="Task Picture">
            </div>
            <div class="col-md-8 task-card" id="${task.Id}">
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
        <button type="button" class="buttonForNotes btn btn-outline-warning" onclick="showNotesButton(this,${task.Id})">Show Notes</button>


        <div  class="card note-card" style="display:none ; overflow: hidden; width: 18rem;">
             <div class="card-header" style="text-align: -webkit-center;">
                <label > NOTES </label>
                 <button type="button" class="btn btn-info"   onclick="enableInput()">Add  +</button>
            </div>

            <div class="input-group mb-3" id="addNewNoteDiv" style="display: none;">
                <input type="text" id="editNote-${task.Id}" class="form-control" placeholder="New Note" aria-label="New Note" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="readData(${task.Id})" >Insert</button>
                </div>
            </div>


            <ul class="list-group list-group-flush" id="notesFor-${task.Id}"></ul>
      </div>

      </div>

    </div>`)
}