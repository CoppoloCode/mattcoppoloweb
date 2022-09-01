<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel ="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <title>Document</title>
</head>

    <?php

        $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

        if($conn->connect_error){
            die("Connection Failed: " . $conn->connect_error);
        }

        $sql = "SELECT ID, Name, Image, Review, Cost FROM products";
        $result = $conn->query($sql);

        $product = $result->fetch_assoc();
        $productID = $product["ID"];
        $productName = $product["Name"];
        $productImage = $product["Image"];
        $productReview = $product["Review"];
        $productCost = $product["Cost"];

        
        $productReview = intval($productReview);
        $productReview;

        $conn->close();
    ?>

    <script src="Product.js"></script>

    <body onload="setReview(<?php echo $productReview?>)">
            
            <a href="product-details.html">         
            <img src="images/<?php echo $productImage?>" id=<?php echo $productID?> onclick="getImageProduct(id)">
            </a>
            <h4><?php echo $productName?></h4>
            <div id="rating"></div>
            <p><?php echo $productCost?></p>

            
    </body>
</html>
