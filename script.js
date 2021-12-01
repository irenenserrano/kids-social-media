let numNotes = 1;
let roster;
let localStorage;
let tabs = ["wall", "roster", "login"];
let useraccount = new Map();
let notes;
//useraccount.set('iserrano', 'hello');

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
  localStorage.setItem('persistentRoster', JSON.stringify(roster));
}

function displayRoster(){
  roster.forEach((item, i) => {
    let student = `<div id = 'student_name${i}'> ${item} </div>`;
    $("#roster_display").append(student);
  });
}

function deleteNote(noteId) {
  var pos = -1;
  notes.forEach((note, i) => {
    if(note.postId == noteId){
      pos = i;
    }
  });
  notes.splice(pos, 1);
  localStorage.setItem('persistentNotes', JSON.stringify(notes));
  $(`#note${noteId}`).remove();
}

function likeNote(noteId) {
  var isLiked = document.getElementById(`like_button_${noteId}`);
  if(isLiked.innerHTML=="( ͡° ͜ʖ ͡°)"){
    isLiked.innerHTML="&#128513"
  } else {
    isLiked.innerHTML="( ͡° ͜ʖ ͡°)"
  }
}

function displayNote(author, content, id) {
    let newNote = `<div id = 'note${id}' class = 'note'>`
            +`<button class = 'delete_button' onclick = 'deleteNote(${id})'>X</button>`
            +`<div class = 'author'> ${author} </div>`
            + `<br>`
            +`<div class = 'content'> ${content} </div>`
            +`<button id = 'like_button_${id}' class = 'like_button' onclick = 'likeNote(${id})'>( ͡° ͜ʖ ͡°)</button>`
            +"</div>";
    $("#wall").append(newNote);
}

function addNote(author, content, id) {
    let note = {
        'postId': id,
        'author': author,
        'content': content,
        //'like': isLiked
    };
    notes.push(note);
}

function handleNote(author, content) {
    numNotes++;
    addNote(author, content, numNotes, 0);
    localStorage.setItem('persistentNotes', JSON.stringify(notes));
    displayNote(author, content, numNotes);
}

$( document ).ready(function() {
    localStorage = window.localStorage;
    //localStorage.clear();
    if (localStorage.getItem('persistentRoster') == null) {
        roster = ["Ben", "Miranda", "Redeat", "Irene", "Jae"];
        localStorage.setItem('persistentRoster', JSON.stringify(roster));
        console.log("Roster initialized");
    } else {
        roster = JSON.parse(localStorage.getItem('persistentRoster'));
        console.log("Roster loaded");
    }
    if (localStorage.getItem('persistentNotes') == null) {
        notes = [];
        localStorage.setItem('persistentNotes', JSON.stringify(notes));
        console.log("Notes initialized");
    } else {
        notes = JSON.parse(localStorage.getItem('persistentNotes'));
        console.log("Notes loaded");
        notes.forEach(note => {
          displayNote(note.author, note.content, note.postId);
        });
    }

  displayRoster();

  $("#post_note_button").click(function(){
      var author_name = $("#author_name").val();
      if (!checkRoster(author_name)) {
        alert("name not on roster");
        return;
      }
      var note_content = $("#note_content").val();
      handleNote(author_name, note_content);
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
