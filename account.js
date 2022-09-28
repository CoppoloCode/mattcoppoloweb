
if(document.cookie != ''){
    userId = document.cookie.split('user=')[1];
}else{
    document.cookie = "user=0; expires= time() + 86400; path=/;";
    userId = document.cookie.split('user=')[1];
}

if((userId == undefined) || (userId == '0') || (userId == '')){
    location.assign("sign-in.html");
}

class accountInfo{
    constructor(accountInfo){
        this.accountInfo = accountInfo;
    }
}


let account = new accountInfo([]);

getAccountData();

function getAccountData(){
    
    $.ajax({
        
        url: "account.php",
        type: "POST",
        data: {getUserId: userId},
        dataType: "json",
        success: function(data){
            account.accountInfo = (JSON.stringify((data)));
            account.accountInfo = account.accountInfo.split(",");
            for(i = 0; i < account.accountInfo.length; i++){
                account.accountInfo[i] = account.accountInfo[i].split(":");
            }
            for(i = 0; i < account.accountInfo.length; i++){
                account.accountInfo[i] = account.accountInfo[i][1].replaceAll('"',"");
            }
            account.accountInfo[5] = account.accountInfo[5].replaceAll("}","");
            account.accountInfo = account.accountInfo;
            setupAccountInfo();
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

function setupAccountInfo(){

    let accountInfo = account.accountInfo;

    
 

    let accountElement = ` <div class="account-title">
                                <h1>Welcome back `+ accountInfo[4] +`</h1>
                            </div>
                            <div class="buttons">
                                <button id="orders" onclick="getOrders()">Your Orders</button>
                                <button id="login-security" onclick="accountModify()">Login & Security</button> 
                                <button id="payments" onclick="payments()">Your Payment Methods</button>   
                            </div>`;


    document.getElementsByClassName("account-container")[0].innerHTML = accountElement;

}

function accountModify(){

    let accountInfo = account.accountInfo;

    let accountModifyElement = `<div class="account-title">
                                    <button id='smallBtn' onclick="setupAccountInfo()">Go Back</button>
                                    <h1>Your Account Info</h1>
                                </div>
                                <div class="accountModify">
                                    <div class="accountInfo">
                                        <div class="email"> 
                                            <h2>Email:</h2>
                                            <p>`+accountInfo[1]+`</p>
                                            <button id='smallBtn' onclick="changeEmail()">Change</button>
                                        </div>
                                        <div class="password"> 
                                            <h2>password:</h2>
                                            <p id = 'password'>`+accountInfo[2]+`</p>
                                            <button id='smallBtn' onclick="changePassword()">Change</button>
                                        </div>
                                        <div class="address"> 
                                            <h2>address:</h2>
                                            <p id = 'address'>`+accountInfo[3]+`</p>
                                            <button id='smallBtn' onclick="changeAddress()">Change</button>
                                        </div>
                                        <div class="firstName">
                                            <h2>First Name:</h2>
                                            <p>`+accountInfo[4]+`</p>
                                            <button id='smallBtn' onclick="changeFirstName()">Change</button>
                                        </div>
                                        <div class="lastName">
                                            <h2>Last Name:</h2>
                                            <p>`+accountInfo[5]+`</p>
                                            <button id='smallBtn' onclick="changeLastName()">Change</button>
                                        </div>
                                    </div>
                                </div>`;
    document.getElementsByClassName("account-container")[0].innerHTML = accountModifyElement;

}

function changeEmail(){

    document.getElementsByClassName("email")[0].innerHTML = `<h2>Email:</h2>
                                                             <input id="changeEmail"type="text" value="`+account.accountInfo[1]+`"></input>
                                                             <button onClick="updateEmail(document.getElementById('changeEmail').value)">Save</button>`;

}

function updateEmail(email){

    account.accountInfo[1] = email;
    userId = account.accountInfo[0];

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeEmail: email, user_Id: userId},
        success: function(){
            document.getElementsByClassName("email")[0].innerHTML = `<h2>Email:</h2>
                                                                  <p>`+account.accountInfo[1]+`</p>
                                                                  <button onclick="changeEmail()">Change</button>`;
        },
        error: function(err){
            console.log(err.responseText);
        }

    })

}

$(document).on("click","#passwordBtn",function(){

    let pass1 = $("#passInput1").val();
    let pass2 = $("#passInput2").val();

    if(pass1 != pass2){
        if(document.getElementsByClassName("noMatch")[0] != null){
            document.getElementsByClassName("noMatch")[0].innerHTML = '';
        }
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button id='passwordBtn' onClick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`
        document.getElementsByClassName("password")[0].outerHTML += `<div class="noMatch"><small>Passwords do not match</small></div>`;
    }else{
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button id='passwordBtn' onClick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`;
        document.getElementsByClassName("noMatch")[0].innerHTML = '';
    }
    if((pass1 == '') || (pass2 == '')){

        if(document.getElementsByClassName("blank")[0] != null){
            document.getElementsByClassName("blank")[0].innerHTML = '';
        }
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button id='passwordBtn' onClick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`
        document.getElementsByClassName("password")[0].outerHTML += `<div class="blank"><small>Password cannot be blank</small></div>`;

    }else{
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button id='passwordBtn' onClick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`;
        if(document.getElementsByClassName("blank")[0] != null){
            document.getElementsByClassName("blank")[0].innerHTML = '';
        }                                                        
    }
})

function changePassword(){

    document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value=""></input>
                                                                <input id="passInput2" type="password" value=""></input>
                                                                <button id='passwordBtn' onclick="updatePassword(document.getElementById('passInput1').value,document.getElementById('passInput2').value)">Save</button>`;
}

function updatePassword(password1, password2){                            

    if((password1 == password2) && (password1 != '') && (password2 != '')){

        account.accountInfo[2] = password1;
        userId = account.accountInfo[0];

        $.ajax({
            url: "account.php",
            type: "POST",
            data: {changePassword: password1, user_Id: userId},
            success: function(){
                document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                    <p id='password'>`+account.accountInfo[2]+`</p>
                                                                    <button onclick="changePassword()">Change</button>`;
            },
            error: function(err){
                console.log(err.responseText);
            }

        })
    
    }
}

