<?php

require_once "config.php";

$userID = $_COOKIE['user'];

if(isset($_POST['storeProducts'])){
    $products = $_POST['storeProducts'];
    
    $date = date('Y-m-d');

    foreach($products as $product){
        $productID = $product[0];
        $stmt = $conn->prepare("INSERT INTO purchases (user_ID, product_id, Date) VALUES (? , ? , ?)");
        $stmt->bind_param('sss', $userID, $productID, $date);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt = $conn->prepare("UPDATE products SET Quantity = Quantity - 1 WHERE ID = $productID");
        $stmt->bind_param('s', $productID);
        $stmt->execute();
        $result = $stmt->get_result();

    }
   echo ($result);
}

if(isset($_POST['removeFromCart'])){
    
    $stmt = $conn->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->bind_param('s', $userID);
    $stmt->execute();
    $result = $stmt->get_result();

}

$conn -> close();

?>