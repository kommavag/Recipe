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


$sql = "SELECT * FROM recipes";
$result = $conn->query($sql);

$recipes = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $imageData = base64_encode($row['image']);


        $recipes[] = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'description' => $row['description'],
            'image' => $imageData,
            'category' => $row['category'],
            'location' => $row['location']
        );
    }
}


$conn->close();


header('Content-Type: application/json');
echo json_encode($recipes);
