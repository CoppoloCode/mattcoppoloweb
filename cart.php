<?php

$conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}

if(isset($_POST['addToCart'])){

    $p_id = $_POST["productID"];
    
    $user_id = $_COOKIE['user'];

    $sql = "SELECT * FROM cart WHERE product_ID = '$p_id' AND user_ID = '$user_id'";

    $result = $conn->query($sql);
    
    $count = mysqli_num_rows($result);

    
    
    if($count > 0){
        echo "Product is already in cart";
    }else{
        $sql = "INSERT INTO cart (product_ID, qty, user_ID) VALUES ('$p_id', '1' , '$user_id')";
        
        $result = $conn->query($sql);

        if($result){
            echo "Product is Added!";
        }
    }

}

if(isset($_POST['removeFromCart'])){

    if(isset($_POST['productID'])){

        $productID = $_POST['productID'];

        $user_id = $_COOKIE['user'];

        $sql = "DELETE FROM cart WHERE product_ID = $productID AND user_id = '$user_id'";

        $result = $conn->query($sql);

        echo "Product Removed from Cart.";

    }

}

if(isset($_POST['changeQty'])){
    if(isset($_POST['productID'])){

        $productID = $_POST['productID'];
        $user_id = $_COOKIE['user'];

        $qty = $_POST['changeQty'];

        $sql = "UPDATE cart SET qty = $qty WHERE product_ID = $productID AND user_id = '$user_id'";

        $result = $conn->query($sql);

        echo $result;
    }
}

if(isset($_POST['getCartItems'])){

    $user_id = $_COOKIE['user'];

    $sql = "SELECT product_ID, products.Name, products.Image, products.Cost, cart.qty FROM cart INNER JOIN products ON products.ID = cart.product_ID and cart.user_ID = '$user_id'";

    $result = $conn->query($sql);
    
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
        $sql = "ALTER TABLE cart AUTO_INCREMENT  = 1";
        $result = $conn->query($sql);
        echo json_encode(null);
    }else{
        echo json_encode($products);
    }
    
}

$conn->close();
?>