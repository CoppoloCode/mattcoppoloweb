
class Page{
    constructor(buttonCounter){
        this.buttonCounter = buttonCounter;
    }
}

let page = new Page(0);


function setTypeName(){
    typeName = localStorage.getItem("chosenProductId");
    typeName = typeName.toString();
    getProductsFromDataBase(typeName);
}

function getProductsFromDataBase(typeName){

    $.ajax({
        url: 'getProductsType.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: 'getProductsSortedReview', typename: typeName},
        success: getProducts,
    });
}  

function getProducts(data){         
                    
    let products = data;

    sendProduct(products);
                      
}

function buttonIncrease(){
    page.buttonCounter++;
}

function buttonDecrease(){
    page.buttonCounter--;
}

function sendProduct(products){
    let i = 0;
    for(i; i < 3; i++){
        setupProduct(products[i],i);
    }
}



function setupProduct(product,productNum){

    
    
    let productImageElement;
    let productPriceElement;
    let productReviewElement;
    let productNameElement;
    let productNumString = (productNum+1).toString();

    console.log(productNumString);
    
    productNameElement = getNameElement(product);
    productImageElement = getImageElement(product);
    productReviewElement = getReviewElement(product);
    productPriceElement = getPriceELement(product);

    
    document.getElementById("showName-" + productNumString).innerHTML = productNameElement;
    document.getElementById("showImage-" + productNumString).innerHTML = productImageElement;
    document.getElementById("showReview-" + productNumString).innerHTML = productReviewElement;
    document.getElementById("showPrice-" + productNumString).innerHTML = productPriceElement;
    
   
    
}

/* ------------gets the Name of a product  -----------*/
 
function getNameElement(product){

    let productName = product[1]

    productNameElement = '<p>'+ productName +'</p>';

    return productNameElement;
}

/* ------------gets the image of a product  -----------*/

function getImageElement(product){

    let productImageElement;
    
    productImageElement =  "<img src='images/" + product[2] + "'" + ">"+"</img>"; 
    return  productImageElement;

}


/* ------------gets the Review of a product  -----------*/

function getReviewElement(product){
    let productReviewElement;
    let productReview = product[3];
    productReviewElement = setReviewElement(productReview);
    return productReviewElement;
}

/* ------------sets the Review Elements based on raiting of a product  -----------*/

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
/* ------------gets the Price of a product  -----------*/

function getPriceELement(product){

    let productPriceElement;
    productPriceElement = '<p>' + '$' + product[4] + '</p>';
    return productPriceElement 

}

