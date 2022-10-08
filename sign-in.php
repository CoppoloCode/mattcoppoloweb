<?php
require "mailer.php";

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = new mysqli("localhost", "root", "", "mattcoppolodatabase");
$conn->set_charset('utf8mb4');

if($conn->connect_error){
    die("Connection Failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM accounts");
$stmt->execute();

$result = $stmt->get_result();

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

    $stmt = $conn->prepare("SELECT * FROM accounts WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = mysqli_num_rows($result);

    $count = mysqli_num_rows($result);
    
    if($count > 0){
        echo "email already exists.";
    }else{

        $emailHash = password_hash($email,PASSWORD_DEFAULT);
        $passwordHash = password_hash($password,PASSWORD_DEFAULT);

        sendVerificationEmail($email, $emailHash);

        $stmt = $conn->prepare("INSERT INTO pendingaccounts (email, password, address, first_name, last_name, verification) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $email,$passwordHash,$address,$firstName,$lastName,$emailHash);
        $stmt->execute();
        $result = $stmt->get_result();


        echo "verify email";

    }
}
else if(isset($_POST["verifyEmail"])){

    $verificationCode = $_POST["verifyEmail"];
    $expires = "date_sub(now(), interval 1 hour)";

    $stmt = $conn->prepare("SELECT * FROM pendingaccounts WHERE (verification = ?) AND (expires > ?)");
    $stmt->bind_param('ss', $verificationCode, $expires);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = mysqli_num_rows($result);
    $row = $result->fetch_assoc();
    
    $email = $row['email'];

    $password = $row["password"];

    $address = $row["address"];

    $firstName = $row["first_name"];

    $lastName = $row["last_name"];

    if($count > 0){

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

            $stmt = $conn->prepare("SELECT * FROM accounts WHERE user_id = ?");
            $stmt->bind_param('s', $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = mysqli_num_rows($result);
                
        }while($count > 0);

        $stmt = $conn->prepare("INSERT INTO accounts (user_id, email, password, address, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $user_id,$email,$password,$address,$firstName,$lastName);
        $stmt->execute();
        $result = $stmt->get_result();

        $stmt = $conn->prepare("DELETE FROM pendingaccounts WHERE verification = ?");
        $stmt->bind_param('s', $verificationCode);
        $stmt->execute();
        $result = $stmt->get_result();

        echo "VERIFICATION COMPLETE";
    }
}

else if(isset($_POST["signIn"])){

    $email = $_POST['email'];
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT accounts.password FROM accounts WHERE accounts.email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = mysqli_num_rows($result);
    
    if($count == 0){
        echo "account not found.";
    }else{

        $row = $result->fetch_assoc();
        $passwordHash = $row['password'];

        if(password_verify($password,$passwordHash)){
            
            $stmt = $conn->prepare("SELECT * FROM accounts WHERE accounts.email = ? AND accounts.password = ?");
            $stmt->bind_param('ss', $email, $passwordHash);
            $stmt->execute();
            $result = $stmt->get_result();
        
            $row =  $result->fetch_assoc();
            echo $row['user_id'];
        
        }else{
            echo "incorrect password.";
        }
    }
}
else{
    echo "improper POST request";
}

$conn->close();
?>