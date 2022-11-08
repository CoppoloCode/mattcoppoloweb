
// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");
var headerContainer = document.getElementsByClassName("header-container")[0];

function menutoggle(){
    
    if(MenuItems.style.height == "0px" || MenuItems.style.height == ''){
        MenuItems.style.height = (window.visualViewport.height + 'px');
        MenuItems.style.width = window.visualViewport.width + 'px';
    }
    else{
        MenuItems.style.height = "0px";
    }
    
}