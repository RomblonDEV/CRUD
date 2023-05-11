var selectedRow = null;

//This function will show the alert before main class is loaded
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);

}

//This Function will trigger if the button is clicked and information will be added to the booklist
document.querySelector("#book-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const bookName = document.querySelector("#bookName").value;
    const bookAuthor = document.querySelector("#bookAuthor").value;

    //Validating the book if the user put information in the input field
    if( bookName == "" || bookAuthor == "" ) {
        showAlert("Please Input the Neccessary Book Name", "danger");
    }
    else {
        if(selectedRow == null) {
            const list = document.querySelector("#book-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${bookName}</td>
                <td>${bookAuthor}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Book Added to the List", "success");

        }
        else {
            selectedRow.children[0].textContent = bookName;
            selectedRow.children[1].textContent = bookAuthor;
            selectedRow = null;
            showAlert("Book Info Edited", "info");
        }

        clearField();
    }
});

//Clearing the Input field
function clearField() {
    document.querySelector("#bookName").value = "";
    document.querySelector("#bookAuthor").value = "";
}

//Editing the Book Details
document.querySelector("#book-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#bookName").value = selectedRow.children[0].textContent;
        document.querySelector("#bookAuthor").value = selectedRow.children[1].textContent;
    }
});



//Deleting the data

document.querySelector("#book-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Book is now deleted", "danger");
    }
});