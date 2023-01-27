
if(window.location.href.includes("verify=")){
    let verificationCode = window.location.href.split("verify=")[1];
    verifyEmail(verificationCode);
}

function signIn(){


    let email = $("#email").val();
    let password = $("#pass").val();

    $.ajax({
        url: "signin.php",
        type: "POST",
        data: {signIn: true, email, password},
        success: function(data){
            console.log(data);
            if(data == "SUCCESS"){
                console.log(`login successful.`);
                
            }else{
                console.log(`failed to login.`);
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
