
var sendCount = 0;

let frontendImages = ["html","javascript","css","react","jquery"];
let toolsImages = ["github","visualstudio","railway","heroku"];
let backendImages = ["mysql","node","express","socketio","php"];

function showTools(event){
    let time = .2;

    if(event.target.id === "frontend"){
      
      document.getElementById("frontendtools").innerHTML = ``;
      for(i = 0; i < frontendImages.length; i++){
        document.getElementById("frontendtools").innerHTML += `<img id="`+frontendImages[i]+`" src="images/`+frontendImages[i]+`.png">`
      }
      for(i = 0; i < frontendImages.length; i++){
        document.getElementById(frontendImages[i]).style.animation = "showtools "+time+"s ease-in";
        time += .1;
      }
        
    }
    if(event.target.id === "tools"){
      document.getElementById("toolstools").innerHTML = ``;
      for(i = 0; i < toolsImages.length; i++){
        document.getElementById("toolstools").innerHTML += `<img id="`+toolsImages[i]+`" src="images/`+toolsImages[i]+`.png">`
      }
      for(i = 0; i < toolsImages.length; i++){
        document.getElementById(toolsImages[i]).style.animation = "showtools "+time+"s ease-in";
        time += .1;
      }
    }
    if(event.target.id === "backend"){
      document.getElementById("backendtools").innerHTML = ``;
      for(i = 0; i < backendImages.length; i++){
        document.getElementById("backendtools").innerHTML += `<img id="`+backendImages[i]+`" src="images/`+backendImages[i]+`.png">`
      }
      for(i = 0; i < backendImages.length; i++){
        document.getElementById(backendImages[i]).style.animation = "showtools "+time+"s ease-in";
        time += .1;
      }
    }
    
}

function hideTools(event){

  let time = .2;

  if(event.target.id === "frontend"){
    
    for(i = 0; i < frontendImages.length; i++){
      document.getElementById(frontendImages[i]).style.animation = "hidetools "+time+"s ease-in";
      document.getElementById(frontendImages[i]).style.animationFillMode = "forwards";
      time += .1;
    }
    


  }
  if(event.target.id === "tools"){
    
    for(i = 0; i < toolsImages.length; i++){
      document.getElementById(toolsImages[i]).style.animation = "hidetools "+time+"s ease-in";
      document.getElementById(toolsImages[i]).style.animationFillMode = "forwards";
      time += .1;
    }

  }
  if(event.target.id === "backend"){
    
    for(i = 0; i < backendImages.length; i++){
      document.getElementById(backendImages[i]).style.animation = "hidetools "+time+"s ease-in";
      document.getElementById(backendImages[i]).style.animationFillMode = "forwards";
      time += .1;
    }

  }

}

  let frontend = document.getElementById("frontend");
  let tools = document.getElementById('tools');
  let backend = document.getElementById("backend");

  frontend.addEventListener("mouseover" , showTools);
  frontend.addEventListener("mouseleave" , hideTools);
  tools.addEventListener("mouseover" , showTools);
  tools.addEventListener("mouseleave" , hideTools);
  backend.addEventListener("mouseover" , showTools);
  backend.addEventListener("mouseleave" , hideTools);




$(document).ready(function() {
  
  $('form').submit(function(event) {

    let email = $('input[name=email]').val();
    let fname = $('input[name=fname]').val();
    let lname = $('input[name=lname]').val();
    let userMessage = $('textarea[name=userMessage]').val();

  
    if(sendCount == 0){

      $.ajax({
        type: "POST",
        url: "mailer.php",
        data: {email, fname, lname, userMessage},
        success: function(data){
          document.getElementsByClassName("contact-row-1")[0].innerHTML += `<small>Email Sent</small>`;
        },
        error: function(err){
          console.log(err);
        }
      });
    }

    sendCount++;
    event.preventDefault();

  });
});