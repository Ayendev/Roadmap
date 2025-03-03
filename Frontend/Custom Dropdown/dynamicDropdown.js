const selectorUnique = document;
const selectorElement = document.body;
const status = "active";


// Dropdown clicked
    const ButtondropDown = selectorUnique.querySelector(".dropdown_");
   
    const showList = selectorUnique.getElementById("myList");
    const changeIcone = selectorElement.getElementsByClassName("icon");
    const UpDown = ["icon-arrow-up","icon-arrow-down"];
console.log(showList);
    // Event Listener

        // Click's user
        ButtondropDown.addEventListener("click", function () {
            
            if (showList.classList.contains(status)) {

                showList.classList.remove(status);
                changeIcone[0].classList.replace(UpDown[0],UpDown[1]);
            
                
            }else {
                
                showList.classList.add(status);
                changeIcone[0].classList.replace(UpDown[1],UpDown[0]);

            }
            
            
        });
        
        
        // Lose focus
        document.addEventListener('click', (event) => {
        
            if (!showList.contains(event.target) && event.target !== ButtondropDown) {
                showList.classList.remove(status);
            }
        });
        


        
// Get List Items Button
const ManageListItem = selectorElement.getElementsByClassName("item_button_");

    // Loop manage
    for (const Item of ManageListItem) {
        
        Item.addEventListener("click", function (event) {
            
            const valueElementSelected = event.target.value;
            const textElementSelected = event.target.textContent;
            
            
            let ClassCheckTag = selectorElement.getElementsByClassName("check");
            let LenghtClassCheckTag = ClassCheckTag.length;
            let iconTag = Item.nextSibling.nodeName.toLowerCase();
            
            
            if (valueElementSelected){
                
                selectorUnique.querySelector(".dropdown_").value = valueElementSelected;
                
                if (iconTag === "i" && LenghtClassCheckTag == 1){
                    /*selectorUnique.querySelector(".check")?.classList.remove(".check");*/
                    let DeletelastCheck = ClassCheckTag[0].classList.remove("check");
                    Item.nextSibling.classList.add("check");
                    
                }else {
                    Item.nextSibling.classList.add("check");
                }
            
            }else if (textElementSelected) {
                
                selectorUnique.querySelector(".dropdown_").value = textElementSelected;
                
                if (iconTag === "i" && LenghtClassCheckTag == 1){
                    
                    let DeletelastCheck = ClassCheckTag[0].classList.remove("check");
                    Item.nextSibling.classList.add("check");
                    
                }else Item.nextSibling.classList.add("check");
                
            }else console.log(e.error);
            
            showList.classList.remove(status);
            changeIcone[0].classList.replace(UpDown[0],UpDown[1]);
        });
        
    }    
    