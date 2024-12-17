<?php
session_start();
header("Access-Control-Allow-Origin: *");
$host = 'localhost';
$username = 'proj_user';
$password = 'password123';
$dbname = 'dolphin_crm';

function sanitize($input) {
    $input = trim($input);
    $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
    return $input;
}

$conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);

if ($_GET['type']==="login"){
    $email = $_GET['email'];
    $pass = $_GET['password'];

    $user = $conn->query("SELECT * FROM Users WHERE email = '$email'");

    if ($user ->rowCount()>0) {
        $row = $user->fetch(PDO::FETCH_ASSOC);
        if (password_verify($pass, $row['password'])) {
            $_SESSION['role'] = $row['role'];
            $_SESSION['id'] = $row['id'];
            echo "success";
        } else {
            echo "Invalid";
        }
    } else {
        echo "NotFound";
    }
}
if ($_GET['type']==="addU"){
    $u_fname = sanitize($_GET['fname']);
    $u_lname = sanitize($_GET['lname']);
    $u_email = sanitize($_GET['email']);
    $u_pass = password_hash(sanitize($_GET['pass']), PASSWORD_DEFAULT);
    $u_role = $_GET['role'];

    try{
        $user = $conn->query("INSERT INTO Users (firstname, lastname, email, password, role) VALUES ('$u_fname', '$u_lname', '$u_email', '$u_pass', '$u_role')");
        echo "User Added Successfully";
    }
    catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }
}

if ($_GET['type']==="showU"){

    $user = $conn->query("SELECT firstname, lastname, email, role, created_at FROM Users");
    $results = $user->fetchAll(PDO::FETCH_ASSOC);
    echo("<table class='table'>");
        echo("<tr>");
        echo("<th>NAME</th>");
        echo("<th>EMAIL</th>");
        echo("<th>ROLE</th>");
        echo("<th>CREATED</th>");
        echo("</tr>");
    foreach ($results as $row){
        echo("<tr>");
        echo("<td>" . $row["firstname"] . " " . $row["lastname"] . "</td>");
        echo("<td>".$row["email"]."</td>");
        echo("<td>".$row["role"]."</td>");
        echo("<td>".$row["created_at"]."</td>");
        echo("</tr>");
    }
    echo("</table>");
    
}
if ($_GET['type']==="logout"){
    $_SESSION = array();    
    session_destroy();
    echo "out";
}

if ($_GET['type']==="showD"){
    $type = $_GET['filter'];
    if ($type != "Sales Lead" && $type != "Support"){
        $user = $conn->query("SELECT id, title, firstname, lastname, email, company, type FROM Contacts");
    }
    else{
        $user = $conn->query("SELECT id, title, firstname, lastname, email, company, type FROM Contacts WHERE type = '$type'");
    }
    
    $results = $user->fetchAll(PDO::FETCH_ASSOC);
    echo("<table class='table'>");
        echo("<tr>");
        echo("<th>NAME</th>");
        echo("<th>EMAIL</th>");
        echo("<th>COMPANY</th>");
        echo("<th>TYPE</th>");
        echo("</tr>");
    foreach ($results as $row){
        echo("<tr>");
        echo("<td>" . $row["title"] . " " . $row["firstname"] . " " . $row["lastname"] . "</td>");
        echo("<td>".$row["email"]."</td>");
        echo("<td>".$row["company"]."</td>");
        echo("<td>".$row["type"]."</td>");
        $view_id = $row["id"];
        echo("<td> <a href='#' onclick='viewContact($view_id)' id='$view_id'>view</a></td>");
        echo("</tr>");
    }
    echo("</table>");
    
}
if ($_GET['type']==="Assign"){

    $user = $conn->query("SELECT firstname, lastname FROM Users ");
    $results = $user->fetchAll(PDO::FETCH_ASSOC);
    foreach ($results as $row){
        $name = $row["firstname"] . " " . $row["lastname"];
        echo "<option value='$name'>" . $row["firstname"] . " " . $row["lastname"] . "</option>";
    }
    
}

