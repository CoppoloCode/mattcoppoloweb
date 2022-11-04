
// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");


function menutoggle(){
    
    if(MenuItems.style.maxHeight == "0px"){
        MenuItems.style.maxHeight = window.visualViewport.height + 'px';
        MenuItems.style.maxWidth = window.visualViewport.width + 'px';
    }
    else{
        MenuItems.style.maxHeight = "0px";
    }
}