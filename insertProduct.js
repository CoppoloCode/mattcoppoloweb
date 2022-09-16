

/*--------------------setting the products in their place ---------------*/

function shuffleProducts(products){

    
    let currentIndex = products.length;
    let randomIndex;

  
    while (currentIndex != 0) {

        
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [products[currentIndex], products[randomIndex]] = [products[randomIndex], products[currentIndex]];
    }

    
    return products;

}




/*-------------creates the product Element--------------------*/

function getProductElements(products){

    let productID;
    let productName;
    let productImage;
    let productReview;
    let productCost;
    let review = getReview(productReview);
    let productElements = [];

    for(let i = 0; i < products.length; i++){

        productID = products[i][0];
        productName = products[i][1];
        productImage = products[i][2];
        productReview = products[i][3];
        productCost = products[i][4];
        review = getReview(productReview);

        productElements[i] = "<a href='product-details.html'>" + "<img src='images/" 
        + productImage + "'" +" "+ "id=" + "'" + productID + "'" + " " + "onclick='saveProductId(id)'></a><p>" 
        + productName + "</p><div>" + review + "</div><p>$" + productCost + "</p><a id=" + "'" + productID + "'" + "class='AddtoCart'><i class='fa fa-cart-plus' aria-hidden='true'></i></a>";
    }
    return productElements;
}

/*--------creates Review Element of products --------------------*/

function getReview(productReview){
    productReview = parseInt(productReview);
    let starElement = '<i class="fa fa-star" aria-hidden="true"></i>';
    let emptyStarElement = '<i class="fa fa-star-o" aria-hidden="true"></i>';
    let result = "";
    for(i=0; i<productReview; i++){
       result += starElement;
    }
    for(i=productReview; i<5; i++){
        result += emptyStarElement;
    }
    return result;
}





    
  
