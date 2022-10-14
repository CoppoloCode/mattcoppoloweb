
function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: setProducts,
       
    });
}

function setProducts(data){         
                        
    let products = data;
    let shuffledProducts = [];
    let productElements = [];
    let productPlacementId = "product-";
    
    shuffledProducts = shuffleProducts(products);
    productElements = getProductElements(shuffledProducts);
    for(let i = 1; i < 9; i++){
        document.getElementById(productPlacementId + i).innerHTML = productElements[i];
    }                 
}

function revealCategories(){
    let reveals = document.querySelectorAll(".reveal");

    for(let i = 0; i < reveals.length; i++){
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 150;

        if(elementTop < windowHeight - elementVisible){
            reveals[i].classList.add("active");
        }else{
            reveals[i].classList.remove("active");
        }
    }
}
window.addEventListener("scroll", revealCategories);