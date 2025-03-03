const initialtask = 3;
let Tasks = [];

const refList = document.getElementById("tasks");


const iconEnterElmnt = document.querySelector(".icon-enter");

iconEnterElmnt.addEventListener("click", function () {
    let EntryValue = document.querySelector(".input_search").value;
    if(EntryValue === null || EntryValue === "") {
        document.querySelector(".input_search").focus();
    }else {
        AddnewTask(EntryValue);
        document.querySelector(".input_search").value = ""
    }
});

document.body.addEventListener("load", Rendertasks());


function AddnewTask(newtask){
    const addNew = {
        description: newtask,
        status: false
    };
    Tasks.push(addNew);
    Rendertasks();
}


function Rendertasks(){
    
    refList.innerHTML = "";
    // updated DOM
    Tasks.map((task,index) => {
        let createElementLi_ = document.createElement("li");
        createElementLi_.innerHTML = task.description;
        createElementLi_.classList.toggle("completed", task.status);
        
        let createElementInputCheckbox = document.createElement("input");
        createElementInputCheckbox.type = "checkbox";
        createElementInputCheckbox.checked = task.status;
        createElementInputCheckbox.addEventListener("change", () => {
            task.status = createElementInputCheckbox.checked;
            createElementLi_.classList.toggle("completed", task.status);

            if (task.status) {
                let storefilter = task;
                Tasks.splice(index, 1);

                Tasks.push(storefilter);
                Rendertasks();
            }
        })
        
        let createElementButton = document.createElement("button");
        createElementButton.classList.add("btn");
        createElementButton.addEventListener('click', () => {
            Tasks.splice(index, 1);
            Rendertasks();
        });

        createElementLi_.appendChild(createElementInputCheckbox);
        createElementLi_.appendChild(createElementButton);
        refList.appendChild(createElementLi_);
    });
};

