// Initialise selector
const selector = document;
let reuse_data = [];

const target_btn = document.querySelector(".btn");
const dialog = selector.getElementById("Dialog");
const dialogClose = selector.getElementById("close");
const btnSubmit = selector.getElementById("submit");
const input = selector.getElementById("input_field");
const chainsubreddit = selector.getElementById("subreddit");
const btn_refresh = document.getElementById("refresh");
const btn_delete = document.getElementById("delete");
let initialSubReddit = "/r/learningProgram";

let status_request = ["loading", "error", "success", "empty", "delete"];

//
function displayStatus(status = "") {

    let updateState = selector.getElementsByClassName("status")[0];

    switch (status) {
        case "loading":
            updateState.innerHTML = "Loading...";
            break;
        case "error":
            updateState.innerHTML = "Error";
            break;
        case "success":
            updateState.innerHTML = "";
            break;
        case "empty":
            updateState.innerHTML = "subreddit not found.";
            break;
        case "delete":
            updateState.innerHTML = "last element has been deleted.";
            break;

        default:
            updateState.innerHTML = 'Please, retry a new subreddit';
    }
    updateState.classList.remove("mask");
}

//

selector.getElementsByClassName("btn_options")[0].addEventListener("click", toggleDropdown);

function toggleDropdown() {
    const dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');

    document.addEventListener('click', function (event) {
        if (!event.target.closest('.btn_options')) {
            dropdown.classList.remove('show');
        }
    });

}


//
target_btn.addEventListener('click', (event) => {
    dialog.showModal();
});

//
dialogClose.addEventListener('click', (event) => {

    dialog.returnValue !== ""
        ? selector.querySelector("#input_field").value = ""
        : dialog.close();
    /*if (!event.target.closest('#Dialog'){
        selector.querySelector("#input_field").value = "";
        //dialog.close();
    }*/
})

//
dialog.addEventListener("close", (e) => {
    e.target.setAttribute("formmethod", "dialog");
})

//
btnSubmit.addEventListener("click", () => {
     initialSubReddit = input.value;
    if (initialSubReddit !== "") {
        fillSubReddit(initialSubReddit);
        input.value = "";
        chainsubreddit.innerHTML = `/r/${initialSubReddit}`;
        dialog.close();
    }
    event.preventDefault();
})


btn_delete.addEventListener("click", (event) => {

    if (reuse_data.length > 0) { // if it exists a subreddit stored
        
        //Delete a subreddit
        reuse_data.pop();
        //remove the lists
        selector.querySelector(".lists").remove();
        // listing
        listingSubReddit(reuse_data);
        // display status 
        displayStatus(status_request[4]),100;
        // Remove the status message
        setTimeout(() => {
            selector.querySelector(".status").classList.add("mask");
        },1000)
        
    }

})

btn_refresh.addEventListener("click", function refreshSubreddit() {
    selector.querySelector(".lists").remove();
    // set empty subreddit
    reuse_data = [];
    // Retrieve et fill subreddit
    fillSubReddit(initialSubReddit);
 
});


// Get Subreddit
async function getSubReddit(subRedditParam = "learningprogramming") {

    try {
        displayStatus(status_request[0]);
        let subReddit = await fetch(`https://www.reddit.com/r/${subRedditParam}.json`);
        let data = await subReddit.json();

        await new Promise((resolve, reject) => setTimeout(resolve, 3000));
        
        displayStatus(status_request[2]);
        selector.getElementsByClassName("status")[0].classList.add("mask");

        if (subReddit.status !== 200) {
            displayStatus(status_request[3]);
        }

        return data;
    } catch (e) {
        displayStatus(status_request[1]);
    }
}

function fillSubReddit(valueElementSelected) {

    let test = getSubReddit(valueElementSelected.trim());

    test.then(result => {
        reuse_data = result.data.children;
        listingSubReddit(reuse_data)
    });
}

function listingSubReddit(list = []) {
    
    let parentWrap = selector.getElementsByClassName("content_area")[0];
    let childWrap = document.createElement("ul");
    
    if (list.length > 0) {
        
        childWrap.classList.add("lists");
        for (let item in list) {

            let li = document.createElement("li");
            let p = document.createElement("p");
            let span1 = document.createElement("span");
            let span2 = document.createElement("span");
            let span3 = document.createElement("span");

            //
            parentWrap.appendChild(childWrap);
            childWrap.appendChild(li);
            //
            li.appendChild(span1);
            span1.setAttribute("class", "score");
            span1.innerHTML = list[item].data.score;
            //
            li.appendChild(span2);
            span2.setAttribute("class", "title");
            span2.innerHTML = list[item].data.title.slice(0, 26) + "...";
            //
            li.appendChild(span3);
            span3.setAttribute("class", "author_fullname");
            span3.innerHTML = "By " + list[item].data.author_fullname;
        }
    }
}
