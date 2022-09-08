
<?php

    if($_POST['typeName']){

        if($_POST['typeName'] == 'headset'){
            $typeName = 'headset'
        }
    }

    if($_POST['functionname']){

        $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

        if($conn->connect_error){
            die("Connection Failed: " . $conn->connect_error);
        }

        if($_POST['functionname'] == 'getProducts'){

            $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = $typeName";

        }

        if($_POST['functionname'] == 'getProductsSortedPriceAsc'){

            $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = $typeName ORDER BY Cost ASC";
            
        }
        if($_POST['functionname'] == 'getProductsSortedPriceDesc'){

            $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = $typeName ORDER BY Cost Desc";
            
        }
        if($_POST['functionname'] == 'getProductsSortedReview'){

            $sql = "SELECT ID, Name, Image, Review, Cost, Description, Type FROM products WHERE Type = $typeName ORDER BY Review Desc";
            
        }
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
