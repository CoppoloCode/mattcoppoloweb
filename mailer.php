<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
require_once 'vendor/autoload.php';

function sendVerificationEmail($email,$hash){
   
    $hash = 'http://localhost/mattcoppoloweb/sign-in.html?'.$hash;
    $mail = new PHPMailer(true);
    $mail->isSMTP(true);
    $mail->Host = "smtp.gmail.com";
    $mail->SMTPAuth = true;
    $mail->Username = "coppolomatthew@gmail.com";
    $mail->Password = "lyjnukhhukkglmju";
    $mail->SMTPSecure = 'tsl';
    $mail->Port = "587";
    $mail->setFrom('coppolomatthew@gmail.com', 'TrueGGaming');
    $mail->addAddress($email);
    
    $mail->isHTML(true);
    $mail->Subject = "Verify Email";
    $mail->Body = "<h2> Please click the link to Verify your Email. </h2> <a href='$hash'>Verfiy Email</a>";
    try{
        $mail->send();
    }catch(Exception $e){
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>