document.addEventListener('DOMContentLoaded', function() {
    var newUser = document.getElementById('addUser');
    var toUser = document.getElementById('goToUser');
    var user = document.getElementById('new_user');
    var userError = document.getElementById('newUserError');
    var pages = document.getElementsByClassName('page');

    var fname;
    var lname;
    var email;
    var pass;
    var role;

    toUser.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        user.classList.remove("hidden");
        console.log("test");
    });


    newUser.addEventListener("click", function(element){
        element.preventDefault();

        fname = document.getElementById('u-first-name').value.trim();
        lname = document.getElementById('u-last-name').value.trim();
        email = document.getElementById('u-email').value.trim();
        pass = document.getElementById('u-pass').value.trim();
        role = document.getElementById('u-role').value.trim();

        var info = [fname, lname, email, pass, role];
        var check;
        check = validateForm(info);

        if (!check[0]){
            userError.textContent = check[1];
            userError.classList.remove('confirm');
            userError.classList.add('error');
            document.getElementById('u-first-name').value="";
            document.getElementById('u-last-name').value="";
            document.getElementById('u-email').value="";
            document.getElementById('u-pass').value="";
        }
        else{
            rhttp = new XMLHttpRequest();
            var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=addU&fname="+fname
                        +"&lname="+lname
                        +"&email="+email
                        +"&pass="+pass
                        +"&role="+role;
            rhttp.onreadystatechange = addUser;
            rhttp.open('GET', url);
            rhttp.send();
            // userError.textContent = "Success";
        }
    });


    function addUser(){
        if (rhttp.readyState == 4 && rhttp.status == 200){
            var response = rhttp.responseText.trim();
            userError.textContent = response;
            userError.classList.remove('error');
            userError.classList.add('confirm');
            document.getElementById('u-first-name').value="";
            document.getElementById('u-last-name').value="";
            document.getElementById('u-email').value="";
            document.getElementById('u-pass').value="";
        }
    }


    function validateForm(info) {
        for (var field of info) {
            if (field===""){
                return [false, 'Please do not leave any fields blank'];
            }
          }

        var email = info[2];
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isValidEmail = emailPattern.test(email);
        if (!isValidEmail) {
            return [false, 'Please enter a valid email address.']
        } 


        var pass = info[3];
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        const isValidPass = passwordPattern.test(pass);
        if (!isValidPass) {
            return [false, 'Please enter a valid password.']
        } 
        
        return [true,'']; 
    
      }


});


