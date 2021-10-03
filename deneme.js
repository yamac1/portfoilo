const letterForm = document.getElementById("form-wrap");
const navLinks = document.querySelectorAll("nav div ul li a");


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

window.addEventListener("resize", hideForm);

function hideForm(e) {
    if (window.innerWidth <= 600) {
        letterForm.hidden = true;
    } else {
        letterForm.hidden = false;
    }
}
