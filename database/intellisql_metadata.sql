CREATE DATABASE IF NOT EXISTS intellisql_admin;
USE intellisql_admin;

CREATE TABLE IF NOT EXISTS query_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    database_name VARCHAR(100) NOT NULL,
    question TEXT NOT NULL,
    generated_sql TEXT,
    execution_time INT, -- in milliseconds
    status VARCHAR(50) NOT NULL, -- 'SUCCESS', 'FAILED', 'VALIDATION_FAILED'
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
