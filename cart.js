

$(".AddtoCart").click(function(){
  let id = $(".Name p").attr("id");
  $.ajax({
    url: 'cart.php',
    type: 'POST',
    data: {addToCart: 1  , productID: id},
    success: function(data){
     alert(data);
    },
    error: function(err){
      console.log(err.responseText);
    }

  });
});

$(document).on("click", ".RemoveFromCart", function(){

      let id = $(this).attr("id");

      $.ajax({
        url: 'cart.php',
        type: 'POST',
        data: {removeFromCart: 1  , productID: id},
        success: getCartProducts,
        error: function(err){
          console.log(err.responseText);
        }

      });
  });

  $(document).on("change", ".Quantity input", function(){

    let id = $(this).attr("id");
    let value = $(this).val();
    
    $.ajax({
      url: 'cart.php',
      type: 'POST',
      data: {changeQty: value , productID: id},
      success: function(data){
        console.log(data);
      },
      error: function(err){
        console.log(err.responseText);
      }

    });
});


getCartProducts()
function getCartProducts(){

    if(document.title == "Cart"){

      $(document).ready(function(){

          $.ajax({
            url: 'cart.php',
            type: 'POST',
            dataType: 'json',
            data: {getCartItems: 'getCartItems'},
            success: getSelectedProducts,
            error: function(err){
              console.log(err.responseText);
            },
          });
      
      });
    } 

}




   







