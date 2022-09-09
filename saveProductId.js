
/* ------------recieves ID and saves to local storage -----------*/


function saveProductId(productId){

    console.log(productId);
    let chosenProductId = productId;
    localStorage.setItem("chosenProductId", chosenProductId);

}

        