

getProductsFromDataBase();
function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts'},
        success: function setProducts(data){         
                        
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
    });
}