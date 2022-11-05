
// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");


function menutoggle(){
    
    if(window.visualViewport.width < 1200){
        if(MenuItems.style.height == "0px"){
            MenuItems.style.height = '600px';
            MenuItems.style.width = window.visualViewport.width + 'px';
        }
        else{
            MenuItems.style.height = "0px";
        }
    }
}