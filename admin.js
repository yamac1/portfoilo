
function deleteNote() {
    const buttons = document.querySelectorAll("li button");
    for (let i = 1; i < buttons.length; i++) {
        buttons[i].addEventListener('click', e => {
            e.target.parentElement.remove();
        });
    }
}


function addNote(e) {
    const notearea = document.getElementById("notearea");
    if (notearea.value !== "") {
            const parentUl = addNoteButton.parentElement.parentElement.parentElement;
            parentUl.insertAdjacentHTML('beforeend', `<li class="list-group-item">
            ${notearea.value} 
            <button type="button" class="btn bg-color-grey text-white">Sil</button>
            </li>`);
            notearea.value = "";
            deleteNote();
    }
}

const addNoteButton = document.querySelector("li button");
addNoteButton.addEventListener('click',addNote);
deleteNote();
