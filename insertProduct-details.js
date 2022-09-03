
/* ------------recieves ID and calls functions to create image and description -----------*/

function setupDetails(productId){

    
    let productDescriptions;

    setImageElement(productId);
    productDescriptions = getDescriptionsFromDataBase();
    setDescription(productDescriptions, productId);
    


}

/* ------------gets the image of a product and stores in local storage -----------*/

function setImageElement(productId){

    let productImageElement;
    productImageElement = document.getElementById(productId).outerHTML;
    productImageElement = productImageElement.split('onclick="setupDetails(id)"').join('');
    localStorage.setItem("productImageElement" ,  productImageElement);

}


/* ------------gets the description of a product and stores in local storage -----------*/


function setDescription(productDescriptions, productId){

    let productDescription;
    productDescriptions = productDescriptions.split("\\n");
    productDescriptions.length = productDescriptions.length - 1;
    productDescription = productDescriptions[productId];
    productDescription = '<p>' + productDescription + '</p>';
    localStorage.setItem("productDescription" ,  productDescription);
    

}

function setImageandDescription(){
    document.getElementById("showImage").innerHTML = localStorage.getItem("productImageElement");
    document.getElementById("showInfo").innerHTML = localStorage.getItem("productDescription");
}

function getDescriptionsFromDataBase(){
    $.ajax({
        url: 'getDescription.php',
        type: 'POST',
        success: function(data){                   
            let descriptions = data;
            return descriptions;  
        }
    });
}
        