<?php


    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }
    
    if(isset($_POST['userId'])){

        $userId = $_POST['userId'];

        $sql = "SELECT * FROM accounts WHERE user_id = $userId";
        
        $result = $conn->query($sql);

        $result = $result->fetch_assoc();


        echo json_encode($result);

    }


    $conn->close();


?>