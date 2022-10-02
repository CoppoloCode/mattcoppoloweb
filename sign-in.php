<?php


$conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM accounts";

$result = $conn->query($sql);

if(mysqli_num_rows($result) == 0){
    $sql = "ALTER TABLE accounts AUTO_INCREMENT  = 1";
    $result = $conn->query($sql);
}


if(isset($_POST['createAccount'])){

    $email = $_POST['email'];

    $password = $_POST["password"];

    $address = $_POST["address"];

    $firstName = $_POST["firstName"];

    $lastName =$_POST["lastName"];

    $sql = "SELECT * FROM accounts WHERE email = '$email'";

    $result = $conn->query($sql);

    $count = mysqli_num_rows($result);

    if($count > 0){
        echo 0;
    }else{
        $sql = "INSERT INTO accounts (email, password, address, first_name, last_name) VALUES ('$email', '$password' ,'$address', '$firstName', '$lastName')";
        $result = $conn->query($sql);
        
        $sql = "SELECT * FROM accounts WHERE email = '$email' AND BINARY password = '$password'";

        $result = $conn->query($sql);

        $count = mysqli_num_rows($result);

        if($count == 0){
            echo "account not found";
        }else{
            $row =  $result->fetch_assoc();
            echo $row['user_id'];
        }

    }
}

else if(isset($_POST["signIn"])){

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM accounts WHERE email = '$email' AND BINARY password = '$password'";

    $result = $conn->query($sql);

    $count = mysqli_num_rows($result);

    if($count == 0){
        echo "account not found";
    }else{
        $row =  $result->fetch_assoc();
        echo $row['user_id'];
    }

}else{
    echo "improper POST request";
}

$conn->close();
?>