document.addEventListener('DOMContentLoaded', function() {
    var result = document.getElementById('showDash');
    var all = document.getElementById('allC');
    var leads = document.getElementById('leadsC');
    var support = document.getElementById('supportC');
    var assign = document.getElementById('assignC');
    var HomeBtn = document.getElementById('HomeBtn');
    var filter = "";
    fetchData(filter);
    AssignList();

    HomeBtn.addEventListener("click", function(){
        filter = "all";
        fetchData(filter);
    });

    all.addEventListener("click", function(){
        filter = "all";
        fetchData(filter);
    });

    leads.addEventListener("click", function(){
        filter = "Sales Lead";
        fetchData(filter);
    });

    support.addEventListener("click", function(){
        filter = "Support";
        fetchData(filter);
    });

    assign.addEventListener("click", function(){
        filter = "assign";
        fetchData(filter);
    });

    // console.log("here");
      

    function fetchData(filterVal) {
        var xhttp = new XMLHttpRequest();  
        var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=showD&filter="+filterVal;
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {  
                result.innerHTML = xhttp.responseText;  
            }
        };
        xhttp.open('GET', url); 
        xhttp.send();
    }

    function AssignList(){
        var result = document.getElementById('c-assign');
        var xhttp = new XMLHttpRequest();  
        var url = "http://localhost/info2180-finalproject/php/dolphin-crm.php?type=Assign";
        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {  
                result.innerHTML = xhttp.responseText;  
            }
        };
        xhttp.open('GET', url); 
        xhttp.send();
    }
    
});
