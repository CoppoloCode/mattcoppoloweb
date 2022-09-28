<?php


    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }
    
    if(isset($_POST['getUserId'])){

        $userId = $_POST['getUserId'];

        $sql = "SELECT * FROM accounts WHERE user_id = $userId";
        
        $result = $conn->query($sql);

        $result = $result->fetch_assoc();


        echo json_encode($result);

    }

    if(isset($_POST['changeEmail'])){

        $email = $_POST['changeEmail'];
        $userId = $_POST['user_Id'];

        $sql = "UPDATE accounts SET email = '$email' WHERE user_id = $userId";

        $result = $conn->query($sql);

        echo $result;

    }

    if(isset($_POST['changePassword'])){

        $password = $_POST['changePassword'];
        $userId = $_POST['user_Id'];

        $sql = "UPDATE accounts SET password = '$password' WHERE user_id = $userId";

        $result = $conn->query($sql);

        echo $result;

    }
    if(isset($_POST['changeAddress'])){

        $address = $_POST['changeAddress'];
        $userId = $_POST['user_Id'];

        $sql = "UPDATE accounts SET address = '$address' WHERE user_id = $userId";

        $result = $conn->query($sql);

        echo $result;

    }
    if(isset($_POST['changeFirstName'])){

        $firstName = $_POST['changeFirstName'];
        $userId = $_POST['user_Id'];

        $sql = "UPDATE accounts SET first_name = '$firstName' WHERE user_id = $userId";

        $result = $conn->query($sql);

        echo $result;

    }
    if(isset($_POST['changeLastName'])){

        $lastName = $_POST['changeLastName'];
        $userId = $_POST['user_Id'];

        $sql = "UPDATE accounts SET last_name = '$lastName' WHERE user_id = $userId";

        $result = $conn->query($sql);

        echo $result;

    }

    if(isset($_POST['getOrders'])){

        $user_id = $_COOKIE['user'];


        $sql = "SELECT products.ID, products.Name, products.Cost, products.Description, products.Image, purchased.Date FROM products inner JOIN purchased ON 
        purchased.product_id = products.ID and purchased.user_id = '$user_id'";

        $result = $conn->query($sql);

        if($result == true){

            $products = [];

            $i = 0;
            while($row = $result->fetch_assoc()){
                $products[$i] = $row;
                $i++;
            }

            echo json_encode($products);

        }else{
            echo json_encode($result);
        }
    }

    $conn->close();

?>