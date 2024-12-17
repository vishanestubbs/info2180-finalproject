document.addEventListener('DOMContentLoaded', function() {
    var newContact = document.getElementById('addContact');
    var status = document.getElementById('newContactError');
    var title;
    var fname;
    var lname;
    var email;
    var tele;
    var company;
    var type;
    var assign;



    newContact.addEventListener("click", function(element){
        element.preventDefault();

        title = document.getElementById('c-title').value;
        fname = document.getElementById('c-first-name').value.trim();
        lname = document.getElementById('c-last-name').value.trim();
        email = document.getElementById('c-email').value.trim();
        tele = document.getElementById('c-telephone').value;
        company = document.getElementById('c-company').value.trim();
        type = document.getElementById('c-type').value;
        assign = document.getElementById('c-assign').value;

        var info = [title, fname, lname, email, tele, company, type, assign];
        var check;
        check = validateForm(info);

        if (!check[0]){
            status.textContent = check[1];
            status.classList.remove('confirm');
            status.classList.add('error');
            document.getElementById('c-first-name').value="";
            document.getElementById('c-last-name').value="";
            document.getElementById('c-email').value="";
            document.getElementById('c-telephone').value="";
            document.getElementById('c-company').value="";
        }
        else{
            rhttp = new XMLHttpRequest();
            var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=addC&title="+title
                        +"&fname="+fname
                        +"&lname="+lname
                        +"&email="+email
                        +"&tele="+tele
                        +"&company="+company
                        +"&ctype="+type
                        +"&assign="+assign;
            rhttp.onreadystatechange = addContact;
            rhttp.open('GET', url);
            rhttp.send();
            // userError.textContent = "Success";
        }
    });


    function addContact(){
        if (rhttp.readyState == 4 && rhttp.status == 200){
            var response = rhttp.responseText.trim();
            status.textContent = response;
            status.classList.remove('error');
            status.classList.add('confirm');
            document.getElementById('c-first-name').value="";
            document.getElementById('c-last-name').value="";
            document.getElementById('c-email').value="";
            document.getElementById('c-telephone').value="";
            document.getElementById('c-company').value="";
        }
    }


    function validateForm(info) {
        for (var field of info) {
            if (field===""){
                return [false, 'Please do not leave any fields blank'];
            }
          }

        var email = info[3];
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const isValidEmail = emailPattern.test(email);
        if (!isValidEmail) {
            return [false, 'Please enter a valid email address.']
        } 

        var telephoneNumber = info[4];
        const telephonePattern = /^\d{3}-\d{3}-\d{4}$/;
        const isValidTelephone = telephonePattern.test(telephoneNumber);
        if (!isValidTelephone) {
            return [false, 'Please enter a valid telephone number.'];
        }

        return [true,'']; 
    
      }


});


