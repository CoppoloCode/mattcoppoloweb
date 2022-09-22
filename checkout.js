
userId = document.cookie.split('user=')[1];

if((userId == undefined) || (userId == '0') || (userId == '')){
    location.assign("sign-in.html");
}

class Cart{
    constructor(cartItems){
        cartItems = this.cartItems;
    }
}

let cart = new Cart([]);


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


function setupCheckout(){

    let cartItems;
    cartItems = cart.cartItems;
    console.log(cartItems[0][4]);


    if (cartItems.length > 0){
        if(document.getElementsByClassName('products')[0] != null){
            document.getElementsByClassName('products')[0].innerHTML = null;
        }
        document.getElementsByClassName("title")[0].innerHTML = `<h1>Your Cart</h1>`;
        for(let i = 0; i < cartItems.length;i++){
            let cost = (cartItems[i][3]*cartItems[i][4]).toFixed(2);
            document.getElementsByClassName("products")[0].innerHTML += `<div class="product"><div><p>`+cartItems[i][1]+`</p><img src="images/`+ cartItems[i][2]+ `"></div>`
            +`<div><p>Quantity:</p><input class="quantity"id="`+cartItems[i][0]+`"type="number" value="`+cartItems[i][4]+`" min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'><p>Price:`
            +cost+`</p></div></div>`;
        }
    
        
    }else{
        document.getElementsByClassName("title")[0].innerHTML = `<h1>No Items in Cart</h1>`;
    }
    
}

