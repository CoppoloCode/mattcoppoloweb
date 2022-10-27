
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