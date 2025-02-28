const nodeParent = document.body;
const displayCookie = document.querySelector(".wrap_cookie");


const IdInterv= setInterval(()=>{
    
    displayCookie.style.display = "block";
},1000)

function loadCookie(keystop) {
    const cookiesStore = sessionStorage.getItem("cookies");
    console.log(cookiesStore);
    if (cookiesStore !== "" && cookiesStore !== null) {
        console.log("cookiesStore exist");
        console.log(keystop);
        clearInterval(keystop);
        displayCookie.style.display = 'none';

    }
}

function cancelCookie() {
    const ButtonCancel = nodeParent.getElementsByClassName('button');
    ButtonCancel[0].addEventListener('click', () => {
        displayCookie.style.display = 'none';
    })
}

function ConfirmConsent(){
    const RequireActionButton = document.getElementById('action_button');
    
    if(RequireActionButton){
        RequireActionButton.addEventListener('click', (e) => {
            
            const _CookieId = "_ayendev0506";
            
            try{
                const persistLocal = sessionStorage;
                persistLocal.setItem("cookies", _CookieId);
                loadCookie(IdInterv)
            }catch(e){
                console.error(e);
            }
            
        })
    }
}


/*document.cookie = "id=ayen; Secure=true; HttpOnly; Path=/AYEN_ ROADMAP/*";*/
/*
            const cookieNew = document.cookie
            const Cookiepersist = {
                name: "ayen",
                platform : window.navigator.userAgent,
            };

            const datalocal = window.Cookies;
            console.log(browser);*/
/*datalocal.setItem("name",Cookiepersist.name);
datalocal.setItem("plateform",Cookiepersist.platform);*/
console.log(document.cookie = "id=ayen; Secure=true;");
console.log(document.cookie);

cancelCookie();
ConfirmConsent();

