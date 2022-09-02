
/* ------------recieves ID and calls functions to create image and description -----------*/

function setupDetails(productId){
    setImageProduct(productId);
    setInfoProduct(productId);
}

/* ------------gets the image of a product and stores in local storage -----------*/

function setImageProduct(productId){
    var productElement = document.getElementById(productId).outerHTML
    var productElement = productElement.split('onclick="setupDetails(id)"').join('');
    localStorage.setItem("imageSelected", productElement);
    
}


/* ------------gets the description of a product and stores in local storage -----------*/

function setInfoProduct(productId){
    var productElement = document.getElementById(productId).outerHTML
    var productElement = productElement.split('"');
    var productId = productElement[3];
    localStorage.setItem("productId", productId);

    
}

function setDescription(productDescriptions){
    var productId = localStorage.getItem("productId");
    var productDescriptions = productDescriptions.split("\\n");
    productDescriptions.length = productDescriptions.length - 1;
    productDescription = productDescriptions[productId-1];
    localStorage.setItem("productDescription", productDescription);
    

}



/*-------- setting product image and Info on Product-details.html ---------*/

function onLoad(){

    document.getElementById("showImage").innerHTML = localStorage.getItem("imageSelected");
    document.getElementById("showInfo").innerHTML = '<p>' + localStorage.getItem("productDescription") + '</P>';

}
