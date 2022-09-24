<?php
require_once 'configPayPal.php';

if(isset($_POST['submit'])){

    $db = new mysqli('localhost', 'root','', 'mattcoppolodatabase');
    if($db->connect_errno){
        die("connect failed: ". $db->connect_error);
    }

    $user_id = USER_ID;
    $sql = "SELECT * FROM cart WHERE user_ID = $user_id";
    
    $result = $db->query($sql); 
    
    $i = 0;
    while($row = $result->fetch_assoc()){

        $productId[$i] = $row['product_ID'];
        $quantity[$i] = $row['qty'];
    
        $i++;
    }
    
    $result = '';
    for($i = 0; $i < sizeof($productId); $i++){
        $id = $productId[$i];
        $sql2[$i] = "SELECT * FROM products WHERE ID = $id";
        $result = $db->query($sql2[$i]);
        while($row = $result->fetch_assoc()){

            $products[$i] = $row;
        
        }
    }

    $total = 0.00;
    $i = 0;
    foreach($products as $product){
       
        $total += (float)$product['Cost'] * (int)$quantity[$i]; 
        $i++;
        
    }
    echo json_encode( $quantity).$total;
    $items = array();
    $i = 0;
    foreach($products as $row){
        $items []= array (
                          'name' => $row['Name'], 
                          'price' => (float)$row['Cost'],
                          'description' => '',
                          'quantity' => (int)$quantity[$i],
                          'product_id' => $row['ID']);
        $i++;
    }
    $order_details = array(
            'amount' => $total,
            'currency' => PAYPAL_CURRENCY,
            'returnUrl' => PAYPAL_RETURN_URL,
            'cancelUrl' => PAYPAL_CANCEL_URL,
    );
   
    
    try{
        $purchase = $gateway->purchase($order_details)->setItems($items);
        $response = $purchase->send();
        
       
        if($response -> isRedirect()){
            $response->redirect();
        }
        else{
            echo $response -> getMessage();
            echo json_encode($response -> getData());
        }
    }catch(Exception $err){
        echo get_class($err). "\n";
        echo $err -> getMessage(); 
        echo json_encode($err -> getData());
    }
}



$db->close(); 

?>