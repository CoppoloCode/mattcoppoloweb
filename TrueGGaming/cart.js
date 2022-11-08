

  if(document.cookie == ''){
    document.cookie = "user=0; path=/;";
    document.cookie = "cart=; path=/;";
    document.cookie = "qty=; path=/;";
  }

  let userID = document.cookie.split('user=')[1].split(';')[0];

  class Cart{
    constructor(products,subTotal){
      this.products = products;
      this.subTotal = subTotal;
    }
  }
  class CookieCart{
    constructor(productIds, qty){
      this.productIds = productIds;
      this.qty = qty;
    }
  }
  
  let cart = new Cart([],0.0);
  let cookieCart = new CookieCart([],[]);

  cookieCart.productIds = document.cookie.split('cart=')[1].split(';')[0].split(',');
  cookieCart.qty = document.cookie.split('qty=')[1].split(';')[0].split(',');

  if(cookieCart.productIds.length > 0){
    cookieCart.productIds.length = cookieCart.productIds.length -1;
    cookieCart.qty.length = cookieCart.qty.length -1;
  }
  
  getCartProducts();
 
  $(document).on("click", "#cart", function() {
    getCartProducts();
    $(".shopping-cart").fadeToggle("fast");
  });


  function getCartProducts(){
    if(userID != 0){
      $.ajax({
        url: 'cart.php',
        type: 'POST',
        dataType: 'json',
        data: {getCartItems: 'getCartItems'},
        success: function(data){
          getSelectedProducts(data);
          updateCookieCart(data);
        },
        error: function(err){
          console.log(err.responseText);
        },
      });

    }else{
        
        $.ajax({
          url: 'cart.php',
          type: 'POST',
          data: {getProductsForCookie: cookieCart.productIds},
          success: function(data){
            if(data != ''){
              data = JSON.parse(data);
              for(let i = 0; i < data.length; i++){
                data[i][4] = cookieCart.qty[i];
              }
            }
            getSelectedProducts(data);
            updateCookieCart(data);
          },
          error: function(err){
            console.log(err.responseText);
          },
        });
    }

  }
  
    $(document).on("click", ".AddtoCart", function(){

      let id = $(this).attr("id");
      let found = false;

      for(i = 0; i < cookieCart.productIds.length; i++){
        if(cookieCart.productIds[i] == id){
          found = true;
          break;
        }
      }
      if(!found){
          cookieCart.productIds.push(id);
          cookieCart.qty.push(1);
      }else{
          alert("Item already in cart");
        }
     
        
      
      if(userID != 0){
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

      }else{
        getCartProducts();
      }

      

    });


    $(document).on("click", ".RemoveFromCart", function(){

          let id = $(this).attr("id");

          for(i = 0; i < cookieCart.productIds.length; i++){
            if(cookieCart.productIds[i] == id){
              cookieCart.productIds.splice(i,1);
              cookieCart.qty.splice(i,1);
            }
          }
          
          if(userID != 0){
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

          }else{
            getCartProducts();
          }
          
      });

      $(document).on("change", ".item-quantity", function(){

        let id = $(this).attr("id");
        let value = $(this).val();

        for(i = 0; i < cart.products.length; i++){
          if(cart.products[i][0] == id){
            cart.products[i][4] = value;
          }
        }

        for(i = 0; i < cookieCart.productIds.length; i++){
          if(cookieCart.productIds[i] == id){
            cookieCart.qty[i] = value;
          }
        }

        let qty = cookieCart.qty.join() + ',';
        document.cookie = "qty="+qty+"; path=/;";

        if(userID != 0){
          $.ajax({
            url: 'cart.php',
            type: 'POST',
            data: {changeQty: value , productID: id},
            success: function(){            
              getUpdatedPrice();
            },
            error: function(err){
              console.log(err.responseText);
            }

          });
        }else{
          getUpdatedPrice();
        }

    });


  function getSelectedProducts(data){

    cart.products = data;

    setupBadge(cart.products);
    document.getElementById("shopping-cart-items").innerHTML = null;

    if(cart.products == null || cart.products == ''){
        document.getElementById("shopping-cart-items").innerHTML = "<h2 id='cartEmpty'> Your Cart is Empty </h2>";
        getUpdatedPrice();
    }else{
        for(let i = 0; i < cart.products.length; i++){
            setupCartProduct(cart.products[i]);
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
      document.getElementById("badge3").innerText = totalProducts;
  }


  function setupCartProduct(product){
        
    product[3] = parseFloat(product[3]);

    let productElements = "<li class='clearfix'> <img src='images/" + product[2] + "'" + " alt='item1' /> <span class='item-name'>"+ product[1] 
    +"</span><div><span id='cost-"+product[0]+"' class='item-price'>$"+product[3]+"</span> <td><input class='item-quantity' id='"
    + product[0] + "'" + "type='number' value='"+ product[4] +
    "' min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'></td><a class='RemoveFromCart' id='" 
    + product[0] + "'" + "><i class='fa fa-trash' aria-hidden='true'></i></a></div></li>";
  
    document.getElementById("shopping-cart-items").innerHTML += productElements;

  }


  function getUpdatedPrice(){

    let productPrice = [];

    if(cart.products != null){
      cart.subTotal = 0;
      for(i = 0; i < cart.products.length; i++){
        productPrice[i] = cart.products[i][3] * cart.products[i][4];
      }
      for(i = 0; i < productPrice.length; i++){
        cart.subTotal += productPrice[i];
      }
    }else{

      cart.subTotal = 0;

    }
    setupTotalPrice();
  }

  function setupTotalPrice(){

    let subTotal = cart.subTotal.toFixed(2);
    let tax = subTotal * .06;
    tax = tax.toFixed(2);
    let Total = parseFloat(subTotal) + parseFloat(tax);
    Total = Total.toFixed(2);
    let priceElement = '<span class="lighter-text">Subtotal: $' + subTotal + '</span><span class="lighter-text">Tax: $' + tax + 
    '</span><span class="lighter-text">Total: $' + Total + '</span>';
    
    document.getElementById("shopping-cart-total").innerHTML = priceElement;
  }

  function updateCookieCart(data){

    let cart = '';
    let qty = '';
    
    if(data != null){
      for(i = 0; i < data.length; i++){
        cart += data[i][0] + ',';
        qty += data[i][4] + ',';

      }
    }

    document.cookie = "cart="+cart+"; path=/;";
    document.cookie = "qty="+qty+"; path=/;";

  }

  function mergeCart(){
    
    $.ajax({
        url: "cart.php",
        type: "POST",
        data: {Cart: cookieCart.productIds, Quantity: cookieCart.qty},
        error: function(err){
            console.log(err.responseText);
        }
    })


}