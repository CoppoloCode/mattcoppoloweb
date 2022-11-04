
<?php
    require_once "config.php";
    
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

        if($_POST['typename'] != 'all'){

            
            if($_POST['functionname'] == 'getProducts'){

                $stmt = $conn->prepare("SELECT * FROM products WHERE Type = ?");
                $stmt->bind_param('s', $typeName);
            }

            if($_POST['functionname'] == 'getProductsSortedPriceAsc'){

                $stmt = $conn->prepare("SELECT * FROM products WHERE Type = ? ORDER BY Cost ASC");
                $stmt->bind_param('s', $typeName);
            }
            if($_POST['functionname'] == 'getProductsSortedPriceDesc'){

                $stmt = $conn->prepare("SELECT * FROM products WHERE Type = ? ORDER BY Cost Desc");
                $stmt->bind_param('s', $typeName);
            }
            if($_POST['functionname'] == 'getProductsSortedReview'){

                $stmt = $conn->prepare("SELECT * FROM products WHERE Type = ? ORDER BY Review Desc");
                $stmt->bind_param('s', $typeName);
            }
        }

        if($_POST['typename'] == 'all'){

            if($_POST['functionname'] == 'getProducts'){

                $stmt = $conn->prepare("SELECT * FROM products");

            }
            if($_POST['functionname'] == 'getProductsSortedPriceAsc'){

                $stmt = $conn->prepare("SELECT * FROM products ORDER BY Cost ASC");
                
            }
            if($_POST['functionname'] == 'getProductsSortedPriceDesc'){

                $stmt = $conn->prepare("SELECT * FROM products ORDER BY Cost Desc");
                
            }
            if($_POST['functionname'] == 'getProductsSortedReview'){

                $stmt = $conn->prepare("SELECT * FROM products ORDER BY Review Desc");
                
            }  
        }
        
    }else{
        die("Error: function name not supported" . $_POST['functionname']);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $i = 0;
    while($row = $result->fetch_assoc()){
        
        
        $products[$i][0] = $row["ID"];


        $products[$i][1] = $row["Name"];


        $products[$i][2] = $row["Image"];


        $products[$i][3] = $row["Review"];


        $products[$i][4] = $row["Cost"];


        $products[$i][5] = $row["Description"];


        $products[$i][6] = $row["Type"];

        $products[$i][7] = $row["Quantity"];
        $i++;
    }

    

    echo json_encode($products);

    $conn->close();


?>

    


