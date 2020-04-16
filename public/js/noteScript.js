/*----------Enable note input field--------------------*/

function enableInput(id) {
    $('#addNewNoteDiv-'+id).show();
}

/*---------------------On click make Note card enable-------------------------------*/


function showNotesButton(e, taskID) {

    var content = $(e).next()[0];
    if (content.style.display === "block") {
        content.style.display = "none";
    } else {
        content.style.display = "block";
    }
    addDynamicNotesToTask(taskID);

}

