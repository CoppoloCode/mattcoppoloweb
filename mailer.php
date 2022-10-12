<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once 'vendor/autoload.php';



function sendVerificationEmail($email,$hash){
   
    $hash = 'http://localhost/mattcoppoloweb/sign-in.html?verify='.$hash;

    $mail = new PHPMailer(true);
    $mail->isSMTP(true);
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "coppolomatthew@gmail.com";
    $mail->Password = "";
    $mail->SMTPSecure = 'tsl';
    $mail->Port = "587";
    $mail->setFrom('coppolomatthew@gmail.com', 'TrueGGaming');
    $mail->isHTML(true);
    
    $mail->addAddress($email);
    
    
    $mail->Subject = "Verify Email";
    $mail->Body = "<h2> Please click the link to Verify your Email. </h2> <a href='$hash'>Verfiy Email</a>";
    try{
        $mail->send();
        return true;
    }catch(Exception $e){
        echo "Mailer Error: " . $mail->ErrorInfo;
        return false;
    }
}
function sendForgotPasswordEmail($email,$hash){
   
    $hash = 'http://localhost/mattcoppoloweb/sign-in.html?passReset='.$hash;

    $mail = new PHPMailer(true);
    $mail->isSMTP(true);
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "coppolomatthew@gmail.com";
    $mail->Password = "clvxjcmsdfjdfd";
    $mail->SMTPSecure = 'tsl';
    $mail->Port = "587";
    $mail->setFrom('coppolomatthew@gmail.com', 'TrueGGaming');
    $mail->isHTML(true);
    
    $mail->addAddress($email);
    
    $mail->Subject = "Forgot Password";
    $mail->Body = "<h2> Please click the link to recover your password. </h2> <a href='$hash'>Change Password</a>";
    
    try{
        $mail->send();
        return true;
    }catch(Exception $e){
        echo "Mailer Error: " . $mail->ErrorInfo;
        return false;
    }
}
?>
