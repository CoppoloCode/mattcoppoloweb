

class Page{
    constructor(productElements, currentPage, clickCount, buttonNum, sorting, typeSorting, productStart){
        this.productElements = productElements;
        this.currentPage = currentPage;
        this.clickCount = clickCount;
        this.buttonNum = buttonNum;
        this.sorting = sorting;
        this.typeSorting = typeSorting;
        this.productStart = productStart;
    } 
}

let page = new Page([],1,0,0,1,1,0);


function getProductsFromDataBase(sortNum, typeSortNum){

    const typeSorting = ['all', 'headset' , 'keyboard', 'mouse' , 'PC'];
    const sorting = ['getProducts', 'getProductsSortedPriceAsc', 'getProductsSortedPriceDesc', 'getProductsSortedReview'];
    let typeSort = typeSorting[typeSortNum-1];
    let sort = sorting[sortNum-1];

    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: sort, typename: typeSort},
        success: function(data){
            page.productElements = getProductElements(data);
            setupProducts(page.productElements);
            setPageButtons();
        },
        error: function(err){
            console.log(err.responseText);
        }
    });
  
}  

function setupProducts(productElements){

    let productPlacementId = "product-";

    for(let i = 0; i < 12; i++){  
        if(page.productStart < productElements.length){
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
        setupProducts(page.productElements);
    }
                    
}

function setPageButtons(direction){

    let totalPages = page.productElements.length/12;
    totalPages = Math.ceil(totalPages); 

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
    document.getElementById('page-btn').innerHTML = '';
    if(page.clickCount >= 1){
        document.getElementById("page-btn").innerHTML += '<a id="backward" onclick="setPageButtons(id)"><span>&#8592;</span></a>';
    }
    if(totalPages < 4){
        for(i = 0; i < totalPages; i++){
            page.buttonNum = i+1;
            document.getElementById("page-btn").innerHTML += "<a id='"+ (page.buttonNum) + "'href='#' onclick='pageSwap(id,page.currentPage)'><span>"+ (page.buttonNum) +"</span></a>";        
        }
    }else{
        for(i = 0; i < 4; i++){
            page.buttonNum++;
            document.getElementById("page-btn").innerHTML += "<a id='"+ (page.buttonNum) + "'href='#' onclick='pageSwap(id,page.currentPage)'><span>"+ (page.buttonNum) +"</span></a>";  
        }
    }
    if(totalPages != page.buttonNum){
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
