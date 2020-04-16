//--------------------------------Fetching Notes's Data to Display  ------------
function fetchNotes(id,done) {
    $.get('/tasks/'+id+'/notes', function (data) {

        done(data)
    })
}

//-------------------------  Sending post request to save Note data------------------------------------------
function addNote(id,noteVal) {

    $.post('/tasks/'+id+'/notes', {
        note: noteVal,
        id:id
    }, function (data) {
        addDynamicNotesToTask(id);
        
    })

}


//----------------------------Dynamically creating note cards--------------------

function createNoteCard(note) {

    return $(` <li class="list-group-item">${note.Note}</li>`)

}



//-----------------adding notes to given at task id ------------------
function addDynamicNotesToTask(task_id){
    let noteList = $('#notesFor-'+task_id)
    fetchNotes(task_id, function (notes){
       console.log(notes)
        noteList.empty()
        for(note of notes){
            noteList.append(createNoteCard(note))
        }
    })
}


   /*----------------Reading new note data -------------------------*/

function readData(taskID){
    
 console.log("heyyeyyeye");
    let note = $('#editNote-'+taskID).val()
    console.log(note)
    addNote(taskID,note);
}