function changeAddress(){

    document.getElementsByClassName("address")[0].innerHTML = `<h2>Address:</h2>
                                                                <input id="addressInput" type="text" value="`+account.accountInfo[3]+`"></input>
                                                                <button onclick="updateAddress(document.getElementById('addressInput').value)">Save</button>`;
}

function updateAddress(address){

    account.accountInfo[3] = address;
    userId = account.accountInfo[0];

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeAddress: address, user_Id: userId},
        success: function(){
            document.getElementsByClassName("address")[0].innerHTML = `<h2>Address:</h2>
                                                                    <p>`+account.accountInfo[3]+`</p>
                                                                    <button onclick="changeAddress()">Change</button>`;
        },
        error: function(err){
            console.log(err.responseText);
        }

    })

}


function changeFirstName(){

    document.getElementsByClassName("firstName")[0].innerHTML = `<h2>First Name:</h2>
                                                                <input id='firstNameInput' type="text" value="`+account.accountInfo[4]+`"></input>
                                                                <button onclick="updateFirstName(document.getElementById('firstNameInput').value)">Save</button>`;
}

function updateFirstName(firstName){

    account.accountInfo[4] = firstName;
    userId = account.accountInfo[0];

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeFirstName: firstName, user_Id: userId},
        success: function(){
            document.getElementsByClassName("firstName")[0].innerHTML = `<h2>First Name:</h2>
                                                                    <p>`+account.accountInfo[4]+`</p>
                                                                    <button onclick="changeFirstName()">Change</button>`;
        },
        error: function(err){
            console.log(err.responseText);
        }

    })
}

function changeLastName(){

    document.getElementsByClassName("lastName")[0].innerHTML = `<h2>Last Name:</h2>
                                                                <input id ='lastNameInput' type="text" value="`+account.accountInfo[5]+`"></input>
                                                                <button onclick="updateLastName(document.getElementById('lastNameInput').value)">Save</button>`;

}

function updateLastName(lastName){

    account.accountInfo[5] = lastName;
    userId = account.accountInfo[0];

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeLastName: lastName, user_Id: userId},
        success: function(){
            document.getElementsByClassName("lastName")[0].innerHTML = `<h2>Last Name:</h2>
                                                                    <p>`+account.accountInfo[5]+`</p>
                                                                    <button onclick="changeLastName()">Change</button>`;
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
    if(products.length > 0){

        document.getElementsByClassName("account-container")[0].innerHTML = `<button id='smallBtn'onclick="setupAccountInfo()">Go Back</button><div class="title"><h1> Your Previous Orders </h1></div>`;
    
        let i = 0;
        products.forEach(product =>{
            i++;
            document.getElementsByClassName("account-container")[0].innerHTML += `<div class="product"><img src="images/`+ product.Image + `"></img>
                                                                                <small>`+ product.Description + `</small>
                                                                               <div class="date"><p>Date Purchased: </p><e id='date'>`+ product.Date +`</e></div>
                                                                                <div class="price"><p>Price: </p><e id='cost'>$` + product.Cost + `</e></div></div>`;
        });

    }else{
        document.getElementsByClassName("account-container")[0].innerHTML = `<button id='smallBtn'onclick="setupAccountInfo()">Go Back</button><div class="title"><h1> You Have not purchased anything yet...</h1></div>`;
    }
}