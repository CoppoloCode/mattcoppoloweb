
class Page{
    constructor(productCounter,products){
        this.productCounter = productCounter;
        this.products = products;
    }
}

let page = new Page(0);


function setTypeName(){
    typeName = localStorage.getItem("chosenProductId");
    typeName = typeName.toString();
    document.getElementById("title").innerText = "All " + typeName + 's';
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
                    
    page.products = data;
    sendProduct();                  
}

function productIncrease(){
    if(page.productCounter == page.products.length-1){
        page.productCounter = 0;
    }else{
        page.productCounter++;
    }
}

function productDecrease(){
    if(page.productCounter == 0){
        page.productCounter = page.products.length-1;
    }else{
        page.productCounter--;
    }
    
}

function sendProduct(){

    if(page.productCounter == page.products.length-1){
        setupProduct(page.products[page.productCounter-1],1);
        setupProduct(page.products[page.productCounter],2);
        setupProduct(page.products[0],3);   
    }
    else if(page.productCounter == 0){
        setupProduct(page.products[page.products.length-1],1);
        setupProduct(page.products[0],2);
        setupProduct(page.products[1],3);   
    }else{
        setupProduct(page.products[page.productCounter-1],1);
        setupProduct(page.products[page.productCounter],2);   
        setupProduct(page.products[page.productCounter+1],3);
    }

    
}



function setupProduct(product,productNum){

    
    
    let productImageElement;
    let productPriceElement;
    let productReviewElement;
    let productNameElement;
    let productNumString = (productNum).toString();

    
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

    let productName = product[1];

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

