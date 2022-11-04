<?php

require_once "config.php";

$user_id = $_COOKIE['user'];

if(isset($_POST['getProductsForCookie'])){

    $productIds = $_POST['getProductsForCookie'];
    $products = [];
   
    for($i = 0; $i < count($productIds); $i++){

        $id = $productIds[$i];
        
        $stmt = $conn->prepare("SELECT ID, Name, Image, Cost FROM products WHERE ID = ?");
        $stmt->bind_param('s', $id);
        $stmt->execute();
        $result = $stmt->get_result();
        
        while($row = $result->fetch_assoc()){
           
            $products[$i][0] = $row['ID'];
            $products[$i][1] = $row['Name']; 
            $products[$i][2] = $row['Image']; 
            $products[$i][3] = $row['Cost']; 
            $products[$i][4] = '';
           
        }
        
    }
    echo json_encode($products);



}else if(isset($_POST['addToCart'])){

    $p_id = $_POST["productID"];

    $stmt = $conn->prepare("SELECT * FROM cart WHERE product_ID = ? AND user_ID = ?");
    $stmt->bind_param('ss', $p_id, $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $count = mysqli_num_rows($result);

    if($count > 0){
        echo "Product is already in cart";
    }else{
        
        $stmt = $conn->prepare("INSERT INTO cart (product_ID, qty, user_ID) VALUES (?, '1' , ?)");
        $stmt->bind_param('ss', $p_id, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if($result){
            echo "Product is Added!";
        }
    }

}else if(isset($_POST['removeFromCart'])){

    if(isset($_POST['productID'])){

        $productID = $_POST['productID'];
        
        $stmt = $conn->prepare("DELETE FROM cart WHERE product_ID = ? AND user_id = ?");
        $stmt->bind_param('ss', $productID, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        echo "Product Removed from Cart.";

    }

}else if(isset($_POST['changeQty'])){

    if(isset($_POST['productID'])){

        $productID = $_POST['productID'];

        $qty = $_POST['changeQty'];

        $stmt = $conn->prepare("UPDATE cart SET qty = ? WHERE product_ID = ? AND user_id = ?");
        $stmt->bind_param('sss', $qty, $productID, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;
    }
}else if(isset($_POST['getCartItems'])){

    $sql = 
    $stmt = $conn->prepare("SELECT product_ID, products.Name, products.Image, products.Cost, cart.qty FROM cart INNER JOIN products ON products.ID = cart.product_ID and cart.user_ID = ?");
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    $i = 0;
    while($row = $result->fetch_assoc()){
        
        $products[$i][0] = $row["product_ID"];


        $products[$i][1] = $row["Name"];


        $products[$i][2] = $row["Image"];


        $products[$i][3] = $row["Cost"];

        $products[$i][4] = $row["qty"];

        $i++;
    }
    if(mysqli_num_rows($result) == 0){
        $stmt = $conn->prepare("ALTER TABLE cart AUTO_INCREMENT = 1");
        $stmt->execute();
        echo json_encode(null);
    }else{
        echo json_encode($products);
    }
    
}else if(isset($_POST['Cart'])){

    $productIds = $_POST['Cart'];
    $qtys = $_POST['Quantity'];
    $i = 0;

    while($i < count($productIds)){
        $qty = $qtys[$i];
        $productId = $productIds[$i];

        $stmt = $conn->prepare("SELECT * FROM cart WHERE product_ID = ? AND user_ID = ?");
        $stmt->bind_param('ss', $productId, $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = mysqli_num_rows($result);

        if($count == 0){
            $stmt = $conn->prepare("INSERT INTO cart (product_ID, qty, user_ID) VALUES (?, ?, ?)");
            $stmt->bind_param('sss', $productId, $qty, $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
        }

        $i++;

    }
    
    echo json_encode($result);

}


$conn->close();
?>