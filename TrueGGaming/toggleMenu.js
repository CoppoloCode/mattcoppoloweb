

// setups the navbar menu

var MenuItems = document.getElementById("MenuItems");

if(window.visualViewport.width < 1200){
    MenuItems.style.height = "0px";
}

function menutoggle(){


    if(window.visualViewport.width < 1200){
        if(MenuItems.style.height == "0px"){
            MenuItems.style.height = window.visualViewport.height + 'px';
            MenuItems.style.width = window.visualViewport.width + 'px';
        }
        else{
            MenuItems.style.height = "0px";
        }
    }
        
    
    
}