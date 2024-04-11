-- database.sql
-- Create the recipe database if it doesn't exist
CREATE DATABASE IF NOT EXISTS recipe;
-- Switch to the recipe database
USE recipe;
-- Create the users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('recipe_seeker', 'cook') NOT NULL DEFAULT 'recipe_seeker'
);
-- Insert some initial data (optional)
INSERT INTO users (username, password, role)
VALUES (
        'recipe_seeker_user',
        'test@recipe_seeker_user',
        'recipe_seeker'
    ),
    (
        'cook_user',
        'test@cook_user',
        'cook'
    );
-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image LONGBLOB,
    category VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    cook_id INT NOT NULL,
    FOREIGN KEY (cook_id) REFERENCES users(id)
);
-- Insert sample recipes
INSERT INTO recipes (
        name,
        description,
        image,
        category,
        location,
        cook_id
    )
VALUES (
        'Dosa',
        'A South Indian delicacy',
        'base64_image_data_for_dosa',
        'Breakfast',
        'India',
        2
    ),
    (
        'Spaghetti Bolognese',
        'Classic Italian pasta dish',
        'base64_image_data_for_spaghetti',
        'Dinner',
        'Italy',
        2
    ),
    (
        'Chocolate Cake',
        'Irresistible chocolatey goodness',
        'base64_image_data_for_chocolate_cake',
        'Dessert',
        'Global',
        2
    );