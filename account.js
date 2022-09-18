

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
setupAccountInfo();

function getAccountData(){
    $.ajax({

        url: "account.php",
        type: "POST",
        data: {userId: userId},
        dataType: "json",
        success: function(data){
            account.accountInfo = (JSON.stringify((data)));
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
                                            <h2>Email:   </h2>
                                            <p>`+accountInfo[1]+`</p>
                                            <button>Change</button>
                                        </div>
                                        <div class="password"> 
                                            <h2>password:</h2>
                                            <p id = 'password'>`+accountInfo[2]+`</p>
                                            <button>Change</button>
                                        </div>
                                        <div class="firstName">
                                            <h2>First Name:    </h2>
                                            <p>`+accountInfo[4]+`</p>
                                            <button>Change</button>
                                        </div>
                                        <div class="lastName">
                                            <h2>Last Name:</h2>
                                            <p>`+accountInfo[5]+`</p>
                                            <button>Change</button>
                                        </div>
                                    </div>
                                </div>`;
    document.getElementsByClassName("account-container")[0].innerHTML = accountModifyElement;

}