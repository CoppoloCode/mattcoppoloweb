<?php


$db = new mysqli('localhost', 'root','', 'mattcoppolodatabase');
if($db->connect_errno){
    die("connect failed: ". $db->connect_error);
}

if(isset($_POST['storeProducts'])){
    $products = $_POST['storeProducts'];
    $userID = $_COOKIE['user'];
    $date = date('Y-m-d');

    foreach($products as $product){
        $productID = $product[0];
        $sql = "INSERT INTO purchased (user_ID, product_id, Date) VALUES ('$userID' , '$productID' , '$date' )";
        $result = $db->query($sql);
    }
   echo ($result);
}

if(isset($_POST['removeFromCart'])){
    
    $userID = $_COOKIE['user'];

    $sql = "DELETE FROM cart WHERE user_id = '$userID'";

    $result = $db->query($sql);
    

}

$db -> close();

?>