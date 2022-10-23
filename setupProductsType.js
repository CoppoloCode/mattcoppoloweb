
class Page{
    constructor(productCounter,products, view){
        this.productCounter = productCounter;
        this.products = products;
        this.view = view;
    }
}

let page = new Page(0,[],0);
page.view = window.screen.availWidth;



function setTypeName(){
    let typeName;
    typeName = localStorage.getItem("chosenProductType");
    typeName = typeName.toString();
    setTypeTitle(typeName);
    getProductsFromDataBaseType(typeName);
}

function setTypeTitle(typeName){
    document.getElementById("title").innerText = "All " + typeName + 's';
}

function getProductsFromDataBaseType(typeName){

    $.ajax({
        url: 'getProductsType.php',
        type: 'POST',
        dataType:'json',
        data: {functionname: 'getProductsSortedReview', typename: typeName},
        success: getProductTypeElements,
    });
}  

function getProductTypeElements(data){         
    
    page.products = getProductElements(data);
    
    setupProductList();
    
}

function setupProductList(){

    for(i = 0; i < page.products.length; i++){

        document.getElementsByClassName("row")[0].innerHTML += `<div class="col">`+page.products[i]+`</div>`;
    }
   
}

function productScrollRight(){
    
    document.querySelector(".row").scrollLeft += page.view;
    
    
}
function productScrollLeft(){
    
    document.querySelector(".row").scrollLeft += -page.view;
    
   
}


const slider = document.querySelector('.row');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});


