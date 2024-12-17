document.addEventListener("DOMContentLoaded", function(){
    var HomeBtn = document.getElementById('HomeBtn');
    var NewContactBtn = document.getElementById('NewContactBtn');
    var NewContactBtn2 = document.getElementById('NewContactBtn2');
    var UsersBtn = document.getElementById('UsersBtn');
    var LogoutBtn = document.getElementById('LogoutBtn');
    var HomePage = document.getElementById('home');
    var NewContactPage = document.getElementById('new-contact');
    var UsersPage = document.getElementById('users');
    var LogoutPage = document.getElementById('logout');
    var pages = document.getElementsByClassName('page');

    // Add 'hidden' class to all pages except the home page
    Array.from(pages).forEach(function(page) {
        page.classList.add("hidden");
    });
    HomePage.classList.remove("hidden");  // Remove 'hidden' class from the home page

    HomeBtn.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        HomePage.classList.remove("hidden");
    });

    NewContactBtn.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        NewContactPage.classList.remove("hidden");
    });

    NewContactBtn2.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        NewContactPage.classList.remove("hidden");
    });

    UsersBtn.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        UsersPage.classList.remove("hidden");
    });

    LogoutBtn.addEventListener("click", function(){
        Array.from(pages).forEach(function(page){
            page.classList.add("hidden");
        });
        LogoutPage.classList.remove("hidden");
    });
});
