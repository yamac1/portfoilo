const letterForm = document.getElementById("form-wrap");

window.addEventListener("resize",hideForm);

function hideForm(e) {
    if(window.innerWidth <= 600){
        letterForm.hidden = true;
    }else{
        letterForm.hidden = false;
    }
}
