<?php


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$db = new mysqli("localhost", "root", "", "mattcoppolodatabase");
$db->set_charset('utf8mb4');
if($db->connect_errno){
    die("connect failed: ". $db->connect_error);
}

$userID = $_COOKIE['user'];

if(isset($_POST['storeProducts'])){
    $products = $_POST['storeProducts'];
    
    $date = date('Y-m-d');

    foreach($products as $product){
        $productID = $product[0];
        $stmt = $db->prepare("INSERT INTO purchased (user_ID, product_id, Date) VALUES (? , ? , ?)");
        $stmt->bind_param('sss', $userID, $productID, $date);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt = $db->prepare("UPDATE products SET Quantity = Quantity - 1 WHERE ID = $productID");
        $stmt->bind_param('s', $productID);
        $stmt->execute();
        $result = $stmt->get_result();
    }
   echo ($result);
}

if(isset($_POST['removeFromCart'])){
    
    $stmt = $db->prepare("DELETE FROM cart WHERE user_id = ?");
    $stmt->bind_param('s', $userID);
    $stmt->execute();
    $result = $stmt->get_result();

}

$db -> close();

?>