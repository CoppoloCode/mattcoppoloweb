
// Cards
const subtitle1 = document.getElementsByClassName("card-subtitle")[0];
const subtitle2= document.getElementsByClassName("card-subtitle")[1];
const subtitle3 = document.getElementsByClassName("card-subtitle")[2];

const createWord = (text, index) => {
  const word = document.createElement("span");
  
  word.innerHTML = `${text} `;
  
  word.classList.add("card-subtitle-word");
  
  word.style.transitionDelay = `${index * 40}ms`;
  
  return word;
}

const addWord1 = (text, index) => subtitle1.appendChild(createWord(text, index));
const addWord2 = (text, index) => subtitle2.appendChild(createWord(text, index));
const addWord3 = (text, index) => subtitle3.appendChild(createWord(text, index));

const createSubtitle1 = text => text.split(" ").map(addWord1);
const createSubtitle2 = text => text.split(" ").map(addWord2);
const createSubtitle3 = text => text.split(" ").map(addWord3);

createSubtitle1("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
createSubtitle2("Lorem ipsum dolor sit amet consectetur adipisicing elit.");
createSubtitle3("Lorem ipsum dolor sit amet consectetur adipisicing elit.");




// Cards-2
document.getElementById("cards-2").onmousemove = e => {
  for(const card of document.getElementsByClassName("card-2")) {
    const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top;

    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };
}


// Magic Text
let index = 0,
    interval = 1000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 1000);
  }, index++ * (interval / 3))
}

