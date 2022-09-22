
userId = document.cookie.split('user=')[1];

if((userId == undefined) || (userId == '0') || (userId == '')){
    location.assign("sign-in.html");
}

class Cart{
    constructor(cartItems, total){
        cartItems = this.cartItems;
        total = this.total;
    }
}

let cart = new Cart([],0.0);


getCartItems();
function getCartItems(){
    
    $.ajax({
      url: 'cart.php',
      type: 'POST',
      dataType: 'json',
      data: {getCartItems: 'getCartItems'},
      success: function(data){
        cart.cartItems = data;
        setupCheckout();
      },
      error: function(err){
        console.log(err.responseText);
      },
    });
      
  }

$(document).on('change','.quantity', function(){

    let id = $(this).attr("id");
    let value = $(this).val();
    for(i = 0; i < cart.cartItems.length; i++){
        if(cart.cartItems[i][0] == id){
            cart.cartItems[i][4] = value;
        }
    }
    setupCheckout();
});

$(document).on("click", ".RemoveFromCheckout", function(){

    let id = $(this).attr("id");

    $.ajax({
        url: 'cart.php',
        type: 'POST',
        data: {removeFromCart: 1  , productID: id},
        success: function(){
          getCartItems(); 
        },
        error: function(err){
          console.log(err.responseText);
        }

    });

  });


function setupCheckout(){

    let cartItems;
    cartItems = cart.cartItems;
    
    setupBadge(cartItems);
    if(cartItems != null){
        if (cartItems.length > 0){
            if(document.getElementsByClassName('products')[0] != null){
                document.getElementsByClassName('products')[0].innerHTML = null;
            }
            document.getElementsByClassName("title")[0].innerHTML = `<h1>Your Cart</h1>`;
            for(let i = 0; i < cartItems.length; i++){
                let cost = (cartItems[i][3]*cartItems[i][4]).toFixed(2);
                document.getElementsByClassName("products")[0].innerHTML += `<div class="product"><div class="titleImg"><p>`+cartItems[i][1]+`</p><img src="images/`+ cartItems[i][2]+ `"></div>`
                +`<div class="quantityPrice"><p>Quantity: <input class="quantity"id="`+cartItems[i][0]+`"type="number" value="`+cartItems[i][4]+`" min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'></p><p>Price:
                <small>$`+cost+`</small></p><a class="RemoveFromCheckout" id="`+cartItems[i][0]+`"><i class="fa fa-trash" aria-hidden="true"></i></a></div></div>`;
            }
            setupTotal();
            setupBuyButton();
    }
    }else{
        document.getElementsByClassName("title")[0].innerHTML = `<h1>No Items in Cart</h1>`;
        document.getElementsByClassName('products')[0].innerHTML = null;
        document.getElementsByClassName('total')[0].innerHTML = null;
        document.getElementsByClassName('payForm')[0].innerHTML = null;
    }
    
}

function setupTotal(){

    let prices = [];
    let subTotal = 0.0;
    let total = 0.0;
    let tax = .06;
   
    for(i = 0; i < cart.cartItems.length; i++){
        prices[i] = (cart.cartItems[i][3]*cart.cartItems[i][4]).toFixed(2);
    }
    for(i = 0; i < prices.length; i++){
        subTotal += parseFloat(prices[i]);
    }
    tax = subTotal * tax;
    total = subTotal + tax;
    tax = tax.toFixed(2);
    subTotal = subTotal.toFixed(2);
    total = total.toFixed(2);
    cart.total = total;
    document.getElementsByClassName('total')[0].innerHTML = `<p>Sub-Total: <small>$`+subTotal+`</small></p><p>Tax: <small>$`+tax+`</small></p><p>Total: <small>$`+total+`</small></p>`;
}

function setupBuyButton(){
    
    
    document.getElementsByClassName('payForm')[0].innerHTML = `<input hidden type="text" name="name" value="`+cart.cartItems[0][1]+`">
                                                                <input hidden type="text" name="quantity" value="`+cart.cartItems[0][4]+`">
                                                                <input hidden type="text" name="amount" value="`+cart.total+`">
                                                                <input type="submit" name="submit" value="Buy Now">`;
                                                  
                                                               

}
