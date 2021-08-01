showNotes();
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");

    let notes = localStorage.getItem("notes");
    console.log(notes);

    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes);
        // notesList = notes;
        // console.log(notesList);
    }
    notesList.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesList));
    addTxt.value = "";
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) {
        notesList = [];
    }
    else {
        notesList = JSON.parse(notes);
    }
    let html = "";
    notesList.forEach(function (element, index) {
        html += `
        <div class="notecard card my-2 mx-2" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1} </h5>
                        <p class="card-text">${element}</p>
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
        `;
    });
    let notesElm = document.getElementById("notes");
    if (notesList.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section to add note`;
    }
}

function deleteNote(index) {
    let isDelete = confirm(`Are you sure you want to delete this note?`);
    if (isDelete) {
        let notes = localStorage.getItem("notes");

        if (notes == null) {
            notesList = [];
        }
        else {
            notesList = JSON.parse(notes);
        }
        notesList.splice(index, 1);
        localStorage.setItem("notes", JSON.stringify(notesList));
        showNotes();
    }
    else {
        alert("You have clicked on cancel");
    }
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () 
{
    let inputValue = searchTxt.value;
    // console.log(inputValue);
    let notecards = document.getElementsByClassName("notecard");
    Array.from(notecards).forEach(function (element) {
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputValue) ){
            element.style.display="block";
        }
        else{
            element.style.display="none";

        }

    });
})
