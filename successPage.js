
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
            storeBoughtProducts(data);
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
        data: {storeProducts: products},
        success: function(data){
          console.log(data);
          removeCartItems();
        },
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
      success: function(){
        window.location = "successPage.html";
      },
      error: function(err){
        console.log(err.responseText);
      }

    });

    document.cookie = "cart=; path=/;";
    document.cookie = "qty=; path=/;";

  }

