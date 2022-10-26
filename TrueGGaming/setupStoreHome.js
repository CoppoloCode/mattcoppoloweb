
function getProductsFromDataBase(){
    $.ajax({
        url: 'getProducts.php',
        type: 'POST',
        dataType: 'json',
        data: {functionname: 'getProducts' , typename: 'all'},
        success: setProducts,
       
    });
}

function setProducts(data){         
                        
    let products = data;
    let shuffledProducts = [];
    let productElements = [];
    let productPlacementId = "product-";
    
    shuffledProducts = shuffleProducts(products);
    productElements = getProductElements(shuffledProducts);
    for(let i = 1; i < 9; i++){
        document.getElementById(productPlacementId + i).innerHTML = productElements[i];
    }                 
}



const slider = document.querySelector('.categories');
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
