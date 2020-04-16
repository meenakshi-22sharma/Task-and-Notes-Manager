//--------------------------------Fetching Task's Data to Display on main page ------------
function fetchTasks(done) {
    $.get('/tasks', function (data) {

        done(data)
    })
}

//-------------------------  Sending post request to save Task data------------------------------------------
function addTask(title, description, dueDate, priority) {

    $.post('/tasks', {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    }, function (data) {
        alert("Added task")
        $('#tasks').append(createTaskCard(data))
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
        success: function (data) {
            window.alert("Edited " + data.Id + " to Database")
            $('#' + data.Id + ' #due').text("Due Date : " + data.Due_Date.substr(0, data.Due_Date.indexOf("T")))
            $('#' + data.Id + ' #state').text("State : " + data.Status)
            $('#' + data.Id + ' #pri').text("Priority : " + data.Priority)
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
                 <button type="button" class="btn btn-info"   onclick="enableInput(${task.Id})">Add  +</button>
            </div>

            <div class="input-group mb-3" id="addNewNoteDiv-${task.Id}" style="display: none;">
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



/*-----------------------------------Sorting tasks ---------------------------------*/

function sortTasksBy(id) {
    if (id == "byPriority") {
        sortByPriority();
    } else if (id == "byStatus") {
        sortByStatus();
    } else {
        sortByDate();

    }
}

//----------------------------Sort by Priority ----------------------------------------

function sortByPriority() {
    console.log("refreshing list")
    let taskList = $('#tasks')
    let midList = $('#tasks1')
    let lastList = $('#tasks2')

    fetchTasks(function (tasks) {


        taskList.empty()
        midList.empty()
        lastList.empty()

        for (task of tasks) {
            if (task.Priority == "High") {
                taskList.append(createTaskCard(task))
            } else if (task.Priority == "Medium") {
                midList.append(createTaskCard(task))
            } else {
                lastList.append(createTaskCard(task))
            }
        }
    })
}

//-------------------------------- Sort by Staus---------------------------------------------------------

function sortByStatus() {
    console.log("refreshing list")
    let taskList = $('#tasks')
    let midList = $('#tasks1')
    let lastList = $('#tasks2')


    fetchTasks(function (tasks) {

        taskList.empty()
        midList.empty()
        lastList.empty()
        for (task of tasks) {
            console.log(task.Status)
            if (task.Status == "Incomplete") {
                taskList.append(createTaskCard(task))
            } else {
                midList.append(createTaskCard(task))
            }

        }
    })
}


//-------------------------------- Sort by Date----------------------------------------------------------
function sortByDate() {
    console.log("refreshing list")
    let taskList = $('#tasks')
    let midList = $('#tasks1')
    let lastList = $('#tasks2')




    fetchTasks(function (tasks) {

        taskList.empty()
        midList.empty()
        lastList.empty()
        for (task of tasks) {
            console.log(task.Due_Date.slice(0, 10))
            task.Due_Date = task.Due_Date.slice(0, 10)
        }
        tasks = tasks.sort(function (a, b) {
            return a.Due_Date > b.Due_Date ? 1 : -1;
        })
        for (task of tasks) {
            task.Due_Date=task.Due_Date+"T"
            taskList.append(createTaskCard(task))
        }

    })
}