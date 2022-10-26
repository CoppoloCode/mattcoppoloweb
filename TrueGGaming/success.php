<?php

    require_once 'configPayPal.php';

    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $db = new mysqli("localhost", "root", "", "mattcoppolodatabase");
    $db->set_charset('utf8mb4');

    if($db->connect_errno){
        die("connect failed: ". $db->connect_error);
    }

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

            $stmt = $db->prepare("INSERT INTO payment_info(user_id, payment_id, payer_id, payer_email, amount, currency, payment_status) VALUES
            (?, ?, ?, ?, ?, ?, ?)");
            $stmt->bind_param('sssssss', $user_id, $payment_id, $payer_id, $payer_email, $amount, $currency, $payment_status);
            $stmt->execute();
            $result = $stmt->get_result();

            header("Location: http://localhost/mattcoppoloweb/successPage.html", true, 301);

        }else{
            echo $response->getMessage();
        }
     }else{
        header("Location: http://localhost/mattcoppoloweb/store.html", true, 301);
     }

     $db->close();
     
?>