document.addEventListener('DOMContentLoaded', function() {
    var logout = document.getElementById('LogoutBtn');


logout.addEventListener("click", function(element){
    console.log("here");
    element.preventDefault();

    xhttp = new XMLHttpRequest();
    var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=logout";
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {  
            var response = xhttp.responseText.trim();
            if (response === 'out'){
                window.location.href = 'login.html';
                console.log(response);
           }
           else{
            alert("An error has occured")
           }
        }
    };
    xhttp.open('GET', url); 
    xhttp.send(); 
});

});