
if(userID == '0'){
        location.assign("sign-in.html");
}else{
    getAccountData();
}

class accountInfo{
    constructor(accountInfo){
        this.accountInfo = accountInfo;
    }
}

const account = new accountInfo([]);

const accountButtonsElement =  `<div class="buttons">
                                <button id="orders" onclick="getOrders()">Your Orders</button>
                                <button id="login-security" onclick="accountModify()">Login & Security</button>    
                                </div>`;
const accountModifyElement =`<div class="account-title">
                                <h1>Your Account Info</h1>
                            </div>
                            <div class="accountInfo">
                                <div class="email"></div>
                                <div class="password"></div>
                                <div class="address"></div>
                                <div class="firstName"></div>
                                <div class="lastName"></div>
                            </div>`;
const previousOrdersElement = `<div class="title"><h1> Your Previous Orders </h1></div>`;
const noPreviousOrdersElement = `<div class="title"><h1> No Orders </h1></div>`;
const deleteAccountButtonElement = `<button class="deleteAccount" onclick="deleteAccountAlert()">Delete Account</button>`;


function getAccountData(){
    
    $.ajax({
        url: "account.php",
        type: "POST",
        data: {getAccountData: 1},
        success: function(data){
            if(data != 0){
                account.accountInfo = (JSON.parse(data));
                setupAccount();
            }
            else{
                document.cookie = "user=0; path=/;"
                location.assign("sign-in.html")
            }
        },
        error: function(err){
            console.log(err.responseText);
        }

    })
}


function signOut(){
    document.cookie = "user=0; path=/;";
    document.cookie = "cart=; path=/;";
    document.cookie = "qty=; path=/;";
    location.assign("sign-in.html");
}

function setupAccount(){
    let accountElement = `<div class="account-title"><h1>Welcome back `+ account.accountInfo.first_name +`</h1></div>`+accountButtonsElement;

    document.getElementsByClassName("back-btn-container")[0].innerHTML = ``;
    document.getElementsByClassName("account-container")[0].innerHTML = accountElement;

}

function accountModify(){

    let accountEmailElement =      `<h2>Email:</h2>
                                        <p>`+account.accountInfo.email+`</p><p></p>`;
    let accountPasswordElement =   `<h2>Password:</h2>
                                        <p id = 'password'>`+account.accountInfo.password+`</p>
                                        <button id='smallBtn' onclick="changePassword()">Change</button>`;
    let accountAddressElement =    `<h2>Address:</h2>
                                        <p id = 'address'>`+account.accountInfo.address+`</p>
                                        <button id='smallBtn' onclick="changeAddress()">Change</button>`;
    let accountFirstNameElement =  `<h2>First Name:</h2>
                                        <p>`+account.accountInfo.first_name+`</p>
                                        <button id='smallBtn' onclick="changeFirstName()">Change</button>`;

    let accountLastNameElement =  `<h2>Last Name:</h2>
                                        <p>`+account.accountInfo.last_name+`</p>
                                        <button id='smallBtn' onclick="changeLastName()">Change</button>`;                                    

    document.getElementsByClassName("back-btn-container")[0].innerHTML = `<button id='smallBtn'onclick="setupAccount()">Go Back</button>`;
    document.getElementsByClassName("account-container")[0].innerHTML = accountModifyElement;
    document.getElementsByClassName("email")[0].innerHTML = accountEmailElement;
    document.getElementsByClassName("password")[0].innerHTML = accountPasswordElement;
    document.getElementsByClassName("address")[0].innerHTML = accountAddressElement;
    document.getElementsByClassName("firstName")[0].innerHTML = accountFirstNameElement;
    document.getElementsByClassName("lastName")[0].innerHTML = accountLastNameElement;
    document.getElementsByClassName("account-container")[0].innerHTML += deleteAccountButtonElement;

}

function changeEmail(){

    document.getElementsByClassName("email")[0].innerHTML = `<h2>Email:</h2>
                                                             <input id="changeEmail"type="text" value="`+account.accountInfo.email+`"></input>
                                                             <button id='smallBtn' onClick="updateEmail(document.getElementById('changeEmail').value)">Save</button>`;

}

function updateEmail(email){

    account.accountInfo.email = email;

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeEmail: email},
        success: function(){
            placeEmail(email);
        },
        error: function(err){
            console.log(err.responseText);
        }

    })

}

