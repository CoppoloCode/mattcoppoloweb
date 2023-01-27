
$(document).on("change", "#pass1, #pass2", function(){
    validatePassword();
})

if(window.location.href.includes("verify=")){
    let verificationCode = window.location.href.split("verify=")[1];
    verifyEmail(verificationCode);
}

function validatePassword(){

    let pass1 = $("#pass1").val();
    let pass2 = $("#pass2").val();

    if(!(pass1 === pass2)){
        document.getElementById("pass2").setCustomValidity("Passwords Don't Match");
    }else{
        document.getElementById("pass2").setCustomValidity("");
    }

}

function submitForm(){

    let email = $("#email").val();
    let userName = $("#userName").val();
    let pass = $("#pass1").val();
    document.body.style.cursor='wait';

    $.ajax({
        url: "signup.php",
        type: "POST",
        data: {createAccount: true, email, userName, pass},
        success: function(data){
            document.body.style.cursor='default';
            if(data.includes("email already exists.")){
                alert("Email already exists.");
                
            }else if(data.includes("User Name already exists.")){
                alert("User Name already exists.");
            }else if(data.includes("Email failed to send.")){
                alert("Email failed to send. Please check spelling or enter valid email.");

            }else if(data.includes("Email sent.")){
                alert("An Email has been sent. Please verify by clicking the link in your Email.");
                
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })

    
}

function verifyEmail(verificationCode){
    
    $.ajax({
        url: "signup.php",
        type: "POST",
        data: {verifyEmail: verificationCode},
        success: function(data){
            if(data == "VERIFICATION COMPLETE"){
                console.log(`Success! Your account has been created.`);
                
            }else{
                console.log(`Email Verification has expired. Please create an account and verify within an hour.`);
            }
        },
        error: function(err){
            console.log(err.responseText);
        }
    })
    
}

function gotoHome(){

    window.location.assign("index.html");

}