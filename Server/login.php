<?php

session_start();


$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "recipe";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$username = $_POST['username'];
$password = $_POST['password'];


$sql = "SELECT * FROM users WHERE username='$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row["password"])) {
        
        $_SESSION["user_id"] = $row["id"];
        $_SESSION["username"] = $row["username"];
        $_SESSION["role"] = $row["role"];

        echo json_encode(['success' => true, 'message' => 'Login successful', 'role' => $row["role"]]);
        http_response_code(200);  
        exit();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid password']);
        http_response_code(401);  
        exit();
    }
} else {
    echo json_encode(['success' => false, 'message' => 'User not found']);
    http_response_code(404);  
    exit();
}
