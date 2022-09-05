
<?php

    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }

    $sql = "SELECT ID, Name, Image, Review, Cost, Description FROM products";
    $result = $conn->query($sql);
   
   
    $i = 0;
    while($row = $result->fetch_assoc()){
        for($j = 0; $j < 6; $j++){
            if($j == 0){
                $products[$i][$j] = $row["ID"];
            }
            if($j == 1){
                $products[$i][$j] = $row["Name"];
            }
            if($j == 2){
                $products[$i][$j] = $row["Image"];
            }
            if($j == 3){
                $products[$i][$j] = $row["Review"];
            }
            if($j == 4){
                $products[$i][$j] = $row["Cost"];
            }
            if($j == 5){
                $products[$i][$j] = $row["Description"];
            }
        }
        $i++;
    }

   

    echo json_encode($products);


    
    $conn->close();
?>




