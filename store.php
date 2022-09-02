<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Store Home</title>
    <link rel="stylesheet" href="styleStore.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel ="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    
    
</head>
<body>
    <div class="header">
        <div class="container">
            <div class="navbar">
                <div class="logo">
                    <img src="images/Storelogo.png">
                </div>
                <nav>
                    <ul id="MenuItems">
                        <li><a href="index.html">Back to CoppoloCode</a></li>
                        <li><a href="store.php">Home</a></li>
                        <li><a href="Products.html">Products</a></li>
                        <li><a href="">About</a></li>
                        <li><a href="">Contact</a></li>
                        <li><a href="">Account</a></li>
                    </ul>
                <img src="images/checkouticon.png">
                </nav>
                <img src="images/menuicon.png" class="menu-icon" onclick="menutoggle()">
            </div>
            <div class="row">
                <div class="col-2">
                    <h1>Welcome to TruGGaming</h1>
                    <p>Experience the fastest PC's on the market for the best gaming experience.<br> 
                        Dominate your foes with our top of the line peripherals.</p>
                </div>
                <div class="col-2">
                    <img src="images/frontpagepc.png">
                </div>
            </div>
        </div>
    </div>
    

    <!----------Choose Categories----------->

    <div class="categories">
        <h2 class="title">Chose Your Device</h2>
        <div class="small-containter">
            <div class="row-2">
                <div class="col-3">
                    <img src="images/headset.png">
                </div>
                <div class="col-3">
                    <img src="images/rgbblackkeyboard.png">
                </div>
                <div class="col-3">
                    <img src="images/rgbblackmouse.png">
                </div>
                <div class="col-3">
                    <img src="images/redpc.png">
                </div>
            </div>
        </div>
    </div>


    <!---------- featured products ----------->
    <div class="small-container">
        <h3 class="title"> Featured Products </h3>
        <div class="row-3">
            <div class="col-4">
                <a href='product-details.html' id ="product-1">   
                    
                </a>
            </div>
            <div class="col-4" id = "product-2">
                
            </div>
            <div class="col-4" id = "product-3">
                
            </div>
            <div class="col-4" id = "product-4">
                
            </div>
        </div>
    </div>



    <!---------- latest products ----------->

    <div class="small-container">
        <h3 class="title"> Latest Products </h3>
        <div class="row-3">
            <div class="col-4" id = "product-5">
                
            </div>
            <div class="col-4" id = "product-6">
                
            </div>
            <div class="col-4" id = "product-7">
                
            </div>
            <div class="col-4" id = "product-8">
                
            </div>
        </div>
    </div>

    <!---------- Exclusive product ----------->

    <div class="offer">
        <div class="small-container">
            <div class="row-4">
                <div class="col-5">
                    <img src="images/frontpagepc.png" class="offer-img">
                </div>
                <div class="col-5">
                    <p>Exclusively Available on TruGGaming</p>
                    <h1>Ultimate PC</h1>
                    <small>This PC offers the fastest processing via cpu and graphics card.<br> Full RBG capabilities
                        and overclocking technology. <br>Limited time supply, get yours now!<br>
                    </small>
                    <a href="" class="btn"> Buy Now &#8594; </a>
                </div>
            </div>
        </div>
    </div>


    <!---------- Reviews ----------->
    <div class="testimonial">
        <div class="small-container">
            <div class="row-5">
                <div class="col-6">
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum libero doloremque beatae? </p>
                    <i class="fa fa-quote-right" aria-hidden="true"></i>
                    <div class="raiting">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                    </div>
                    <img src="images/user1.jpg">
                    <h3>Mark Zuckerberg</h3>
                </div>
                <div class="col-6">
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum libero doloremque beatae? </p>
                    <i class="fa fa-quote-right" aria-hidden="true"></i>
                    <div class="raiting">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star-o" aria-hidden="true"></i>
                    </div>
                    <img src="images/user2.jpg">
                    <h3>James White</h3>
                </div>
                <div class="col-6">
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum libero doloremque beatae? </p>
                    <i class="fa fa-quote-right" aria-hidden="true"></i>
                    <div class="raiting">
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                    </div>
                    <img src="images/user3.jpeg">
                    <h3>Jay Dominick</h3>
                </div>
            </div>
        </div>
    </div>

    <!---------- brands ----------->
    <div class="brands">
        <div class="small-container">
            <div class="row-6">
                <div class="col-7">
                    <img src="images/brand1.png" alt="">
                </div>
                <div class="col-7">
                    <img src="images/brand2.png" alt="">
                </div>
                <div class="col-7">
                    <img src="images/brand3.png" alt="">
                </div>
                <div class="col-7">
                    <img src="images/brand4.png" alt="">
                </div>
                <div class="col-7">
                    <img src="images/brand5.png" alt="">
                </div>
            </div>
        </div>
    </div>

    <!---------- Footer ----------->

    <div class="footer">
        <div class="container">
            <div class="row-7">
                <div class="footer-col-1">
                    <h3>Download Our App</h3>
                    <p>Download App for Android and ios mobile phone.</p>
                    <div class="app-logo">
                        <img src="images/googleplay.png" alt="">
                        <img src="images/applestore.png" alt="">
                    </div>
                </div>
                <div class="footer-col-2">
                    <img src="images/Storelogo.png">
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                </div>
                <div class="footer-col-3">
                    <h3>Useful Links</h3>
                    <ul>
                        <li>Coupons</li>
                        <li>Blog Post</li>
                        <li>Return Policy</li>
                        <li>Join Affiliate</li>
                    </ul>
                </div>
                <div class="footer-col-4">
                    <h3>Follow us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Twitter</li>
                        <li>Instagram</li>
                        <li>YouTube</li>
                    </ul>
                </div>
            </div>
            <hr>
            <p class="copyright">Copyright 2022 - My Test Website</p>
        </div>
    </div>

    
    
   
    <!--------js for toggle menu--------->

    <script>
        var MenuItems = document.getElementById("MenuItems");

        MenuItems.style.maxHeight = "0px";

        function menutoggle(){
            if(MenuItems.style.maxHeight == "0px"){
                MenuItems.style.maxHeight = "200px";
            }
            else{
                MenuItems.style.maxHeight = "0px";
            }
        }
    </script>




    

<!-----------------------------------------php for getting product info from DB--------------------------------------------->


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

    <script src="insertProduct-details.js"></script>
    <script src="insertProduct.js"></script>
    <script>

        var productsToSplit = "<?php $product = 0; while($product < 12){echo $products[$product]; $product++;} ?>";

        splitProducts(productsToSplit);

    </script>
    
    


    
</body>
</html>