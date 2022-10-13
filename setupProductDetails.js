if(screen.availWidth < 920){
    for(let i = 2; i < 5; i++){
        document.getElementById("product-" + i).remove();
    }
}

class Page{
    constructor(products, productCounter, productElements,view){
        this.products = products;
        this.productCounter = productCounter;
        this.productElements = productElements;
        this.view = view;
    }
}

let page = new Page([],0,[],0);

function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: setProductDetails,
    });
}

 function setProductDetails(data){         
                
    page.products = data;
    page.view = screen.availWidth;
    setProductDetailsElements(page.products);
    shuffledProducts = shuffleProducts(page.products);
    page.productElements = getProductElements(shuffledProducts);
    setProducts(page.productElements);
}

function setProducts(productElements){

    let productPlacementId = "product-";
    
    if(page.view > 920){
        for(let i = 1; i < 5; i++){
            if(page.productCounter >= page.products.length){
                page.productCounter = 0;
            }else if(page.productCounter < 0){
                page.productCounter = page.products.length-5;
            }
            document.getElementById(productPlacementId + i).innerHTML = productElements[page.productCounter];
            page.productCounter++;
        } 
    }else{
        if(page.productCounter >= page.products.length){
            page.productCounter = 0;
        }else if(page.productCounter < 0){
            page.productCounter = page.products.length-1;
        }
        document.getElementById(productPlacementId + 1).innerHTML = productElements[page.productCounter];
    }     
    
}

function changeProductsRight(){
    if(page.view > 920){
        setProducts(page.productElements);
    }else{
        page.productCounter++;
        setProducts(page.productElements);
    }
}
function changeProductsLeft(){
    if(page.view > 920){
        page.productCounter -= 8;
        setProducts(page.productElements);
    }else{
        page.productCounter--;
        setProducts(page.productElements);
    }
}





/* ------------gathers different HTML Elements for product details -----------*/

function setProductDetailsElements(products){

    
    
    let chosenProductId = localStorage.getItem("chosenProductId");
    let productImageElement;
    let productDescriptionElement;
    let productPriceElement;
    let productReviewElement;
    let productNameElement;
    let quantity;

    for(i = 0; i < products.length; i++){
        if(products[i][0] == chosenProductId){
            productReviewElement = products[i][3];
            quantity = products[i][7];

        }
    }
    
    productNameElement = getNameElement(products, chosenProductId);
    productImageElement = getImageElement(products, chosenProductId);
    productDescriptionElement = getDescriptionElement(products, chosenProductId);
    productReviewElement = getReviewElement(productReviewElement);
    productPriceElement = getPriceElement(products, chosenProductId);
    document.getElementById("showName").innerHTML = productNameElement;
    document.getElementById("showImage").innerHTML = productImageElement;
    document.getElementById("showInfo").innerHTML = productDescriptionElement;
    document.getElementById("showReview").innerHTML = productReviewElement;
    document.getElementById("showPrice").innerHTML = productPriceElement;
    if(quantity > 0){
        document.getElementsByClassName("AddtoCart")[0].outerHTML = "<a id ='"+chosenProductId+"'class=AddtoCart> Add to Cart &#8594; </a>";
    }else{
        document.getElementsByClassName("AddtoCart")[0].outerHTML = `<p class="out-of-stock">OUT OF STOCK</p>`;
    }
    
}


/* ------------gets the Name of a product  -----------*/

function getNameElement(products, productId){

    let productName;
    for(i = 0; i < products.length; i++){
        if(products[i][0] == productId){
            productName = products[i][1];
        }
    }
    
    productNameElement = '<p id="'+productId+'">'+ productName +'</p>';

    return productNameElement;
}

/* ------------gets the image of a product  -----------*/

function getImageElement(products, productId){

    let productImage;
    for(i = 0; i < products.length; i++){
        if(products[i][0] == productId){
            productImage = products[i][2];
        }
    }
    productImageElement =  "<img src='images/" + productImage + "'" + ">"+"</img>"; 
    return  productImageElement;

}


/* ------------gets the description of a product -----------*/


function getDescriptionElement(products, productId){

    let productDescription;
    let productDescriptionElement;

    for(i = 0; i < products.length; i++){
        if(products[i][0] == productId){
            productDescription = products[i][5];
        }
    }
    
    productDescriptionElement = "<small>" + productDescription + "</small>";
    return productDescriptionElement;
    

}

/* ------------gets the Price of a product  -----------*/

function getPriceElement(products, productId){

    let productPrice;
    for(i = 0; i < products.length; i++){
        if(products[i][0] == productId){
            productPrice = products[i][4];
        }
    }
    productPriceElement = '<p>' + '$' + productPrice + '</p>';
    return productPriceElement 

}
