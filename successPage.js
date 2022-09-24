
function goHome(){
    window.location = "store.html";
}

function goAccount(){
    window.location = "account.html";
}


getCartProducts();
function getCartProducts(){
    
    $.ajax({
      url: 'cart.php',
      type: 'POST',
      dataType: 'json',
      data: {getCartItems: 'getCartItems'},
      success: function(data){
        if(data != null){
            storeBoughtProducts();
        }
      },
      error: function(err){
        console.log(err.responseText);
      },
    });
      
  }

  function storeBoughtProducts(data){

    let products = data;

    $.ajax({
        url: 'successPage.php',
        type: 'POST',
        dataType: 'json',
        data: {storeProducts: products},
        success: removeCartItems,
        error: function(err){
          console.log(err.responseText);
        },
      });


  }

  function removeCartItems(){

    $.ajax({
      url: 'successPage.php',
      type: 'POST',
      data: {removeFromCart: 'all'},
      error: function(err){
        console.log(err.responseText);
      }

    });

  }

