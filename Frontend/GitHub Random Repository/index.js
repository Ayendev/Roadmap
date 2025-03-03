import {Octokit} from "https://esm.sh/@octokit/core";

//
let STATUS = [
    "Please Select a language",
    "Loading please wait...",
    "Error fetching repositories",
    "Repository not found",
];

//
let COLORS = [
    "red",
    "rgba(0, 0, 0, 0.63)"
]

// Setting repositories 
let repositories = [];


// Selectors query
let title = document.querySelector(".title");
let description = document.querySelector(".description");
let info_lang = document.querySelector(".detail-lang");
let info_star = document.querySelector(".detail-star");
let info_fork = document.querySelector(".detail-fork");
let info_info = document.querySelector(".detail-info");

// Selectors Id
let element_select = document.getElementById("options_lang");
let info_ = document.getElementById("message");
let card = document.getElementById("placeResult");
let btn_var = document.getElementById("btn_var");

// instance octockit
const octokit = new Octokit();


// Retrieve all data languages
async function getLanguages() {

    let promise = await fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json");
    const response = await promise.json();

    response.forEach(language => Filled(language));
}
getLanguages();


// pollute some option from each language
function Filled(element) {

    if (typeof element !== "undefined" && element.value !== "") {
        let create_option = document.createElement("option");
        create_option.setAttribute("name", element ? element.title : "");
        create_option.setAttribute("value", element ? element.value : "");
        create_option.innerHTML = element?.title;
        element_select.appendChild(create_option);
    }

}
Filled();

//
async function Execute(query) {

    let promise_ = await octokit.request('GET /search/repositories', {
        headers: {
            'X-GitHub-Api-Version': '2022-11-28',
            'Accept': 'application/vnd.github+json'
        },
        q: `language:${query}`
    });

    let {items} = await promise_.data;

    return items;
}


//
function colorMessage(color){
    info_.style.color = color;
}

//
function Displaymessage(index_status, visibility = true){
    if (index_status === 0){ // To selected
        
        if (visibility){
            info_.innerHTML = STATUS[index_status];
            colorMessage(COLORS[1]);
            info_.classList.remove("hide");
        }else {
            info_.classList.add("hide");
            card.classList.remove("hide");
        }
        
    }else if(index_status === 1){ // loading
        
        if (visibility){
            info_.innerHTML = STATUS[index_status];
            colorMessage(COLORS[1]);
            info_.classList.remove("hide");
            card.classList.add("hide");
        }else {
            info_.classList.add("hide");
            card.classList.remove("hide");
        }
        
    }else if(index_status === 2){ // Error
        
        if (visibility){
            info_.innerHTML = STATUS[index_status];
            colorMessage(COLORS[0]);
            info_.classList.remove("hide");
            card.classList.add("hide");
        }else {
            info_.classList.add("hide");
            card.classList.remove("hide");
        }
        
    }else if(index_status === 3){ // Error

        if (visibility){
            info_.innerHTML = STATUS[index_status];
            colorMessage(COLORS[1]);
            info_.classList.remove("hide");
            card.classList.add("hide");
        }else {
            info_.classList.add("hide");
            card.classList.remove("hide");
        }

    }
}
Displaymessage(0);


// Research
function Research() {
    
    let languageSelected = element_select.value;

    Displaymessage(1);
    
    Execute(languageSelected).then((response) => {
        
        // Store repository relative
        repositories = response.filter((repository) => repository.language == languageSelected);

        if (repositories.length > 0){
            
            Displaymessage(1,false);

            
            CreateContent(response.find((repository) => repository.language == languageSelected));

            // display button retry
            btn_var.classList.remove("hide");
            btn_var.classList.add("btn_refresh")
            btn_var.innerText = "Refresh"
            
        }else {
            Displaymessage(3);
        }
    

    }).catch((err) => {
        
        Displaymessage(2)
    
        // display button retry
        btn_var.classList.remove("hide");
        btn_var.classList.add("btn_retry")
        btn_var.innerText = "Click to retry";
    })
};

//
function CreateContent(repo) {
    
    title.innerHTML = repo.name;
    description.innerHTML = repo.description;
    
    info_lang.innerHTML = `<i class="icon-detail icon-lang"></i>${repo.language}`;
    info_star.innerHTML = `<i class="icon-detail icon-star"></i>${repo.score}`;
    info_fork.innerHTML = `<i class="icon-detail icon-fork"></i>${repo.forks}`;
    info_info.innerHTML = `<i class="icon-detail icon-info"></i>${repo.language}`;

}


// Listeners
element_select.addEventListener("change", Research);
btn_var.addEventListener("click", (event) => {
    
    let content_class = event.target.classList.contains("btn_refresh");
    
    if (content_class){

        let index_round = Math.abs(Math.floor(Math.random() * (repositories.length - 1)));
        
        CreateContent(repositories[index_round]);
        
    }else {
        Research();
    }
    
})


