const buttonsClicked = document.body.getElementsByTagName("button");
const Contents = document.body.getElementsByClassName("content_accordian_item")



for (let i = 0; i < buttonsClicked.length; i++) {
    
    const button = buttonsClicked[i];
    const ContentRef = Contents[i];
    button.addEventListener('click', function () {
        const status = ContentRef.classList.contains("show_content");
        console.log(status);
        
        if (status){
            ContentRef.classList.remove("show_content");
        }else {
            
            const lastElementShow = document.querySelector('.show_content');
            if (lastElementShow){
                lastElementShow.classList.remove("show_content");
            }
            ContentRef.classList.add("show_content");
        }
    }.bind(ContentRef))
}