if ($_GET['type']==="addC"){
    $c_title = sanitize($_GET['title']);
    $c_fname = sanitize($_GET['fname']);
    $c_lname = sanitize($_GET['lname']);
    $c_email = sanitize($_GET['email']);
    $c_tele = $_GET['tele'];
    $c_company = sanitize($_GET['company']);
    $c_type = $_GET['ctype'];
    $c_assign = $_GET['assign'];
    $nameParts = explode(' ', $c_assign);

    $a_fname = $nameParts[0];
    $a_lname = $nameParts[1];


    $assign_id = $conn->query("SELECT id FROM Users WHERE firstname = '$a_fname' AND lastname = '$a_lname'");
    $id = $assign_id->fetch(PDO::FETCH_ASSOC);
    $id = $id['id'];
    $i=$_SESSION['id'];

    try{
        $user = $conn->query("INSERT INTO Contacts (title, firstname, lastname, email, telephone, company, type, assigned_to, created_by)
                            VALUES ('$c_title', '$c_fname', '$c_lname', '$c_email', '$c_tele', '$c_company', '$c_type', '$id', '$i')");
        echo "Contact Added Successfully";
    }
    catch (PDOException $e) {
        // echo "Error: " . $e->getMessage();
        echo " This: " . $id;
    }
}

if ($_GET['type']==="viewC"){

    $sel_id = $_GET['sel_id'];
   
    $user = $conn->query("SELECT * FROM Contacts WHERE id = '$sel_id'");
    
    $res = $user->fetch(PDO::FETCH_ASSOC);

    $assigned = $res["assigned_to"];
    $created = $res["created_by"];

    $user = $conn->query("SELECT firstname, lastname FROM Users WHERE id = '$assigned'");
    $a = $user->fetch(PDO::FETCH_ASSOC);
    $a_fname = $a["firstname"];
    $a_lname = $a["lastname"];

    $user = $conn->query("SELECT firstname, lastname FROM Users WHERE id = '$created'");
    $c = $user->fetch(PDO::FETCH_ASSOC);
    $c_fname = $c["firstname"];
    $c_lname = $c["lastname"];
    
    echo '<div id="heading">' ;
    echo '<h1>' . $res["title"] . ' ' . $res["firstname"] . ' ' . $res["lastname"] . '</h1>';
    echo '<p> Created on ' . $res["created_at"] . ' by ' . $c_fname . " " . $c_lname . '</p>';
    echo '<p> Updated on ' . $res["updated_at"]. '</p>';
    echo '</div>';

    echo '<div id="sel_info">';
    echo '<p> <b> Email: </b> ' . $res["email"] . '</p> <br>';
    echo '<p> <b> Telephone: </b>' . $res["telephone"] . '</p> <br>';
    echo '<p> <b> Company: </b>' . $res["company"] . ' </p> <br>';
    echo '<p> <b> Assigned to: </b>' . $a_fname . " " . $a_lname. ' </p>';
    echo '</div>';
    echo '<br>';
    echo '<button id="a_t_me" style="margin-right:10px;"> Assign to me </button>';
    if ($res["type"]==="Support"){
        echo "<button id='switch' onclick='swap($sel_id)'> Switch to Sales Lead </button>";
    }
    else{
        echo "<button id='switch' onclick='swap($sel_id)'> Switch to Support </button>";
    }
    echo '<div id="swap_res">';
    echo '</div>';
    echo '<hr>';
    echo '<h2> Notes: </h2>';
    echo '<div id="notes">';
    // echo 'hello';
    $user = $conn->query("SELECT * FROM Notes WHERE contact_id = '$sel_id'");
    $notes = $user->fetchAll(PDO::FETCH_ASSOC);

    foreach ($notes as $row){
        $n_id = $row["created_by"];

        $user = $conn->query("SELECT firstname, lastname FROM Users WHERE id = '$n_id'");
        $u = $user->fetch(PDO::FETCH_ASSOC);
        $u_fname = $u["firstname"];
        $u_lname = $u["lastname"];
        echo '<div class="note_item">';
        echo '<h3>' . $u_fname . ' ' . $u_lname . '</h3>';
        echo '<p>' . $row["comment"] . '</p>';
        echo '<p><em>' . $row["created_at"] . '</em></p>';
        echo '</div>';
    }
    echo '</div>';
    
}

if ($_GET['type']==="swap"){
    $sel_id = $_GET['sel_id'];

    $user = $conn->query("SELECT * FROM Contacts WHERE id = '$sel_id'");
    
    $res = $user->fetch(PDO::FETCH_ASSOC);
    $type = $res["type"];

    if ($type ==="Support"){
        $user = $conn->query("UPDATE Contacts SET type='Sales Lead' WHERE id='$sel_id'");
        echo "Type changed to Sales Lead";
    }
    else{
        $user = $conn->query("UPDATE Contacts SET type='Support' WHERE id='$sel_id'");
        echo "Type changed to Support";
    }
    
}

?>