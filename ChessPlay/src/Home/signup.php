<?php
    require_once "configDB.php";
    require_once "validateEmail.php";

    if(isset($_POST["createAccount"])){

        $email = $_POST["email"];
        $userName = $_POST["userName"];
        $pass = $_POST["pass"];
        
        $stmt = $conn->prepare("SELECT * FROM users WHERE Email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        $emailCount = mysqli_num_rows($result);

        $stmt = $conn->prepare("SELECT * FROM users WHERE Name = ?");
        $stmt->bind_param('s', $userName);
        $stmt->execute();
        $result = $stmt->get_result();

        $userNameCount = mysqli_num_rows($result);
    
        if($emailCount > 0){

            echo "email already exists.";

        }else if($userNameCount > 0){

            echo "User Name already exists.";
        
        }else{

            $passHash = password_hash($pass,PASSWORD_DEFAULT);
            $verificationHash = hash("md5",$email);

            $stmt = $conn->prepare("SELECT * FROM pendingaccounts WHERE email = ?");
            $stmt->bind_param('s', $email);
            $stmt->execute();
            $result = $stmt->get_result();

            $rows = mysqli_num_rows($result);

            if($rows == 0){

                 $emailSent = sendVerificationEmail($email,$verificationHash);
                echo $emailSent;

                if($emailSent){

                    $stmt = $conn->prepare("INSERT INTO pendingaccounts (Email,Name,Password,Verification) VALUES (?,?,?,?)");
                    $stmt->bind_param('ssss', $email,$userName,$passHash,$verificationHash);
                    $stmt->execute();
                    $result = $stmt->get_result();

                    echo "Email sent.";

                }else{
                    echo "Email failed to send.";
                }

            }else{
                echo "Please check your email.";
            }

            
        }

    }else if(isset($_POST["verifyEmail"])){

        $verificationCode = $_POST["verifyEmail"];
        $expires = "date_sub(now(), interval 1 hour)";

        $stmt = $conn->prepare("SELECT * FROM pendingaccounts WHERE (Verification = ?) AND (Expires > ?)");
        $stmt->bind_param('ss', $verificationCode, $expires);
        $stmt->execute();
        $result = $stmt->get_result();
        $count = mysqli_num_rows($result);

        $stmt = $conn->prepare("DELETE * FROM pendingaccounts WHERE (Expires < ?)");
        $stmt->bind_param('s', $expires);
        $stmt->execute();
        
    
        if($count > 0){

            $row = $result->fetch_assoc(); 

            $email = $row['Email'];

            $password = $row["Password"];

            $name = $row["Name"];

            $stmt = $conn->prepare("INSERT INTO users (Email, Password, Name) VALUES (?, ?, ?)");
            $stmt->bind_param('sss', $email,$password,$name);
            $stmt->execute();
            
            if($stmt){
                $stmt = $conn->prepare("DELETE FROM pendingaccounts WHERE Verification = ?");
                $stmt->bind_param('s', $verificationCode);
                $stmt->execute();
                $result = $stmt->get_result();
            }

            echo "VERIFICATION COMPLETE";

        }else{
            $stmt = $conn->prepare("DELETE FROM pendingaccounts WHERE Verification = ?");
            $stmt->bind_param('s', $verificationCode);
            $stmt->execute();
            $result = $stmt->get_result();

            echo "proccess expired";
        }

    }else{ 

        echo "Invalid input: " . json_encode($_POST);

    }


?>