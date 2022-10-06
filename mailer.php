<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require_once 'vendor/autoload.php';

function sendVerificationEmail(){
   
    $mail = new PHPMailer(true);
    $mail->isSMTP(true);
    $mail->SMTPOptions = array(
        'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
        )
    
    );
    $mail->SMTPDebug = 2;
    $mail->Host = "coppolomatthew@gmail.com";
    $mail->SMTPAuth = true;
    $mail->UserName = "coppolomatthew@gmail.com";
    $mail->Password = "RawZero007";
    $mail->addAddress("matthewcoppolo@yahoo.com");
    
    $mail->isHTML(true);
    $mail->Subject = "Verify Email";
    $mail->Body = "<p> Please click the link to Verify your Email. </p> <href=''>Verfiy Email</href>";
    try{
        $mail->send();
        echo "Mail sent";
    }catch(Exception $e){
        echo "Mailer Error: " . $mail->ErrorInfo;
    }
}
?>