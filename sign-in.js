$(document).ready(function(){
        
    if(userID != '0'){
        location.assign("account.html");
    }
    


    $(document).on("click","#Sign-In", function(){

        let email = $("#email").val();
        let password = $("#password1").val();

        
        $.ajax({
            url: "sign-in.php",
            type: "POST",
            data: {signIn: 1, email, password},
            success: function(data){
                console.log(data);
                if (data == "account not found." || data == "incorrect password."){
                    wrongEmailorPassword(data);
                }else{
                    accountCreated(data);
                }
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    

        

    })

    $(document).on("click","#Create-New-Account", function(){

        createAccountPage();

    })

    $(document).on("change", "#confirmPassword, #password", function(){

        validatePassword();

    })

})

if(window.location.href.includes("?")){
    let verificationCode = window.location.href.split("?")[1];
    verifyEmail(verificationCode);
}

function createAccount(){
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let address = document.getElementById("address").value;
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {createAccount: 1, email, password, address, firstName, lastName},
        success: function(data){
            console.log(data);
            if(data.includes("email already exists.")){
                emailAlreadyExists();
            }
            if(data.includes("verify email")){
                verifyEmail('');
            }
            
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}

function validatePassword(){
    if(document.getElementById("password").value != document.getElementById("confirmPassword").value) {
        document.getElementById("confirmPassword").setCustomValidity("Passwords Don't Match");
    } else {
        document.getElementById("confirmPassword").setCustomValidity('');
    }
  }


function wrongEmailorPassword(data){
    if(data == "account not found."){
        document.getElementsByClassName("account-title")[0].innerHTML = `<h1>Sign In to Your Account</h1>`;
        document.getElementsByClassName("account-title")[0].innerHTML += `<small> Email does not exist. </small>`;
    }else{
        document.getElementsByClassName("account-title")[0].innerHTML = `<h1>Sign In to Your Account</h1>`;
        document.getElementsByClassName("account-title")[0].innerHTML += `<small> Incorrect Password. </small>`;
    }
   
}

function emailAlreadyExists(){
    alert("You already have an account with that email.");
}

function createAccountPage(){

    let createAccountElement = `<form method="POST" onsubmit="createAccount(); return false"><div class="email">
                                    <label>Email:</label><input type="email" id="email" name="email" required>
                                </div>
                                <div class="password">
                                    <label>Pass:</label><input type="password" id="password" name="password" required>
                                </div>
                                <div class="confirm-password">
                                    <label>Confirm Pass:</label><input type="password" id="confirmPassword" required> 
                                </div>
                                <div class="address">
                                    <label>Address:</label><input type="text" id="address" name="address" required>
                                </div>
                                <div class="firstName">
                                    <label>First Name:</label><input type="text" id="firstName" name="firstName" required>
                                </div>
                                <div class="lastName">
                                    <label>Last Name:</label><input type="text" id="lastName" name="lastName" required>
                                </div>`;

    let createAccountButtonElement = '<button onclick="goBack()" id="back">Back to Sign In</button><button type="submit" id="Create-Account">Create New Account</button></form>';
    document.getElementsByClassName("account-title")[0].innerHTML = "<h1>Create Account</h1>";
    document.getElementsByClassName("input-row")[0].innerHTML = createAccountElement + createAccountButtonElement;
    document.getElementsByClassName("button-row")[0].innerHTML = '';

}

function verifyEmail(verificationCode){
    console.log(verificationCode);
    if(verificationCode == ''){
        document.getElementsByClassName("account-container")[0].innerHTML = "<h1> Please confirm your email address by clicking the link sent to your email. </h1>";
    }else{
        $.ajax({
            url: "sign-in.php",
            type: "POST",
            data: {verifyEmail: verificationCode},
            success: function(data){
                console.log(data);
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    }
}

function goBack(){

    location.assign('sign-in.html');

}



function accountCreated(msg){
    document.cookie = "user="+msg+"; path=/;";
    mergeCart();
    location.assign('account.html');

}
