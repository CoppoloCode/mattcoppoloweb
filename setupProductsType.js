
class Page{
    constructor(productCounter,products, view){
        this.productCounter = productCounter;
        this.products = products;
        this.view = view;
    }
}

let page = new Page(0,[],0);


function setTypeName(){
    let typeName;
    typeName = localStorage.getItem("chosenProductType");
    typeName = typeName.toString();
    setTypeTitle(typeName);
    getProductsFromDataBaseType(typeName);
}

function setTypeTitle(typeName){
    document.getElementById("title").innerText = "All " + typeName + 's';
}

function getProductsFromDataBaseType(typeName){

    $.ajax({
        url: 'getProductsType.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: 'getProductsSortedReview', typename: typeName},
        success: getProductTypeElements,
    });
}  

function getProductTypeElements(data){         
    
    page.products = getProductElements(data);
    
    page.view = window.screen.availWidth;
    
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
    
    if(page.view > 800){
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
    }else{
        
        setupProduct(page.products[page.productCounter],2);
      
    }

}



function setupProduct(product,productNum){

    let productNumString = (productNum).toString();

    
    document.getElementsByClassName("col-" + productNumString)[0].innerHTML = product;
    

    if(productNum != 2){
        if(document.getElementsByClassName("col-" + productNumString)[0].getElementsByClassName("AddtoCart")[0] != null){
            document.getElementsByClassName("col-" + productNumString)[0].getElementsByClassName("AddtoCart")[0].remove();
        }else{
            document.getElementsByClassName("col-" + productNumString)[0].getElementsByClassName("out-of-stock")[0].remove();
        }
    }
   
    
}



/* ------------creates the Name Element of a product  -----------*/
 
function getNameElement(product){

    let productName = product[1];

    productNameElement = '<p id="'+product[0]+'">'+ productName +'</p>';

    return productNameElement;
}

/* -----------creates the Image Element of a product  -----------*/

function getImageElement(product){

    let productImageElement;
    
    productImageElement =  "<img src='images/" + product[2] + "'" + ">"+"</img>"; 
    return  productImageElement;

}

/* ------------creates the price Element of a product  -----------*/

function getPriceELement(product){

    let productPriceElement;
    productPriceElement = '<p>' + '$' + product[4] + '</p>';
    return productPriceElement 

}

