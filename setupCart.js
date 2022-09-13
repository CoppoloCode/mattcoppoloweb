
class Products{
    constructor(selectedProductsIds, products, selectedProducts){
        this.selectedProductIds = selectedProductsIds;
        this.products = products;
        this.selectedProducts = selectedProducts;
    }
}

let allProducts = new Products([],[],[]);

function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: getProducts,
    });
}

 function getProducts(data){         
                
    allProducts.products = data;
    getSelectedProducts();
}

function getSelectedProducts(){

    let chosenProducts = [];
    chosenProducts = localStorage.getItem("Cart").split(',');
    allProducts.selectedProductIds = chosenProducts;

    matchProduct();
}

function matchProduct(){

    let productCount = 0;
    
    allProducts.selectedProductIds = new Set(allProducts.selectedProductIds);
    allProducts.selectedProductIds = [...allProducts.selectedProductIds];

    if(allProducts.selectedProductIds[1] == null){
        document.getElementById("cart").innerHTML = "<h2> Your Cart is Empty </h2>";
    }else{

        document.getElementById("productsTable").innerHTML = "<tr><th>Product</th><th>Quantity</th><th>Subtotal</th></tr>";

        for(let i = 0; i < allProducts.selectedProductIds.length; i++){
            for(let j = 0; j < allProducts.products.length; j++){
                if(allProducts.products[j][0] == allProducts.selectedProductIds[i]){
                    allProducts.selectedProducts[productCount] = allProducts.products[j];
                    productCount++;
                    productElements = setupCartProduct(allProducts.products[j]);
                    document.getElementById("productsTable").innerHTML += productElements;
                }
            }
        }
        setupTotalPrice();
    }
}

function setupCartProduct(product){

    product[4] = parseFloat(product[4]);

    let productElements = "<tr><td><div class='cart-info'><img src='images/" + product[2] + "'" +
     "><div><p>" + product[1] + "</p><small>$" + product[4] +
     "</small><br><a id='" + product[0] + "'" + " onclick='removeProduct(id)'>Remove</a></div></div></td><td class='Quantity'><input id='"
     + product[0] + "'" + "onchange='getQuantity(id,value)' type='number' value='1' min='1' oninput='this.value = !!this.value && Math.abs(this.value) >= 1 ? Math.abs(this.value) : 1'></td><td id='subtotal-"
    + product[0] +"'>$" + product[4]+ "</td></tr>";

     return productElements;


}

function getQuantity(id,value){

    let quantity = value;
    let cost = 0.0;
    for(let i = 0; i < allProducts.selectedProducts.length; i++){
        if(allProducts.selectedProducts[i][0] == id){
            cost = allProducts.selectedProducts[i][4];
        }
    }
    cost = cost * quantity;
    cost = cost.toFixed(2);
    document.getElementById('subtotal-' + id).innerHTML = '$' + cost;    
    setupTotalPrice();
}
    
function removeProduct(id){

    for(let i = 0; i < allProducts.selectedProductIds.length; i++){
        if(allProducts.selectedProductIds[i] == id){
            allProducts.selectedProductIds.splice(i,1);
        }
    }
    localStorage.setItem("Cart", allProducts.selectedProductIds);
    matchProduct();

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
    let subTotalList = [];
    let subTotal = 0.0;

    for(i = 1; i < allProducts.selectedProductIds.length; i++){
        subTotalList += document.getElementById("subtotal-" + allProducts.selectedProductIds[i]).innerHTML.split('$');
    }
    subTotalList = subTotalList.split(',');

    for(i = 1; i < subTotalList.length; i++){
        subTotal += parseFloat(subTotalList[i]);
    }

    return subTotal;
}