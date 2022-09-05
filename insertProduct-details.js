
/* ------------recieves ID and calls functions to create image and description -----------*/

function saveProductId(productId){

    let chosenProductId = productId;
    localStorage.setItem("chosenProductId", chosenProductId);

}

function setProductDetails(products){
    
    let chosenProductId = localStorage.getItem("chosenProductId");
    let productImageElement;
    let productDescriptionElement;
    let productPriceElement;
    let productReviewElement;
    
    productImageElement = getImageElement(products, chosenProductId);
    productDescriptionElement = getDescription(products, chosenProductId);
    productReviewElement = getReviewElement(products, chosenProductId);
    productPriceElement = getPriceELement(products, chosenProductId);
    document.getElementById("showImage").innerHTML = productImageElement;
    document.getElementById("showInfo").innerHTML = productDescriptionElement;
    document.getElementById("showReview").innerHTML = productReviewElement;
    document.getElementById("showPrice").innerHTML = productPriceElement;
    
}

/* ------------gets the image of a product and stores in local storage -----------*/

function getImageElement(products, productId){

    let productImageElement;
    
    productImageElement =  "<img src='images/" + products[productId-1][2] + "'" + ">"+"</img>"; 
    return  productImageElement;

}


/* ------------gets the description of a product and stores in local storage -----------*/


function getDescription(products, productId){

    let productDescription = products[productId-1][5];
    let productDescriptionElement;
    productDescriptionElement = "<small>" + productDescription + "</small>";
    return productDescriptionElement;
    

}

function getReviewElement(products, productId){
    let productReviewElement;
    let productReview = products[productId-1][3];
    productReviewElement = setReviewElement(productReview);
    return productReviewElement;
}

function setReviewElement(productReview){
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

function getPriceELement(products, productId){

    let productPriceElement;
    productPriceElement = '<p>' + products[productId-1][4] + '</p>';
    return productPriceElement 

}

        