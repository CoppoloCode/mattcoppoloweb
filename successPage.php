<?php


$db = new mysqli('localhost', 'root','', 'mattcoppolodatabase');
if($db->connect_errno){
    die("connect failed: ". $db->connect_error);
}

if(isset($_POST['storeProducts'])){
    $products = $_POST['storeProducts'];
    $userID = $_COOKIE['user'];
    echo json_encode($products);

    foreach($products as $product){
        $productID = $product[0];
        $sql = "INSERT INTO purchased (user_ID, product_id) VALUES ($userID ,$productID)";
        $result = $db->query($sql);
    }

}

if(isset($_POST['removeFromCart'])){
    
    $userID = $_COOKIE['user'];

    $sql = "DELETE FROM cart WHERE user_id = '$userID'";

    $result = $db->query($sql);
    

}

$db -> close();

?>