function placeEmail(email){
    document.getElementsByClassName("email")[0].innerHTML = `<h2>Email:</h2>
                                                                  <p>`+email+`</p>
                                                                  <button id='smallBtn' onclick="changeEmail()">Change</button>`;
}

function changePassword(){
    document.cookie = "user=0; path=/;";
    location.assign('sign-in.html?updatePass');
}
function changeAddress(){

    document.getElementsByClassName("address")[0].innerHTML = `<h2>Address:</h2>
                                                                <input id="addressInput" type="text" value="`+account.accountInfo.address+`"></input>
                                                                <button id='smallBtn' onclick="updateAddress(document.getElementById('addressInput').value)">Save</button>`;
}

function updateAddress(address){

    account.accountInfo.address = address;
    

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeAddress: address},
        success: function(){
            placeAddress(address);
        },
        error: function(err){
            console.log(err.responseText);
        }

    })

}
function placeAddress(address){
    document.getElementsByClassName("address")[0].innerHTML = `<h2>Address:</h2>
                                                               <p>`+address+`</p>
                                                               <button id='smallBtn' onclick="changeAddress()">Change</button>`;
}

function changeFirstName(){

    document.getElementsByClassName("firstName")[0].innerHTML = `<h2>First Name:</h2>
                                                                 <input id='firstNameInput' type="text" value="`+account.accountInfo.first_name+`"></input>
                                                                 <button id='smallBtn' onclick="updateFirstName(document.getElementById('firstNameInput').value)">Save</button>`;
}

function updateFirstName(firstName){

    account.accountInfo.first_name = firstName;
    

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeFirstName: firstName},
        success: function(){
            placeFirstName(firstName);
        },
        error: function(err){
            console.log(err.responseText);
        }

    })
}
function placeFirstName(firstName){
    document.getElementsByClassName("firstName")[0].innerHTML = `<h2>First Name:</h2>
                                                                 <p>`+firstName+`</p>
                                                                 <button id='smallBtn' onclick="changeFirstName()">Change</button>`;
}

function changeLastName(){

    document.getElementsByClassName("lastName")[0].innerHTML = `<h2>Last Name:</h2>
                                                                <input id ='lastNameInput' type="text" value="`+account.accountInfo.last_name+`"></input>
                                                                <button id='smallBtn' onclick="updateLastName(document.getElementById('lastNameInput').value)">Save</button>`;

}

function updateLastName(lastName){

    account.accountInfo.last_name = lastName;

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeLastName: lastName},
        success: function(){
            placeLastName(lastName);
        },
        error: function(err){
            console.log(err.responseText);
        }

    });

}

function placeLastName(lastName){
    document.getElementsByClassName("lastName")[0].innerHTML = `<h2>Last Name:</h2>
                                                                <p>`+lastName+`</p>
                                                                <button id='smallBtn' onclick="changeLastName()">Change</button>`;
}

function deleteAccountAlert(){
    let selection;
    if(confirm("Are you Sure You Want To Delete Your Account?")){
        selection = true;
    }else{
        selection = false;
    }
    if(selection){
        deleteAccount();
    }
}

function deleteAccount(){

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {deleteAccount: 1},
        success: function(data){
            signOut();
        },
        error: function(err){
            console.log(err.responseText);
        }

    });
}

function getOrders(){

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {getOrders: 1},
        success: function(data){
           orders(data);
        },
        error: function(err){
            console.log(err.responseText);
        }

    });

}
function orders(data){
    
    let products = [];
    
    products = JSON.parse(data);
    
    document.getElementsByClassName("back-btn-container")[0].innerHTML = `<button id='smallBtn'onclick="setupAccount()">Go Back</button>`;
    if(products.length > 0){

        document.getElementsByClassName("account-container")[0].innerHTML = previousOrdersElement;
        document.getElementsByClassName("account-container")[0].innerHTML += `<div class="products"></div>`;

        products.forEach(product =>{
            document.getElementsByClassName("products")[0].innerHTML += `<div class="product">
                                                                                    <img src="images/`+ product.Image + `"></img>
                                                                                    <small>`+ product.Description + `</small>
                                                                                    <div class="date"><p>Date Purchased: </p><e id='date'>`+ product.Date.split(" ")[0] +`</e></div>
                                                                                    <div class="price"><p>Price: </p><e id='cost'>$` + product.Cost + `</e></div>
                                                                                  </div>`;
        });

    }else{
        document.getElementsByClassName("account-container")[0].innerHTML = noPreviousOrdersElement;
    }
}