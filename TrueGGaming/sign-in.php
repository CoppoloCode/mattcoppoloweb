<?php
require_once "mailer.php";
require_once "config.php";


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
    
    if($count > 0){
        echo "email already exists.";
    }else{

        $stmt = $conn->prepare("SELECT * FROM pendingaccounts WHERE email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $count1 = mysqli_num_rows($result);

        do{
            $emailHash = password_hash($email,PASSWORD_DEFAULT);
            $stmt = $conn->prepare("SELECT * FROM pendingaccounts WHERE verification = ?");
            $stmt->bind_param('s', $emailHash);
            $stmt->execute();
            $result = $stmt->get_result();
            $count2 = mysqli_num_rows($result);

        }while($count2 > 0);

        
        if($count1 == 0 && $count2 == 0){
            $count = mysqli_num_rows($result);
            
            $passwordHash = password_hash($password,PASSWORD_DEFAULT);
            $emailSent = sendVerificationEmail($email, $emailHash);

            if($emailSent){
                $stmt = $conn->prepare("INSERT INTO pendingaccounts (email, password, address, first_name, last_name, verification) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->bind_param('ssssss', $email,$passwordHash,$address,$firstName,$lastName,$emailHash);
                $stmt->execute();
                $result = $stmt->get_result();

                echo "verify email";
            }else{
                echo "failed to send email";
            }
        }else{
            echo "check email";
        }
       
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
    
    
    if($count > 0){

        $row = $result->fetch_assoc(); 

        $email = $row['email'];

        $password = $row["password"];

        $address = $row["address"];

        $firstName = $row["first_name"];

        $lastName = $row["last_name"];
        
        do{
            $user_id = password_hash($email,PASSWORD_DEFAULT);
            $stmt = $conn->prepare("SELECT * FROM accounts WHERE user_id = ?");
            $stmt->bind_param('s', $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            $count = mysqli_num_rows($result);

        }while($count > 0);
                
       

        $stmt = $conn->prepare("INSERT INTO accounts (user_id, email, password, address, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param('ssssss', $user_id,$email,$password,$address,$firstName,$lastName);
        $stmt->execute();
        
        if($stmt){
            $stmt = $conn->prepare("DELETE FROM pendingaccounts WHERE verification = ?");
            $stmt->bind_param('s', $verificationCode);
            $stmt->execute();
            $result = $stmt->get_result();
        }
        
        echo "VERIFICATION COMPLETE";
    }else{

        $stmt = $conn->prepare("DELETE FROM pendingaccounts WHERE verification = ?");
        $stmt->bind_param('s', $verificationCode);
        $stmt->execute();
        $result = $stmt->get_result();

        echo "proccess expired";
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
            $user_id = $row['user_id'];
            
            echo $user_id;
        
        }else{
            echo "incorrect password.";
        }
    }
}
elseif(isset($_POST['forgotPassword'])){

    $email = $_POST['forgotPassword'];
    
    $stmt = $conn->prepare("SELECT * FROM accounts WHERE email = ?");
    $stmt->bind_param('s', $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = mysqli_num_rows($result);

    if($count == 0){
        echo "No account with that email.";
    }else{

        $row = $result->fetch_assoc();
        $user_id = $row['user_id'];
        $email = $row['email'];
        $verificationCode = password_hash($email, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("SELECT user_id FROM pendingpasswordchange WHERE user_id = ?");
        $stmt->bind_param('s', $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = mysqli_num_rows($result);

        if($count == 0){
            
            $emailSent = sendForgotPasswordEmail($email, $verificationCode);
            if($emailSent){
                $stmt = $conn->prepare("INSERT INTO pendingpasswordchange (user_id, verification) VALUES (?,?)");
                $stmt->bind_param('ss', $user_id, $verificationCode);
                $stmt->execute();
                $result = $stmt->get_result();
            }
        }else{
            echo "Check Email";
        }
    }
}
elseif(isset($_POST['updatePassword'])){

    $verificationCode = $_POST['verificationCode'];
    $pass = $_POST['pass'];
    $expires = "date_sub(now(), interval 1 hour)";

    $stmt = $conn->prepare("SELECT * FROM pendingpasswordchange WHERE (verification = ?) AND (expires > ?)");
    $stmt->bind_param('ss', $verificationCode, $expires);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = mysqli_num_rows($result);

    if($count > 0){
        $row = $result->fetch_assoc();
        $user_id = $row['user_id'];
        $hash = password_hash($pass, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE accounts SET password = ? WHERE user_id = ?");
        $stmt->bind_param('ss', $hash, $user_id);
        $stmt->execute();
        
        if($stmt){
            $stmt = $conn->prepare("DELETE FROM pendingpasswordchange WHERE user_id = ?");
            $stmt->bind_param('s', $user_id);
            $stmt->execute();
            $result = $stmt->get_result();
            echo "password changed";
        }else{
            echo "error updating password";
        }
    }else{
        
        echo "proccess expired";
    }

}
else{
    echo "improper POST request";
}

$conn->close();
?>