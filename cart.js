$(document).ready(function($){

  $(document).on("click", ".AddtoCart", function(){
    let id = $(this).attr("id");
    $.ajax({
      url: 'cart.php',
      type: 'POST',
      data: {addToCart: 1  , productID: id},
      success: function(){
        getCartProducts(); 
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
          success: function(){
            getCartProducts(); 
          },
          error: function(err){
            console.log(err.responseText);
          }

        });
    });

    $(document).on("change", ".item-quantity", function(){

      let id = $(this).attr("id");
      let value = $(this).val();
      $.ajax({
        url: 'cart.php',
        type: 'POST',
        data: {changeQty: value , productID: id},
        success: function(){
          for(i = 0; i < selectedProducts.products.length; i++){
            if(selectedProducts.products[i][0] == id){
              selectedProducts.products[i][4] = value;
            }
          }
          getUpdatedPrice();
        },
        error: function(err){
          console.log(err.responseText);
        }

      });
  });


  
  function getCartProducts(){
    
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
      
  }

  $(".shopping-cart").toggle()
  $(document).on("click", "#cart", function() {
    getCartProducts()
    $(".shopping-cart").fadeToggle("fast");
  });


  getCartProductsCount();
  function getCartProductsCount(){
    $.ajax({
      url: 'cart.php',
      type: 'POST',
      dataType: 'json',
      data: {getCartItems: 'getCartItems'},
      success: function(data){
        setupBadge(data);
      },
      error: function(err){
        console.log(err.responseText);
      },
    });
  }

});

class Products{
  constructor(products,subTotal){
    this.products = products;
    this.subTotal = subTotal;
  }
}

let selectedProducts = new Products([],0.0);


function getSelectedProducts(data){

  selectedProducts.products = data;

  setupBadge(selectedProducts.products);
  document.getElementById("shopping-cart-items").innerHTML = null;

  if(selectedProducts.products == null){
      document.getElementById("shopping-cart-items").innerHTML = "<h2 id='cartEmpty'> Your Cart is Empty </h2>";
      getUpdatedPrice();
  }else{
      for(let i = 0; i < selectedProducts.products.length; i++){
          setupCartProduct(selectedProducts.products[i]);
      }
      getUpdatedPrice();
  }
}

function setupBadge(products){
    let totalProducts;
    if(products == null){
      totalProducts = 0;
    }else{
      totalProducts = products.length;
    }
    document.getElementById("badge1").innerText = totalProducts;
    document.getElementById("badge2").innerText = totalProducts;
}


function setupCartProduct(product){
       
  product[3] = parseFloat(product[3]);

  let productElements = "<li class='clearfix'> <img src='images/" + product[2] + "'" + " alt='item1' /> <span class='item-name'>"+ product[1] 
  +"</span><span id='cost-"+product[0]+"' class='item-price'>$"+product[3]+"</span> <td><input class='item-quantity' id='"
  + product[0] + "'" + "type='number' value='"+ product[4] +
  "' min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'></td><a class='RemoveFromCart' id='" 
  + product[0] + "'" + "><i class='fa fa-trash' aria-hidden='true'></i></a></li>";
 
  document.getElementById("shopping-cart-items").innerHTML += productElements;

}


function getUpdatedPrice(){

  let productPrice = [];

  if(selectedProducts.products != null){
    selectedProducts.subTotal = 0;
    for(i = 0; i < selectedProducts.products.length; i++){
      productPrice[i] = selectedProducts.products[i][3] * selectedProducts.products[i][4];
    }
    for(i = 0; i < productPrice.length; i++){
      selectedProducts.subTotal += productPrice[i];
    }
  }else{

    selectedProducts.subTotal = 0;

  }
  setupTotalPrice();
}

function setupTotalPrice(){

  let subTotal = selectedProducts.subTotal.toFixed(2);
  let tax = subTotal * .06;
  tax = tax.toFixed(2);
  let Total = parseFloat(subTotal) + parseFloat(tax);
  Total = Total.toFixed(2);
  let priceElement = '<span class="lighter-text">Subtotal: $' + subTotal + '</span><span class="lighter-text">Tax: $' + tax + 
  '</span><span class="lighter-text">Total: $' + Total + '</span>';
  
  document.getElementById("shopping-cart-total").innerHTML = priceElement;
}

