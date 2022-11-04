<?php

    require_once "vendor/autoload.php";

    use Omnipay\Omnipay;

    define('CLIENT_ID', 'AURVpiVYT_QFsexRqDkxYYvJ0mSUrg9yfb2f0twhuwo6ZkgvVtlwdoQnxNUTLWTkxnafhU9F7e6xBdU0');
    define('CLIENT_SECRET', 'ECOrcVKbUuSHbgfcUwDDp_4lb9zu2qk5ey26vrAIZsG_oJ_AVxAil5t6FKi9zoVJQOCaD3TollFDMneb');
    
    define('PAYPAL_RETURN_URL', 'http://localhost/mattcoppoloweb/TrueGGaming/success.php');
    define('PAYPAL_CANCEL_URL', 'http://localhost/mattcoppoloweb/TrueGGaming/cancel.php');
    define('PAYPAL_CURRENCY', 'USD');
    define('USER_ID' , $_COOKIE['user']);
    

    $gateway = Omnipay::create('PayPal_Rest');
    $gateway->setClientId(CLIENT_ID);
    $gateway->setSecret(CLIENT_SECRET);
    $gateway->setTestMode(true);


?>