$(document).ready(function() {
    $("#sortDiv a").click(function() {
        console.log("Soring by " +this.id)
        sortTasksBy(this.id);
    });
});

