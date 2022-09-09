

class Page{
    constructor(currentPage, totalPages, clickCount, buttonNum, sorting, productStart){
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.clickCount = clickCount;
        this.buttonNum = buttonNum;
        this.sorting = sorting;
        this.productStart = productStart;
    } 
}

let page = new Page(1,0,0,0,1,0);


function getProductsFromDataBase(sorting){

    let sortMethod;

    if(sorting == 1){
        sortMethod = 'getProducts';
    }
    if(sorting == 2){
        sortMethod = 'getProductsSortedPriceAsc';
    }
    if(sorting == 3){
        sortMethod = 'getProductsSortedPriceDesc';
    }
    if(sorting == 4){
        sortMethod = 'getProductsSortedReview';
    }
    if(sorting == 5){
        sortMethod = 'getProductsSortedType';
    }

    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: sortMethod},
        success: getProducts,
    });
}  

function getProducts(data){         
                    
    let products = data;
    let productElements = []; 
    let totalPages = products.length/12;
    page.totalPages = Math.ceil(totalPages);
    
    productElements = getProductElements(products);
    setupProducts(productElements);
                      
}


function setupProducts(productElements){

    let productPlacementId = "product-";

    for(let i = 0; i < 12; i++){  
        document.getElementById(productPlacementId + (i+1)).innerHTML = productElements[page.productStart];
        page.productStart++;
    }     
}

function pageSwap(pageNumberSelected,currentPage){

    if(pageNumberSelected != currentPage){
        page.currentPage = pageNumberSelected;
        page.productStart = (page.currentPage * 12) - 12;
        getProductsFromDataBase(page.sorting); 
    }
                    
}

function setPageButtons(direction){

    document.getElementById("page-btn").innerHTML = null;  
    
    if(direction == "forward"){
        page.clickCount++;
        if((page.buttonNum-3) > 0){
            page.buttonNum = page.buttonNum-3;                   
        }
    }
    if(direction == "backward"){
        page.clickCount--;
        if((page.buttonNum-5) >= 0){
            page.buttonNum = page.buttonNum-5;
        }
    }

    if(page.clickCount >= 1){
        document.getElementById("page-btn").innerHTML += '<a id="backward" onclick="setPageButtons(id)"><span>&#8592;</span></a>';
    }
    for(i = 0; i < 4; i++){
        page.buttonNum++;
        document.getElementById("page-btn").innerHTML += "<a id='"+ (page.buttonNum) + "' onclick='pageSwap(id,page.currentPage)'><span>"+ (page.buttonNum) +"</span></a>";        
    }
    
    if((page.buttonNum < page.totalPages) || (page.totalPages == 0)){
        document.getElementById("page-btn").innerHTML += '<a id="forward" onclick="setPageButtons(id)"><span>&#8594;</span></a>';
    }
        
}


function changeSorting(){

    let selectBox = document.getElementById("selectBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    page.sorting = selectedValue;
    page.productStart = 0;
    page.buttonNum = 0;
    page.clickCount = 0;
    page.currentPage = 1;

    setPageButtons();
    getProductsFromDataBase(selectedValue);
    
}