let numNotes = 1;
let roster = ["Ben", "Miranda", "Redeat", "Irene", "Jae"];

function checkRoster(author) {
  return roster.includes(author);
}

function addStudent(name){
  roster.push(name);
  let student = `<div id = 'student_name${roster.length-1}'> ${name} </div>`;
  $("#roster_display").append(student);
}

function displayRoster(){
  roster.forEach((item, i) => {
    let student = `<div id = 'student_name${i}'> ${item} </div>`;
    $("#roster_display").append(student);
  });
}

function postNote(author, content) {
    numNotes++;
    let newNote = `<div id = 'note${numNotes}' class = 'note'>`
            +`<div class = 'author'> ${author} </div>`
            + `<br>`
            +`<div class = 'content'> ${content} </div>`
            +"</div>";
    $("#wall").append(newNote);
}
$( document ).ready(function() {
  displayRoster();
  $("#post_note_button").click(function(){
      var author_name = $("#author_name").val();
      if (!checkRoster(author_name)) {
        alert("name not on roster");
        return;
      }
      var note_content = $("#note_content").val();
      postNote(author_name, note_content);
      $("#author_name").val(" ");
      $("#note_content").val(" ");

  });
  $("#add_student").click(function(){
    var student_name = $("#student_name").val();
    addStudent(student_name);
    $("#student_name").val("");
  });
});
