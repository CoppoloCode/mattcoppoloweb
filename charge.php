<?php
require_once 'configPayPal.php';

if(isset($_POST['submit'])){

    try{
        $response = $gateway->purchase(array(

            'user_id'=> $_COOKIE['user'],
            'amount' => $_POST['amount'],
            'currency' => PAYPAL_CURRENCY,
            'returnUrl' => PAYPAL_RETURN_URL,
            'cancelUrl' => PAYPAL_CANCEL_URL,
            'items' => array(
                array(
                    'name' => $_POST['name'],
                    'price' => $_POST['amount'],
                    'quantity' => $_POST['quantity'],
                )
            )
        ))-> send();
        
        if($response -> isRedirect()){
            $response->redirect();
        }else{
            echo $response-> getMessage();
        }
    }catch(Exception $err){
        echo $err -> getMessage();
    }
}

?>