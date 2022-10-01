

  if(document.cookie == ''){
    document.cookie = "user=0; path=/;";
    document.cookie = "cart=; path=/;";
    document.cookie = "qty=; path=/;";
  }

  userID = document.cookie.replace("cart=",'').split('user=')[1].split(';')[0];

  
    $(document).on("click", ".AddtoCart", function(){

      let id = $(this).attr("id");
      
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

      }

        let cart = document.cookie.split('cart=')[1].split(';')[0];
        let qty = document.cookie.split('qty=')[1].split(';')[0];
        
        if(cart.includes(id) == false){
          cart = cart + id + ',';
          qty = qty + '1' + ',';
          document.cookie = "cart="+cart+"; path=/;";
          document.cookie = "qty="+qty+"; path=/;";
          getCartProducts();
        }else{
          alert("Item already in cart");
        }
      

    });


    $(document).on("click", ".RemoveFromCart", function(){

          let id = $(this).attr("id");
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

          }
            let cart = document.cookie.split('cart=')[1].split(';')[0];
            let qty = document.cookie.split('qty=')[1].split(';')[0];
            cart = cart.split(',');
            cart.length = cart.length - 1;
            qty = qty.split(',');
            qty.length = qty.length - 1;


            for(i = 0; i < cart.length; i++){
              if(cart[i] == id){
                cart[i] = '0';
                qty[i] = '0';
              }
            }

            cart = cart.join() + ',';
            cart = cart.replace('0,', '');
            qty = qty.join() + ',';
            qty = qty.replace('0,', '');
            document.cookie = "cart="+cart+"; path=/;";
            document.cookie = "qty="+qty+"; path=/;";

            getCartProducts();
          
       

      });

      $(document).on("change", ".item-quantity", function(){

        let id = $(this).attr("id");
        let value = $(this).val();

          if(userID != 0){
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
          }
          
            let cart = document.cookie.split('cart=')[1].split(';')[0];
            let qty = document.cookie.split('qty=')[1].split(';')[0];
            cart = cart.split(',');
            cart.length = cart.length - 1;
            qty = qty.split(',');
            qty.length = qty.length - 1;


            for(i = 0; i < cart.length; i++){
              if(cart[i] == id){
                qty[i] = value;
              }
            }

            qty = qty.join() + ',';
            document.cookie = "qty="+qty+"; path=/;";

            getCartProducts();
          

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

        let qty = document.cookie.split('qty=')[1].split(';')[0];
        qty = qty.split(',');
        qty.length = qty.length - 1;
        let productIDs = document.cookie.replace("user=",'').split('cart=')[1].split(';')[0];
        productIDs = productIDs.split(',');
        productIDs.length = productIDs.length - 1;

          $.ajax({
            url: 'cart.php',
            type: 'POST',
            data: {getProductsForCookie: productIDs},
            success: function(data){
              if(data != ''){
                data = JSON.parse(data);
              }
              for(let i = 0; i < data.length; i++){
                data[i][4] = qty[i];
              }
              getSelectedProducts(data);
              
            },
            error: function(err){
              console.log(err.responseText);
            },
          });
      }

    }

  class Products{
    constructor(products,subTotal){
      this.products = products;
      this.subTotal = subTotal;
    }
  }

    let selectedProducts = new Products([],0.0);

    getCartProducts();
    $(".shopping-cart").toggle()
    $(document).on("click", "#cart", function() {
      getCartProducts();
      $(".shopping-cart").fadeToggle("fast");
    });

  


  function getSelectedProducts(data){

    selectedProducts.products = data;

    setupBadge(selectedProducts.products);
    document.getElementById("shopping-cart-items").innerHTML = null;

    if(selectedProducts.products == null || selectedProducts.products == ''){
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
