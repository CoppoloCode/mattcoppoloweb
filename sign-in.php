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

    $alphabet = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
    $alphabetLength = sizeof($alphabet);
    $input = "";
    $hash = "";
    $count = 0;

    do{
        for($i = 0; $i < 5; $i++){
            $input .= random_int(0,(int)$alphabetLength-1);
        }
        do{
            $hash .= $alphabet[$input % $alphabetLength];
            $input = $input / $alphabetLength;
            $count++;
        } while($count < 5);

        $user_id = password_hash($hash,PASSWORD_DEFAULT);

        $sql = "SELECT * FROM accounts WHERE user_id = '$user_id'";
        $result = $conn->query($sql);
        $count = mysqli_num_rows($result);
        
    }while($count > 0);

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
        $passwordHash = password_hash($password,PASSWORD_DEFAULT);

        $sql = "INSERT INTO accounts (user_id, email, password, address, first_name, last_name) VALUES ('$user_id', '$email', '$passwordHash' ,'$address', '$firstName', '$lastName')";
        $result = $conn->query($sql);
        
        $sql = "SELECT * FROM accounts WHERE accounts.email = '$email'";
        $result = $conn->query($sql);
        
        $row =  $result->fetch_assoc();

        echo $row['user_id'];
        

    }
}

else if(isset($_POST["signIn"])){

    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT accounts.password FROM accounts WHERE accounts.email = '$email'";
    $result = $conn->query($sql);
    $count = mysqli_num_rows($result);
    if($count == 0){
        echo "account not found";
    }else{

        $row = $result->fetch_assoc();
        $passwordHash = $row['password'];

        if(password_verify($password,$passwordHash)){
            
            $sql = "SELECT * FROM accounts WHERE accounts.email = '$email' AND accounts.password = '$passwordHash'";

            $result = $conn->query($sql);
        
            $row =  $result->fetch_assoc();
            echo $row['user_id'];
        
        }else{
            echo "account not found";
        }
    }
}
else{
    echo "improper POST request";
}

$conn->close();
?>