document.addEventListener('DOMContentLoaded', function() {
    var result = document.getElementById('showUser');
    var users = document.getElementById('UsersBtn');

    users.addEventListener("click", function(){
        // console.log("here");
        View_users();
    });

    function View_users(){
        var xhttp = new XMLHttpRequest();  
        var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=showU";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {  
                result.innerHTML = xhttp.responseText;  
            }
        };
        xhttp.open('GET', url); 
        xhttp.send();  
    }

    
});
