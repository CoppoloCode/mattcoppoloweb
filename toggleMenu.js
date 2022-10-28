
// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");

if(window.visualViewport.width < 1200){
    MenuItems.style.maxHeight = "0px";
}

function menutoggle(){

    if(window.visualViewport.width > 900){
        if(MenuItems.style.maxHeight == "0px"){
            MenuItems.style.maxHeight = "330px";
        }
        else{
            MenuItems.style.maxHeight = "0px";
        }
    }else{
        if(MenuItems.style.maxHeight == "0px"){
            MenuItems.style.maxHeight = window.visualViewport.height + 'px';
            MenuItems.style.width = window.visualViewport.width + 'px';
        }
        else{
            MenuItems.style.maxHeight = "0px";
        }
    }
}