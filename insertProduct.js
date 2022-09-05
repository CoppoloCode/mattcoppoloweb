

/*--------------------splits products string for formating ---------------*/


/*--------------------setting the products in their place ---------------*/

function getRandomProductsId(products){

    let randomProductsId = [];
    let randomProducts = [];

    let isUnique = false;

    do{
        for(i=0;i<products.length;i++){
            randomProductsId[i] = Math.floor(Math.random() * (products.length));
        }
        isUnique = randomProductsId.some((element, index) => {
            return randomProductsId.indexOf(element) !== index
        });
    }while(isUnique == true);
    for(let i = 0; i < randomProductsId.length; i++){
        randomProducts[i] = products[randomProductsId[i]];
    }
    
    
    return randomProducts;

}

/*-------------creates the product Element--------------------*/

function getProductElements(randomProducts){

    let productID;
    let productName;
    let productImage;
    let productReview;
    let productCost;
    let review = getReview(productReview);
    let productElements = [];

    for(let i = 0; i < randomProducts.length; i++){

        productID = randomProducts[i][0];
        productName = randomProducts[i][1];
        productImage = randomProducts[i][2];
        productReview = randomProducts[i][3];
        productCost = randomProducts[i][4];
        review = getReview(productReview);

        productElements[i] = "<a href='product-details.html'>" + "<img src='images/" 
        + productImage + "'" +" "+ "id=" + "'" + productID + "'" + " " + "onclick='saveProductId(id)'></a><h4>" 
        + productName + "</h4><div>" + review + "</div><p>$" + productCost + "</p>";
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





    
  
