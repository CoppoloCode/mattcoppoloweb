

userId = document.cookie.split('user=')[1];

if(userId == undefined){
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
        data: {userId: userId},
        dataType: "json",
        success: function(data){
            account.accountInfo = (JSON.stringify((data)));
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

    let accountInfo = account.accountInfo.split(",");

    for(i = 0; i < accountInfo.length; i++){
        accountInfo[i] = accountInfo[i].split(":");
    }
    for(i = 0; i < accountInfo.length; i++){
        accountInfo[i] = accountInfo[i][1].replaceAll('"',"");
    }
    accountInfo[5] = accountInfo[5].replaceAll("}","");
    account.accountInfo = accountInfo;
 

    let accountElement = ` <div class="account-title">
                                <h1>Welcome back `+ accountInfo[4] +`</h1>
                            </div>
                            <div class="buttons">
                                <button id="orders" onclick="orders()">Your Orders</button>
                                <button id="login-security" onclick="accountModify()">Login & Security</button> 
                                <button id="payments" onclick="payments()">Your Payments</button>   
                            </div>`;


    document.getElementsByClassName("account-container")[0].innerHTML = accountElement;

}

function accountModify(){

    let accountInfo = account.accountInfo;

    let accountModifyElement = `<div class="account-title">
                                    <h1>Your Account Info</h1>
                                </div>
                                <div class="accountModify">
                                    <div class="accountInfo">
                                        <div class="email"> 
                                            <h2>Email:</h2>
                                            <p>`+accountInfo[1]+`</p>
                                            <button onclick="changeEmail()">Change</button>
                                        </div>
                                        <div class="password"> 
                                            <h2>password:</h2>
                                            <p id = 'password'>`+accountInfo[2]+`</p>
                                            <button onclick="changePassword()">Change</button>
                                        </div>
                                        <div class="firstName">
                                            <h2>First Name:</h2>
                                            <p>`+accountInfo[4]+`</p>
                                            <button onclick="changeFirstName()">Change</button>
                                        </div>
                                        <div class="lastName">
                                            <h2>Last Name:</h2>
                                            <p>`+accountInfo[5]+`</p>
                                            <button onclick="changeLastName()">Change</button>
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

    $.ajax({
        url: "account.php",
        type: "POST",
        data: {changeEmail: email},
        success: function(data){
            
        },
        error: function(err){
            console.log(err.responseText);
        }



    })

}

$(document).on("change","#passInput1, #passInput2",function(){

    let pass1 = $("#passInput1").val();
    let pass2 = $("#passInput2").val();

    if(pass1 != pass2){
        if(document.getElementsByClassName("noMatch")[0] != null){
            document.getElementsByClassName("noMatch")[0].innerHTML = '';
        }
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button onClick="updatePassword()">Save</button>`
        document.getElementsByClassName("password")[0].outerHTML += `<div class="noMatch"><small>Passwords do not match</small></div>`;
    }else{
        document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value="`+pass1+`"></input>
                                                                <input id="passInput2" type="password" value="`+pass2+`"></input>
                                                                <button onClick="updatePassword()">Save</button>`;
        document.getElementsByClassName("noMatch")[0].innerHTML = '';
    }

})

function changePassword(){

    document.getElementsByClassName("password")[0].innerHTML = `<h2>Password:</h2>
                                                                <input id="passInput1" type="password" value=""></input>
                                                                <input id="passInput2" type="password" value=""></input>
                                                                <button onClick="updatePassword()">Save</button>`;
}

function updatePassword(){

    

}

function changeFirstName(){

    document.getElementsByClassName("firstName")[0].innerHTML = `<h2>First Name:</h2>
                                                                <input type="text" value="`+account.accountInfo[4]+`"></input>
                                                                <button onclick="changeFirstName()">Save</button>`;
}

function updateFirstName(){

}

function changeLastName(){

    document.getElementsByClassName("lastName")[0].innerHTML = `<h2>Last Name:</h2>
                                                                <input type="text" value="`+account.accountInfo[5]+`"></input>
                                                                <button onclick="changeFirstName()">Save</button>`;

}

function updateLastName(){


}