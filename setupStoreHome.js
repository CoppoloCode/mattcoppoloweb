
function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: setProducts,
       
    });
}

function getProductsFromCookie(data){

    let products = data;
    console.log(products);

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