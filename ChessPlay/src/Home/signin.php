<?php
    require_once("configDB.php");

    if(isset($_POST["signIn"])){


        $email = $_POST["email"];
        $password = $_POST["password"];

        $stmt = $conn->prepare("SELECT * FROM users WHERE Email = ?");
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $result = $stmt->get_result();

        $emailCount = mysqli_num_rows($result);

        if($emailCount > 0){

           
            $row = $result->fetch_assoc();
            $passHash = $row["Password"];

            if(password_verify($password, $passHash)){

                echo "SUCCESS";

            }else{
                echo "Incorrect password.";
            }


        }else{
            echo "No account found with that email.";
        }


    }


?>