let numNotes = 1;
// table: first name, last name, username
let roster = ["Ben", "Miranda", "Redeat", "Irene", "Jae"];
let tabs = ["wall", "roster", "login"];
let useraccount = new Map();
useraccount.set('iserrano', 'hello');

function createStudentAccount(username, password) {
    useraccount.set(username, password);
    alert("Successfully added to useraccount list.");
}

function verifyLogin(username, password){
  if(useraccount.has(username)) {
    var existingPassword = useraccount.get(username);
    if(password == existingPassword) {
        alert("Successful login.");
    }
    else {
        alert("Incorrect password.");
    }
  }
  else {
      alert("User does not exist.");
  }
}

function switchTab(tabToShow) {
    tabs.forEach((item, i) => {
      if(item != tabToShow)
        $(`#${item}`).hide();
    });
    $(`#${tabToShow}`).show();
}

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

function deleteNote(noteId) {
  let confirmation = confirm("Are you sure you want to delete this note?");
  if(confirmation)
    $(`#note${noteId}`).remove();
}

function postNote(author, content) {
    numNotes++;
    let newNote = `<div id = 'note${numNotes}' class = 'note'>`
            +`<button class = 'delete_button' onclick = 'deleteNote(${numNotes})'>X</button>  `
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
      $("#author_name").val("");
      $("#note_content").val("");

  });
  $("#add_student").click(function(){
    var student_name = $("#student_name").val();
    addStudent(student_name);
    $("#student_name").val("");
  });
  $("#login_button").click(function() {
      var username = $("#username").val();
      var password = $("#password").val();
      verifyLogin(username, password);
  });
});
