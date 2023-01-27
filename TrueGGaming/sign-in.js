
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        location.reload();
    }
});
if(userID != '0'){
    location.assign("account.html");
}
else{
    setupSignInHTML();
}

$(document).on("change", "#confirmPassword, #password", function(){
    validatePassword();
})
if(window.location.href.includes("updatePass")){
    setupForgotPasswordHTML()
}
if(window.location.href.includes("verify=")){
    let verificationCode = window.location.href.split("verify=")[1];
    verifyEmail(verificationCode);
}
if(window.location.href.includes("passReset=")){
    createNewPasswordHTML();
}

function validatePassword(){
    if($("#password").val() != $("#confirmPassword").val()) {
        document.getElementById("confirmPassword").setCustomValidity("Passwords Don't Match");
    } else {
        document.getElementById("confirmPassword").setCustomValidity('');
    }
}



function setupSignInHTML(){

    let signInElement = ` <div class="account-title">
                                <h1>Sign In</h1>
                                <div class="notify"></div>
                            </div><form onsubmit="signIn(); return false" >
                            <div class="input-row">
                                <div class="sign-in-email">
                                    <label>Email:</label><input type="email" id="email" required>
                                </div>
                                <div class="sign-in-password">
                                    <label>Pass:</label><input type="password" id="password1" required>
                                </div>
                            </div>
                                <div class="button-row">
                                    <button id="Sign-In" type="submit">Sign In</button>
                                    <button id="Create-New-Account" onclick="setupCreateAccountHTML()">Create New Account</button>
                                </div>
                         </form>
                         <div class="forgotPassword">
                             <a id="forgotPassword" onclick="setupForgotPasswordHTML()">Forgot Password</a>
                         </div>`;

    document.getElementsByClassName("account-container")[0].innerHTML = signInElement;
}

function setupCreateAccountHTML(){

    let createAccountElement = `<div class="account-title">
                                    <h1>Create Account</h1>
                                    <div class="notify"></div>
                                </div>
                                <form onsubmit="createAccount(); return false">
                                    <div class ="input-row">
                                        <div class="email">
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
                                        </div>
                                        
                                        <div class="button-row">
                                            <button type="submit" id="Create-Account">Create Account</button>
                                            <button onclick="goBack()" id="back">Back to Sign In</button>
                                        </div>
                                   </div>
                                 </form>`;

   

    document.getElementsByClassName("account-container")[0].innerHTML = createAccountElement;
}

function setupForgotPasswordHTML(){

    let forgotPasswordElement = `<div class="account-title">
                                    <h1>Update Password</h1>
                                    <div class="notify">
                                        <p>Please enter you email and follow the link provided in the email.</p>
                                    </div>
                                 </div>
                                 <form onsubmit="forgotPassword(); return false">
                                    <div class="input-row">
                                        
                                        <label>Email:</label><input type="email" id="email" required>
                                        
                                    </div>
                                    <div class="button-row">
                                        <button type="submit">Send Email</button>
                                        <button onclick="goBack()" id="back">Back to Sign In</button>
                                    </div>
                                 </form>`;

    document.getElementsByClassName("account-container")[0].innerHTML = forgotPasswordElement;


}

function createNewPasswordHTML(){

    let changePasswordElement = `<div class="account-title">
                                    <h1>Forgot Password</h1>
                                    <p>Please enter you email and follow the link provided in the email.</p>
                                    <div class="notify"></div>
                                </div>
                                <form onsubmit="createNewPassword(); return false">
                                    <div class="input-row">
                                        <label>Password:</label><input type="password" id="password" required>
                                        <label>Confirm Password:</label><input type="password" id="confirmPassword" required>
                                    </div>
                                    <div class="button-row">
                                        <button onclick="goBack()" id="back">Back to Sign In</button>
                                        <button type="submit">Create Password</button>
                                    </div>
                                </form>`;

    document.getElementsByClassName("account-container")[0].innerHTML = changePasswordElement;

}


function signIn(){

    let email = $("#email").val();
    let password = $("#password1").val();

    
    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {signIn: 1, email, password},
        success: function(data){
            if(data == "account not found."){
                notifyUser(`<small> Email does not exist. </small>`);
             }else if(data.includes("incorrect password")){
                notifyUser(`<small> Incorrect Password. </small>`);
             }else if(!data.includes("<br")){
                accountCreated(data);
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}

function createAccount(){
    let email = $("#email").val();
    let password =$("#password").val();
    let address = $("#address").val();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();

    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {createAccount: 1, email, password, address, firstName, lastName},
        success: function(data){
            if(data.includes("email already exists.")){
                notifyUser("You already have an account with that email.");
            }else if(data == "verify email"){
                notifyUser("Please verify your email by following the link we sent to your email.");
            }else if(data.includes("failed to send email")){
                notifyUser("failed to send verification email");
            }else{
                notifyUser("Please verify your email by following the link we sent to your email.");
            }
            
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
}

function wrongEmailorPassword(data){
    if(data == "account not found."){
        
       notifyUser(`<small> Email does not exist. </small>`);
    }else{
       
        notifyUser(`<small> Incorrect Password. </small>`);
    }
   
}

function verifyEmail(verificationCode){
    
    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {verifyEmail: verificationCode},
        success: function(data){
            if(data == "VERIFICATION COMPLETE"){
                notifyUser(`Success! Your account has been created.`);
                
            }else{
                notifyUser(`Email Verification has expired. Please create an account and verify within an hour.`);
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
    
}

function goBack(){
    location.assign('sign-in.html');
}

function accountCreated(msg){
    document.cookie = "user="+msg+"; path=/;";
    mergeCart();
    location.assign('account.html');

}

function forgotPassword(){

    let email = $('#email').val();

    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {forgotPassword: email},
        success: function(data){
            if(data.includes("No account with that email.")){
                notifyUser("There is no account associated with that E-mail.");
            }else if(data.includes("Mailer Error:")){
                notifyUser("Failed to send. Try again.");
            }else{
                notifyUser("Please follow the link we sent to your email to reset your password. This may take a few minutes.");
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })

}


function createNewPassword(){

    let verificationCode = window.location.href.split("passReset=")[1];

    let pass = $("#password").val();
    

    $.ajax({
        url: "sign-in.php",
        type: "POST",
        data: {updatePassword: 1, verificationCode, pass},
        success: function(data){
            if(data == "error updating password"){
                notifyUser("An error occured in the verification proccess. please try again.");
            }else if(data == "proccess expired"){
                notifyUser("verification proccess has expired try again.")
            }
            else{
                setupSignInHTML();
                notifyUser("Your password has been changed.");
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
   

}
function notifyUser(notification){
   
    document.getElementsByClassName("notify")[0].innerHTML = notification;
    
   
}