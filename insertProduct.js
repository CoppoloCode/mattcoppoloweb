

/*--------setting the Review for products --------------------*/

function setReview(productReview){
    productReview = parseInt(productReview);
    var starElement = '<i class="fa fa-star" aria-hidden="true"></i>';
    var emptyStarElement = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    var result = "";
    for(i=0; i<productReview; i++){
       result += starElement;
    }
    for(i=productReview; i<5; i++){
        result += emptyStarElement;
    }
    return result;
}
/*-------------setting the products in their place --------------------*/


        function createProduct(productPlacementID, products, chosenProduct){

            var productID = products[chosenProduct][0];
            var productName = products[chosenProduct][1];
            var productImage = products[chosenProduct][2];
            var productReview = products[chosenProduct][3];
            var productCost = products[chosenProduct][4];
        
            var review = setReview(productReview);
            console.log(document.getElementById(productPlacementID).innerHTML = "<a href='product-details.html'>" + "<img src='images/" 
            + productImage + "'" +" "+ "id=" + "'" + productID + "'" + " " + "onclick='getImageProduct(id)'></a><h4>" 
            + productName + "</h4><div>" + review + "</div><p>" + productCost + "</p>");
        }

        function splitProducts(productsToSplit){
            var products = [];     
            products = productsToSplit.split('\n');

            for(i = 0; i<products.length;i++){
                products[i] = products[i].split('-');
            }

            setProductsAtLocation(products);

        }

/*--------------------setting the products in their place ---------------*/

    function setProductsAtLocation(products){

        createProduct("product-1", products, 6);
        createProduct("product-2", products, 4);
        createProduct("product-3", products, 2);
        createProduct("product-4", products, 5);
        createProduct("product-5", products, 3);
        createProduct("product-6", products, 7);
        createProduct("product-7", products, 9);
        createProduct("product-8", products, 8);

    }


    
  