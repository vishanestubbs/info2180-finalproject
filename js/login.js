
window.onload = function() {
    var login = document.getElementById('login');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var result = document.getElementById('result');


    login.addEventListener("click", function(element){
        element.preventDefault();
    
        xhttp = new XMLHttpRequest();
        var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=login&email="+email.value+"&password="+password.value;
        // rhttp.onreadystatechange = toHome;
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200){
                var response = xhttp.responseText.trim();
                console.log(response);
               if (response === 'success'){
                    window.location.href = '../html/home.html';
                    // console.log(response);
               }
               else{
                result.innerHTML="<p>" + response + "</p>";
                result.classList.add('error');
               }
            }
        }
        xhttp.open('GET', url);
        xhttp.send();
    });


}


