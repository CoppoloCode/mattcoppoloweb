<?php

    require_once "config.php";

    $user_id = $_COOKIE['user'];
    
    if(isset($_POST['getAccountData'])){

        $stmt = $conn->prepare("SELECT * FROM accounts WHERE user_id = ?");
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        $row = $result->fetch_assoc();
        $row['password'] = "password";

        if($row == null){
            echo json_encode(0);
        }else{
            echo json_encode($row);
        }
        

    }

    else if(isset($_POST['changeEmail'])){

        $email = $_POST['changeEmail'];

        $stmt = $conn->prepare("UPDATE accounts SET email = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $email, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;

    }

    else if(isset($_POST['changePassword'])){

        $password = $_POST['changePassword'];
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);

        $stmt = $conn->prepare("UPDATE accounts SET password = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $passwordHash, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;

    }
    else if(isset($_POST['changeAddress'])){

        $address = $_POST['changeAddress'];

        $stmt = $conn->prepare("UPDATE accounts SET address = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $address, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;

    }
    else if(isset($_POST['changeFirstName'])){

        $firstName = $_POST['changeFirstName'];

        $stmt = $conn->prepare("UPDATE accounts SET first_name = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $firstName, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;

    }
    else if(isset($_POST['changeLastName'])){

        $lastName = $_POST['changeLastName'];

        $stmt = $conn->prepare("UPDATE accounts SET last_name = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $lastName, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;

    }
    else if(isset($_POST['deleteAccount'])){

        $stmt = $conn->prepare("DELETE FROM cart WHERE user_ID = ?");
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        
        $stmt = $conn->prepare("DELETE FROM payment_info WHERE user_id = ? ");
        $stmt->bind_param('s',  $user_id);
        $stmt->execute();

        $stmt = $conn->prepare("DELETE FROM purchases WHERE user_id = ?");
        $stmt->bind_param('s',  $user_id);
        $stmt->execute();

        $stmt = $conn->prepare("DELETE FROM accounts WHERE user_id = ?");
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();

        echo $result;
    }

    else if(isset($_POST['getOrders'])){

        $stmt = $conn->prepare("SELECT products.ID, products.Name, products.Cost, products.Description, products.Image, purchases.Date FROM products inner JOIN purchases ON 
        purchases.product_id = products.ID and purchases.user_id = ?");
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = mysqli_num_rows($result);
    
        if($count > 0){

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