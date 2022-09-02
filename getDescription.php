
<?php

    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }

    $sql = "SELECT Description FROM products";
    $result = $conn->query($sql);

    $description;
    
    $j = 0;
    while($row = $result->fetch_assoc()){
        $description[$j] = $row["Description"]." \n ";
        $j++;
    }

    $description = implode($description);
   

    echo json_encode($description);


    
    $conn->close();
?>




