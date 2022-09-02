
<?php

    $conn = mysqli_connect("localhost", "root", "", "mattcoppolodatabase");

    if($conn->connect_error){
        die("Connection Failed: " . $conn->connect_error);
    }

    $sql = "SELECT ID, Name, Image, Review, Cost FROM products";
    $result = $conn->query($sql);
    $i = 0;



    while($row = $result->fetch_assoc()){
        $products[$i] = $row["ID"] . "-" . $row["Name"] . "-" . $row["Image"] . "-" . $row["Review"] . "-" . $row["Cost"] . '\n';
        $i++;
    }

    $conn->close();
?>

<script src="insertProduct.js"></script>

<script>
var productsToSplit = "<?php $product = 0; while($product < 12){echo $products[$product]; $product++;} ?>";

splitProducts(productsToSplit);

</script>

