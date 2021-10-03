const textArea = document.getElementById("commentTextArea");
const sendButton = document.getElementById("sendBtn");
const commentHolder = document.getElementById("commentHolder");

let subTextArea;
let commentBody;

eventListener();

function eventListener() {
    sendButton.addEventListener("click", getCommentFromTextArea);
    document.addEventListener("DOMContentLoaded", loadComments);
}

function doSubComment() {
    subTextArea = document.querySelectorAll(".sub-textarea");

        subTextArea.forEach((t, i) => {
            let sayac = 0;

            t.addEventListener("focus", e => {
                sayac += 1;
                if (sayac == 1) {
                    e.target.nextSibling.nextSibling.addEventListener("click", x => {
                        const subcomment = e.target.value;
                        if (subcomment !== "") {
                            e.target.parentElement.insertAdjacentHTML('beforeend', `<div class=\"card bg-transparent subcomment ml-5 my-2\">
                                     <h5 class=\"card-header\"><i class=\"fas fa-user-circle\"></i> Ahmet Furkan İnanç
                                     </h5>
                                     <div class=\"card-body\">
                                         <h5 class=\"card-title\">Yorum özeti - başlığı</h5>
                                         <p class=\"card-text\">${subcomment}</p>
                                     </div>
                                 </div>`);
                            setCommentStorage("1", i + 1, subcomment);
                            e.target.value = "";
                        }
                    });
                }

            });
        });
}

function addCommentHTML(comment) {
    commentHolder.insertAdjacentHTML('beforeend', `<div class=\"card bg-transparent mt-3\">
                                                            <h5 class=\"card-header\"><i class=\"fas fa-user-circle\"></i>Ahmet Furkan İnanç</h5>
                                                            <div class=\"card-body\">
                                                                <h5 class=\"card-title\">Yorum özeti - başlığı</h5>
                                                                <p class=\"card-text\">${comment}</p>
                                                                <hr>
                                                                <textarea class=\"sub-textarea form-control bg-transparent color-white\" placeholder=\"yorum yap\"
                                                                    rows=\"3\"></textarea>
                                                                <button type=\"button\" class=\"sub btn btn-primary mt-2\">Gönder</button>
                                                            </div>
                                                        </div>`);
}

function getCommentFromTextArea() {

    const comment = textArea.value;
    if (comment !== "") {
        addCommentHTML(comment);
        setCommentStorage("0", 0, comment);
        textArea.value = "";
        
        doSubComment();
        

    }
}

function getCommentsFromStorage() {
    let comments;
    if (localStorage.getItem("comments") === null) {
        comments = [];
    } else {
        comments = JSON.parse(localStorage.getItem("comments"));
    }

    return comments;
}

function setCommentStorage(type, whose, comment) {
    let comments = getCommentsFromStorage();
    // let json = JSON.parse(`{"isWhat":{"type":"${type}","whose":${whose}},"comment":"${comment}"}`);
    let json = {"isWhat":{"type":type,"whose":whose},"comment":comment};
    comments.push(json);
    localStorage.setItem("comments", JSON.stringify(comments));
}



function loadComments() {
    let comments = getCommentsFromStorage();

    comments.forEach(c => {

        if (c.isWhat.type === "0") {
            addCommentHTML(c.comment);
        }
    });

    doSubComment();

    commentBody = document.querySelectorAll(".card.bg-transparent .card-body");

    comments.forEach(c => {

        if (c.isWhat.type === "1") {
            commentBody[c.isWhat.whose - 1].insertAdjacentHTML('beforeend', `<div class=\"card bg-transparent subcomment ml-5 my-2\">
                                                                                <h5 class=\"card-header\"><i class=\"fas fa-user-circle\"></i> Ahmet Furkan İnanç</h5>
                                                                                <div class=\"card-body\">
                                                                                    <h5 class=\"card-title\">Yorum özeti - başlığı</h5>
                                                                                    <p class=\"card-text\">${c.comment}</p>
                                                                                </div>
                                                                            </div>`);
        }
    });

}