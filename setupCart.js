
class Products{
    constructor(selectedProducts){
        this.selectedProducts = selectedProducts;
    }
}

let allProducts = new Products([]);


function getSelectedProducts(data){

    allProducts.selectedProducts = data;
    document.getElementById("productsTable").innerHTML = "<tr><th>Product</th><th>Quantity</th><th>Subtotal</th></tr>";
    if(allProducts.selectedProducts == null){
        document.getElementById("cart").innerHTML = "<h2> Your Cart is Empty </h2>";
    }else{
        for(i = 0; i < allProducts.selectedProducts.length; i++){
            setupCartProduct(allProducts.selectedProducts[i]);
        }
        setupTotalPrice();
    }
}


function setupCartProduct(product){

       
    product[3] = parseFloat(product[3]);

    let productElements = "<tr><td><div class='cart-info'><img src='images/" + product[2] + "'" +
    "><div><p>" + product[1] + "</p><small>$" + product[3] +
    "</small><br><a class='RemoveFromCart' id='" + product[0] + "'" + ">Remove</a></div></div></td><td class='Quantity'><input id='"
    + product[0] + "'" + "onchange='getQuantity(id,value)' type='number' value='"+product[4]+"' min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'></td><td id='subtotal-"
    + product[0] +"'>$" + product[3]+ "</td></tr>";

    document.getElementById("productsTable").innerHTML += productElements;
    

}

function getQuantity(id,value){

    let quantity = value;
    let cost = 0.0;
    for(let i = 0; i < allProducts.selectedProducts.length; i++){
        if(allProducts.selectedProducts[i][0] == id){
            cost = allProducts.selectedProducts[i][3];
        }
    }
    cost = cost * quantity;
    cost = cost.toFixed(2);
    document.getElementById('subtotal-' + id).innerHTML = '$' + cost;    
    setupTotalPrice();
}


function setupTotalPrice(){

    subTotal = getSubTotal();
    subTotal = subTotal.toFixed(2);
    tax = subTotal * .06;
    tax = tax.toFixed(2);
    Total = parseFloat(subTotal) + parseFloat(tax);
    Total = Total.toFixed(2);
    

    let priceElement = "<tr><td>Subtotal</td><td>$"+subTotal+"</td></tr><tr><td>Tax</td><td>$"+tax+"</td></tr><tr><td>Total</td><td>$"+Total+"</td></tr>"

    document.getElementById("priceTable").innerHTML = priceElement;
}

function getSubTotal(){
    let subTotalList;
    let subTotal = 0.0;

    for(i = 0; i < allProducts.selectedProducts.length; i++){
        subTotalList += document.getElementById("subtotal-" + allProducts.selectedProducts[i][0]).innerHTML.split('$');
    }
    subTotalList = subTotalList.split(',');

    for(i = 1; i < subTotalList.length; i++){
        subTotal += parseFloat(subTotalList[i]);
    }

    return subTotal;
}