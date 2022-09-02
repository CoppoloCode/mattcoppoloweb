/* ------------gets the image of a product and stores in local storage -----------*/

function getImageProduct(productId){
    var productElement = document.getElementById(productId).outerHTML
    var cutElement = productElement.split(" ");
    var productElement = cutElement[0] + ' ' + cutElement[1] + cutElement[2] + '>';
    localStorage.setItem("productSelected", productElement);
}

/*-------- setting product image and Info on Product-details.html ---------*/

function onLoad(){
    var productIdIndex = 3;
    document.getElementById("showImage").innerHTML = localStorage.getItem("productSelected");
    var productID = localStorage.getItem("productSelected").split('"');
    var productID = productID[productIdIndex];
    var productID = productID.split("");
    var productID = productID[0]+productID[1]+productID[2]+productID[3]+productID[4]+productID[5]+productID[6]+"Info"+productID[7];
    var cutInfoElement = document.getElementById(productID).outerHTML.split('hidden');
    var InfoElement = cutInfoElement[0] + cutInfoElement[1];
    document.getElementById("showInfo").innerHTML = InfoElement;
}