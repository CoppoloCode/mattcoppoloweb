
<?php

    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }

    $sql = "SELECT ID, Name, Image, Review, Cost FROM products";
    $result = $conn->query($sql);
   
   
    $i = 0;
    while($row = $result->fetch_assoc()){
        $products[$i] = $row["ID"] . "-" . $row["Name"] . "-" . $row["Image"] . "-" . $row["Review"] . "-" . $row["Cost"] . '\n';
        $i++;
    }

    $products = implode(" ", $products); 

    echo json_encode($products);


    
    $conn->close();
?>




