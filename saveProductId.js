
/* ------------recieves ID and saves to local storage -----------*/


function saveProductId(productId){


    localStorage.setItem("chosenProductId", productId);

}

function AddtoCart(){

    localStorage.setItem("Cart",  localStorage.getItem("Cart") + "," + localStorage.getItem("chosenProductId"));
    
}
