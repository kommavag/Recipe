<?php
// Start or resume a session
session_start();

// Check if the user is logged in and has the admin role
if (!isset($_SESSION["user_id"]) || $_SESSION["role"] !== 'cook') {
    echo json_encode(['success' => false, 'message' => 'Unauthorized access']);
    http_response_code(401);  // Unauthorized
    exit();
}

// Connect to MySQL
$servername = "localhost";
$username_db = "root";
$password_db = "";
$dbname = "recipe";

$conn = new mysqli($servername, $username_db, $password_db, $dbname);

// Check connection
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $conn->connect_error]);
    http_response_code(500);  // Internal Server Error
    exit();
}

// Get recipe ID from the POST request
$recipeId = $_POST['recipeId'];

// Delete the recipe from the database
$sql = "DELETE FROM recipes WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $recipeId);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Recipe deleted successfully']);
    http_response_code(200);  // OK
} else {
    echo json_encode(['success' => false, 'message' => 'Error deleting recipe: ' . $stmt->error]);
    http_response_code(500);  // Internal Server Error
}

// Close the prepared statement
$stmt->close();

// Close the database connection
$conn->close();
