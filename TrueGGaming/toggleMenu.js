

// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){

    if(window.visualViewport.width > 900){
        if(MenuItems.style.maxHeight == "0px"){
            MenuItems.style.maxHeight = "250px";
        }
        else{
            MenuItems.style.maxHeight = "0px";
        }
    }else{
        if(MenuItems.style.maxHeight == "0px"){
            MenuItems.style.maxHeight = window.visualViewport.height + 'px';
        }
        else{
            MenuItems.style.maxHeight = "0px";
        }
    }
}