
class Page{
    constructor(products, productCounter, productElements){
        this.products = products;
        this.productCounter = productCounter;
        this.productElements = productElements;
    }
}

let page = new Page([],0,[]);

function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: getProducts,
    });
}

 function getProducts(data){         
                
    page.products = data;
   
    setProductDetails(page.products);
    getShuffledProducts();
             
}
function getShuffledProducts(){
    let shuffledProducts = [];
    shuffledProducts = shuffleProducts(page.products);
    getProductsElements(shuffledProducts);

}
function getProductsElements(shuffledProducts){
    page.productElements = getProductElements(shuffledProducts);
    setProducts(page.productElements);
}

function setProducts(productElements){

    let productPlacementId = "product-";
    
    for(let i = 1; i < 5; i++){
        
        if(page.productCounter >= page.products.length){
            page.productCounter = 0;
        }else if(page.productCounter < 0){
            page.productCounter = page.products.length-5;
        }
        document.getElementById(productPlacementId + i).innerHTML = productElements[page.productCounter];
        page.productCounter++;
    }       
}

function changeProductsRight(){
    setProducts(page.productElements);
}
function changeProductsLeft(){
    page.productCounter -= 8;
    setProducts(page.productElements);
}





/* ------------gathers differecnt HTML Elemnts for product details -----------*/

function setProductDetails(products){

    
    
    let chosenProductId = localStorage.getItem("chosenProductId");
    let productImageElement;
    let productDescriptionElement;
    let productPriceElement;
    let productReviewElement;
    let productNameElement;

    
    productNameElement = getNameElement(products, chosenProductId);
    productImageElement = getImageElement(products, chosenProductId);
    productDescriptionElement = getDescription(products, chosenProductId);
    productReviewElement = getReviewElement(products, chosenProductId);
    productPriceElement = getPriceELement(products, chosenProductId);
    document.getElementById("showName").innerHTML = productNameElement;
    document.getElementById("showImage").innerHTML = productImageElement;
    document.getElementById("showInfo").innerHTML = productDescriptionElement;
    document.getElementById("showReview").innerHTML = productReviewElement;
    document.getElementById("showPrice").innerHTML = productPriceElement;
    
}

/* ------------gets the Name of a product  -----------*/

function getNameElement(products, productId){

    let productName = products[productId-1][1]

    productNameElement = '<p>'+productName +'</p>';

    return productNameElement;
}

/* ------------gets the image of a product  -----------*/

function getImageElement(products, productId){

    let productImageElement;
    
    productImageElement =  "<img src='images/" + products[productId-1][2] + "'" + ">"+"</img>"; 
    return  productImageElement;

}


/* ------------gets the description of a product -----------*/


function getDescription(products, productId){

    let productDescription = products[productId-1][5];
    let productDescriptionElement;
    productDescriptionElement = "<small>" + productDescription + "</small>";
    return productDescriptionElement;
    

}
/* ------------gets the Review of a product  -----------*/

function getReviewElement(products, productId){
    let productReviewElement;
    let productReview = products[productId-1][3];
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

function getPriceELement(products, productId){

    let productPriceElement;
    productPriceElement = '<p>' + '$' + products[productId-1][4] + '</p>';
    return productPriceElement 

}
