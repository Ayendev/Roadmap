const node = document.body;


const liElements= node.getElementsByTagName('li');
const parentContent = node.getElementsByClassName('content_more');
const childsDiv = parentContent[0];

const Element_active = document.getElementsByClassName('active');


for (let i = 0; i < liElements.length; i++) {
    
    liElements[i].addEventListener('click', (e) => {
        Element_active[0].classList.remove('active');
        e.target.className = 'active';

        if (!parentContent[i].classList.contains('show')) {

            const ElementShow = document.querySelector('.show');
            ElementShow.classList.remove("show");
            parentContent[i].classList.toggle('show');

            /* Using toggle function
                ElementShow.classList.toggle('show');
                parentContent[i].classList.toggle('show')
            */
        }
    })
}
    