
var currentPage = 1;
var productStart = 0;
var totalPages; 
var clickCount = 0;
var buttonNum = 0;
var sorting = 1;

totalPages = parseInt(localStorage.getItem("totalPages"));

function getProductsFromDataBase(productStart,sorting){

    if(sorting == 1){
        var sortMethod = 'getProducts';
    }
    if(sorting == 2){
        var sortMethod = 'getProductsSortedPriceAsc';
    }
    if(sorting == 3){
        var sortMethod = 'getProductsSortedPriceDesc';
    }
    if(sorting == 4){
        var sortMethod = 'getProductsSortedReview';
    }
    if(sorting == 5){
        var sortMethod = 'getProductsSortedType';
    }


    $.ajax({
        
        url: 'getProducts.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: sortMethod},
        success: function setProducts(data){         
                    
            products = data;
            let productElements = [];
            let productPlacementId = "product-";   
            let totalPages = products.length/12;
            totalPages = Math.ceil(totalPages);

            localStorage.setItem("totalPages", totalPages);
        
            productElements = getProductElements(products);

            for(let i = 0; i < 12; i++){
                document.getElementById(productPlacementId + (i+1)).innerHTML = productElements[productStart];
                productStart++;
            }                 

            
        }                
    });
}  

function setPageButtons(direction){

    document.getElementById("page-btn").innerHTML = null;  
    
    if(direction == "forward"){
        this.clickCount++;
        if((this.buttonNum-3) > 0){
            this.buttonNum = this.buttonNum-3;                   
        }
    }
    if(direction == "backward"){
        this.clickCount--;
        if((this.buttonNum-5) >= 0){
            this.buttonNum = this.buttonNum-5;
        }
    }

    if(this.clickCount >= 1){
        document.getElementById("page-btn").innerHTML += '<a id="backward" onclick="setPageButtons(id)"><span>&#8592;</span></a>';
    }
    for(i = 0; i < 4; i++){
        this.buttonNum++;
        document.getElementById("page-btn").innerHTML += "<a id='"+ (this.buttonNum) + "' onclick='pageSwap(id,currentPage)'><span>"+ (this.buttonNum) +"</span></a>";        
    }
    
    if(this.buttonNum < this.totalPages){
        document.getElementById("page-btn").innerHTML += '<a id="forward" onclick="setPageButtons(id)"><span>&#8594;</span></a>';
    }
        
}



function pageSwap(pageNumberSelected,currentPage){
    
    if(pageNumberSelected != currentPage){
        this.currentPage = pageNumberSelected;
        productStart = (this.currentPage * 12) - 12;
        getProductsFromDataBase(productStart,this.sorting); 
    }
                
}

function changeSorting(){
    let selectBox = document.getElementById("selectBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    this.sorting = selectedValue;
    this.buttonNum = 0;
    this.clickCount = 0;
    this.currentPage = 1;

    setPageButtons();
    getProductsFromDataBase(0,selectedValue);
    
}