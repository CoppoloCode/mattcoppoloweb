

class Page{
    constructor(products, currentPage, totalPages, clickCount, buttonNum, sorting, typeSorting, productStart){
        this.products = products;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.clickCount = clickCount;
        this.buttonNum = buttonNum;
        this.sorting = sorting;
        this.typeSorting = typeSorting;
        this.productStart = productStart;
    } 
}

let page = new Page([],1,0,0,0,1,1,0);


function getProductsFromDataBase(sortNum, typeSortNum){

    let typeSorting = ['all', 'headset' , 'keyboard', 'mouse' , 'PC'];
    let sorting = ['getProducts', 'getProductsSortedPriceAsc', 'getProductsSortedPriceDesc', 'getProductsSortedReview'];
    let typeSort = typeSorting[typeSortNum-1];
    let sort = sorting[sortNum-1];

    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: sort, typename: typeSort},
        success: getProducts,
    });
  
}  

function getProducts(data){         
              
    page.products = data;

    let productElements = []; 
    let totalPages = page.products.length/12;
    page.totalPages = Math.ceil(totalPages);
    page.sortingCounter++; 
    productElements = getProductElements(page.products);
    setupProducts(productElements);
    setPageButtons();
                      
}


function setupProducts(productElements){

    let productPlacementId = "product-";

    for(let i = 0; i < 12; i++){  
        if(page.productStart != page.products.length){
            document.getElementById(productPlacementId + (i+1)).innerHTML = productElements[page.productStart];
            page.productStart++;
        }else{
            document.getElementById((productPlacementId + (i+1))).innerHTML = "<img src='images/blank.png'></img>";
        }
        
    }    
     
}

function pageSwap(pageNumberSelected,currentPage){

    if(pageNumberSelected != currentPage){
        page.currentPage = pageNumberSelected;
        page.productStart = (page.currentPage * 12) - 12;
        let productElements = getProductElements(page.products);
        setupProducts(productElements);
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
    if(page.totalPages < 4){
        
        for(i = 0; i < page.totalPages; i++){
            page.buttonNum = i+1;
            document.getElementById("page-btn").innerHTML += "<a id='"+ (page.buttonNum) + "' onclick='pageSwap(id,page.currentPage)'><span>"+ (page.buttonNum) +"</span></a>";        
        }
    }else{
        for(i = 0; i < 4; i++){
        page.buttonNum++;
        document.getElementById("page-btn").innerHTML += "<a id='"+ (page.buttonNum) + "' onclick='pageSwap(id,page.currentPage)'><span>"+ (page.buttonNum) +"</span></a>";        
    }
    }
    
    if(page.totalPages != page.buttonNum){
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

    getProductsFromDataBase(selectedValue , page.typeSorting);
}
function changeTypeSorting(){

    let selectBox = document.getElementById("selectTypeBox");
    let selectedValue = selectBox.options[selectBox.selectedIndex].value;
    page.typeSorting = selectedValue;
    page.productStart = 0;
    page.buttonNum = 0;
    page.clickCount = 0;
    page.currentPage = 1;

    getProductsFromDataBase(page.sorting, selectedValue);
}

