<?php

    require_once 'configPayPal.php';

    require_once "config.php";

    if(array_key_exists('paymentId', $_GET) && array_key_exists('PayerID', $_GET)){
        $transaction = $gateway->completePurchase(array(
            'payer_id' => $_GET['PayerID'],
            'transactionReference' => $_GET['paymentId'],
        ));

        $response = $transaction->send();

        if($response->isSuccessful()){
            $arr_body = $response->getData();

            $payment_id = $arr_body['id'];
            $payer_id = $arr_body['payer']['payer_info']['payer_id'];
            $payer_email = $arr_body['payer']['payer_info']['email'];
            $amount = $arr_body['transactions'][0]['amount']['total'];
            $currency = PAYPAL_CURRENCY;
            $payment_status = $arr_body['state'];
            $user_id = USER_ID;

            $stmt = $conn->prepare("INSERT INTO payment_info(user_id, payment_id, payer_id, payer_email, amount, currency, payment_status) VALUES
            (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param('sssssss', $user_id, $payment_id, $payer_id, $payer_email, $amount, $currency, $payment_status);
            $stmt->execute();
            $result = $stmt->get_result();

            header("Location: successPage.html", true, 301);

        }else{
            echo $response->getMessage();
        }
     }else{
        header("Location: store.html", true, 301);
     }

     $conn->close();
     
?>