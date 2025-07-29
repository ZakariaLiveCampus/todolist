CREATE DATABASE IF NOT EXISTS todolist;
CREATE USER IF NOT EXISTS 'todolist_user'@'%' IDENTIFIED BY 'todolistpassword';
GRANT ALL PRIVILEGES ON todolist.* TO 'todolist_user'@'%';
FLUSH PRIVILEGES;
USE todolist;
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);
