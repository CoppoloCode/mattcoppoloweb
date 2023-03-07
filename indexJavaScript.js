
var sendCount = 0;

function reveal() {
    var reveals = document.querySelectorAll(".reveal");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active" + (i+1));
      } 
    }
  }
  
  window.addEventListener("scroll", reveal);

function showTools(event){
    if(event.target.id === "frontend"){
        
        document.getElementById("frontendtools").innerHTML = `<img id="html" src="images/html.png" >
                                                            <img id="javascript" src="images/javascript.png" >
                                                            <img id="css" src="images/css.png" >
                                                            <img id="react" src="images/react.png" >`
    }
    if(event.target.id === "tools"){

      document.getElementById("toolstools").innerHTML = `<img id="github" src="images/github.png" >
                                                            <img id="visual" src="images/visualStudio.png" >
                                                            <img id="railway" src="images/railway.png" >
                                                            <img id="heroku" src="images/heroku.png" >`
    }
    if(event.target.id === "backend"){

      document.getElementById("backendtools").innerHTML = `<img id="mysql" src="images/mysql.png" >
                                                            <img id="node" src="images/node.png" >
                                                            <img id="express" src="images/express.png" >
                                                            <img id="socketio" src="images/socketio.png" >`
    }
    
}

function hideTools(event){

  if(event.target.id === "frontend"){
    
    document.getElementById("html").style.animation = "hidetools .9s ease-in";
    document.getElementById("html").style.animationFillMode = "forwards";
    document.getElementById("javascript").style.animation = "hidetools .7s ease-in";
    document.getElementById("javascript").style.animationFillMode = "forwards";
    document.getElementById("css").style.animation = "hidetools .5s ease-in";
    document.getElementById("css").style.animationFillMode = "forwards";
    document.getElementById("react").style.animation = "hidetools .3s ease-in";
    document.getElementById("react").style.animationFillMode = "forwards";

  }
  if(event.target.id === "tools"){
    document.getElementById("github").style.animation = "hidetools .9s ease-in";
    document.getElementById("github").style.animationFillMode = "forwards";
    document.getElementById("visual").style.animation = "hidetools .7s ease-in";
    document.getElementById("visual").style.animationFillMode = "forwards";
    document.getElementById("railway").style.animation = "hidetools .5s ease-in";
    document.getElementById("railway").style.animationFillMode = "forwards";
    document.getElementById("heroku").style.animation = "hidetools .3s ease-in";
    document.getElementById("heroku").style.animationFillMode = "forwards";

  }
  if(event.target.id === "backend"){
    document.getElementById("mysql").style.animation = "hidetools .9s ease-in";
    document.getElementById("mysql").style.animationFillMode = "forwards";
    document.getElementById("node").style.animation = "hidetools .7s ease-in";
    document.getElementById("node").style.animationFillMode = "forwards";
    document.getElementById("express").style.animation = "hidetools .5s ease-in";
    document.getElementById("express").style.animationFillMode = "forwards";
    document.getElementById("socketio").style.animation = "hidetools .3s ease-in";
    document.getElementById("socketio").style.animationFillMode = "forwards";

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