
if(document.cookie == ''){
    document.cookie = "user=0; expires= date.setDate(date.getDate() + 1); path=/;";
  }else{
    document.cookie = document.cookie + "; expires= date.setDate(date.getDate() + 1); path=/;"
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
                                <button id="payments" onclick="payments()">Your Payment Methods</button>   
                                </div>`;
const accountModifyElement =`<div class="account-title">
                                <button id='smallBtn' onclick="setupAccount()">Go Back</button>
                                <h1>Your Account Info</h1>
                            </div>
                            <div class="accountModify">
                                <div class="accountInfo">
                                    <div class="email"></div>
                                    <div class="password"></div>
                                    <div class="address"></div>
                                    <div class="firstName"></div>
                                    <div class="lastName"></div>
                                </div>
                            </div>`;
const previousOrdersElement = `<button id='smallBtn'onclick="setupAccount()">Go Back</button><div class="title"><h1> Your Previous Orders </h1></div>`;
const noPreviousOrdersElement = `<button id='smallBtn'onclick="setupAccount()">Go Back</button><div class="title"><h1> You Have not purchased anything yet...</h1></div>`;
const passwordElement = `<h2>Password:</h2>
                         <input id="passInput1" type="password" value=""></input>
                         <input id="passInput2" type="password" value=""></input>
                         <button id='passwordBtn' onclick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`;
const passwordsMatchElement = `<div class="noMatch"><small>Passwords do not match</small></div>`;
const passwordsBlankElement = `<div class="blank"><small>Password cannot be blank</small></div>`;


getAccountData();
function getAccountData(){
    
    $.ajax({
        url: "account.php",
        type: "POST",
        data: {getAccountData: 1},
        success: function(data){
            account.accountInfo = (JSON.parse(data));
            setupAccount();
        },
        error: function(err){
            console.log(err.responseText);
        }

    })
}


function signOut(){
    document.cookie = "user=0; expires= time() + 86400; path=/;";
    location.assign("sign-in.html");
}

function setupAccount(){
    let accountElement = `<div class="account-title"><h1>Welcome back `+ account.accountInfo.first_name +`</h1></div>`+accountButtonsElement;

    document.getElementsByClassName("account-container")[0].innerHTML = accountElement;

}

function accountModify(){

    let accountEmailElement =      `<h2>Email:</h2>
                                        <p>`+account.accountInfo.email+`</p>
                                        <button id='smallBtn' onclick="changeEmail()">Change</button>`;
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

    document.getElementsByClassName("account-container")[0].innerHTML = accountModifyElement;
    document.getElementsByClassName("email")[0].innerHTML = accountEmailElement;
    document.getElementsByClassName("password")[0].innerHTML = accountPasswordElement;
    document.getElementsByClassName("address")[0].innerHTML = accountAddressElement;
    document.getElementsByClassName("firstName")[0].innerHTML = accountFirstNameElement;
    document.getElementsByClassName("lastName")[0].innerHTML = accountLastNameElement;

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

    document.getElementsByClassName("password")[0].innerHTML = passwordElement;
    
}

function updatePassword(password1, password2){
    
    let passwordStatus = checkPasswords(password1, password2);

    if(passwordStatus){

        account.accountInfo.password = password2;
        

        $.ajax({
            url: "account.php",
            type: "POST",
            data: {changePassword: password2},
            success: function(){
                placePassword(password2);
            },
            error: function(err){
                console.log(err.responseText);
            }

        })
    
    }
}

function placePassword(password){

    document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <p id='password'>`+password+`</p>
                                                                <button id='smallBtn' onclick="changePassword()">Change</button>`;
}


function checkPasswords(pass1, pass2){

    if(pass1 != pass2){
        if(document.getElementsByClassName("noMatch")[0] == null){
            document.getElementsByClassName("password")[0].outerHTML += passwordsMatchElement;
            
        }
        return false;
    }else{
        if(document.getElementsByClassName("noMatch")[0] != null){
            document.getElementsByClassName("noMatch")[0].parentNode.removeChild(document.getElementsByClassName("noMatch")[0]);
        }
    }
    if((pass1 == '') || (pass2 == '')){
        if(document.getElementsByClassName("blank")[0] == null){
            document.getElementsByClassName("password")[0].outerHTML += passwordsBlankElement;
            
        }
        return false;
    }else{
        if(document.getElementsByClassName("blank")[0] != null){
            document.getElementsByClassName("blank")[0].parentNode.removeChild(document.getElementsByClassName("blank")[0]);
        }                                                        
    }

    return true;
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
    if(products.length > 0){

        document.getElementsByClassName("account-container")[0].innerHTML = previousOrdersElement;

        products.forEach(product =>{
            document.getElementsByClassName("account-container")[0].innerHTML += `<div class="product"><img src="images/`+ product.Image + `"></img>
                                                                                  <small>`+ product.Description + `</small>
                                                                                  <div class="date"><p>Date Purchased: </p><e id='date'>`+ product.Date +`</e></div>
                                                                                  <div class="price"><p>Price: </p><e id='cost'>$` + product.Cost + `</e></div></div>`;
        });

    }else{
        document.getElementsByClassName("account-container")[0].innerHTML = noPreviousOrdersElement;
    }
}