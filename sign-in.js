$(document).ready(function(){
        
    if(userID != '0'){
        location.assign("account.html");
    }
    


    $(document).on("click","#Sign-In", function(){

        let email = $("#email").val();
        let password = $("#password").val();

        if(checkBlankInputs(email,password)){
            $.ajax({
                url: "sign-in.php",
                type: "POST",
                data: {signIn: 1, email, password},
                success: function(data){
                    if (data != "account not found"){
                        document.cookie = "user="+data+"; path=/;";
                        mergeCart();
                        location.assign("account.html");
                    }else{
                        wrongEmailorPassword();
                    }
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        }

        

    })

    $(document).on("click","#Create-New-Account", function(){

        createAccountPage();

    })
    $(document).on("click","#back", function(){

        location.assign('sign-in.html');

    })


    $(document).on("click","#Create-Account", function(){

        let email = $("#email").val();
        let password = $("#password1").val();
        let confirmPass = $("#confirmPassword").val();
        let address = $("#address").val();
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();

        if((checkPasswords(password,confirmPass) == true) && (checkBlankInputs(email,password,address,firstName,lastName) == true)){
            $.ajax({
                url: "sign-in.php",
                type: "POST",
                data: {createAccount: 1, email, password, address, firstName, lastName},
                success: function(data){
                    if(data == 0){
                        accountCreated(data);
                    }else{
                        document.cookie = "user="+data+"; path=/;";
                        accountCreated(data);
                        mergeCart();
                    }
                    
                },
                error: function(err){
                    console.log(err.responseText);
                }
            })
        }
        
    })

    $(document).on("change", "#confirmPassword, #password1", function(){

        let pass = $("#password1").val();
        let confirmPass = $("#confirmPassword").val();

        checkPasswords(pass, confirmPass);

    })

})

function checkPasswords(pass, confirmPass){
    
    
    if(pass != confirmPass){
        if(document.getElementById("noMatch") != null){
            document.getElementById("noMatch").outerHTML = null;
            document.getElementsByClassName("confirm-password")[0].insertAdjacentHTML("afterEnd", "<small id='noMatch'>Passwords do not match.</small>");
        }else{
            document.getElementsByClassName("confirm-password")[0].insertAdjacentHTML("afterEnd", "<small id='noMatch'>Passwords do not match.</small>");
        }
        return false;
    }
    else{
        if(document.getElementById("noMatch") != null){
            document.getElementById("noMatch").outerHTML = null;
        }
        return true;
    }

}

function checkBlankInputs(email,password,address,firstName,lastName){

    if((email == '') || (password == '') || (address == '') || (firstName == '') || (lastName == '')){
        alert("All fields must be filled out.");
        return false;
    }else{
        return true;
    }

}

function wrongEmailorPassword(){
    document.getElementsByClassName("account-title")[0].innerHTML = `<h1>Sign In to Your Account</h1>`;
    document.getElementsByClassName("account-title")[0].innerHTML += `<small> Wrong Email or Password </small>`;
}


function createAccountPage(){

    let createAccountElement = `<div class="email">
                                    <label>Email:</label><input type="text" id="email">
                                </div>
                                <div class="password">
                                    <label>Pass:</label><input type="password" id="password1">
                                </div>
                                <div class="confirm-password">
                                    <label>Confirm Pass:</label><input type="password" id="confirmPassword">
                                </div>
                                <div class="address">
                                    <label>Address:</label><input type="text" id="address">
                                </div>
                                <div class="firstName">
                                    <label>First Name:</label><input type="text" id="firstName">
                                </div>
                                <div class="lastName">
                                    <label>Last Name:</label><input type="text" id="lastName">
                                </div>`;

    let createAccountButtonElement = '<button id="back">Back to Sign In</button><button id="Create-Account">Create New Account</button>';
    document.getElementsByClassName("account-title")[0].innerHTML = "<h1>Create Account</h1>";
    document.getElementsByClassName("input-row")[0].innerHTML = createAccountElement;
    document.getElementsByClassName("button-row")[0].innerHTML  = createAccountButtonElement;

}

function accountCreated(msg){
    if(msg == 0){
        alert("You already have an account with that email."); 
    }else{
       location.assign('account.html');
    }

}
