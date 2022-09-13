
<?php

    if($_POST['typename']){

        if($_POST['typename'] == 'all'){
            $typeName = 'all';
        }
        if($_POST['typename'] == 'headset'){
            $typeName = 'headset';
        }
        if($_POST['typename'] == 'keyboard'){
            $typeName = 'Keyboard';
        }
        if($_POST['typename'] == 'mouse'){
            $typeName = 'Mouse';
        }
        if($_POST['typename'] == 'PC'){
            $typeName = 'PC';
        }

    }else{
        die("Error: type name not supported" . $_POST['typename']);
    }

    if($_POST['functionname']){

        $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

        if($conn->connect_error){
            die("Connection Failed: " . $conn->connect_error);
        }

        if($_POST['typename'] != 'all'){

            
            if($_POST['functionname'] == 'getProducts'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = " . "'" . $typeName . "'";

            }

            if($_POST['functionname'] == 'getProductsSortedPriceAsc'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = " ."'". $typeName ."'" . "ORDER BY Cost ASC";
                
            }
            if($_POST['functionname'] == 'getProductsSortedPriceDesc'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = " ."'". $typeName ."'" .  "ORDER BY Cost Desc";
                
            }
            if($_POST['functionname'] == 'getProductsSortedReview'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = " ."'". $typeName ."'" . "ORDER BY Review Desc";
                
            }
        }

        if($_POST['typename'] == 'all'){

            if($_POST['functionname'] == 'getProducts'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products";

            }
            if($_POST['functionname'] == 'getProductsSortedPriceAsc'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products ORDER BY Cost ASC";
                
            }
            if($_POST['functionname'] == 'getProductsSortedPriceDesc'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products ORDER BY Cost Desc";
                
            }
            if($_POST['functionname'] == 'getProductsSortedReview'){

                $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products ORDER BY Review Desc";
                
            }  
        }
        
    }else{
        die("Error: function name not supported" . $_POST['functionname']);
    }

    $result = $conn->query($sql);

    $i = 0;
    while($row = $result->fetch_assoc()){
        
        
        $products[$i][0] = $row["ID"];


        $products[$i][1] = $row["Name"];


        $products[$i][2] = $row["Image"];


        $products[$i][3] = $row["Review"];


        $products[$i][4] = $row["Cost"];


        $products[$i][5] = $row["Description"];


        $products[$i][6] = $row["Type"];

        
        $i++;
    }

    

    echo json_encode($products);

    $conn->close();


?>

    


