--create database
DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

--create departments table
CREATE TABLE department (
    id INT auto_increment NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

--create roles table
CREATE TABLE roles (
    id INT auto_increment NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id)
);

--create employees table
CREATE TABLE employee (
    id INT auto_increment NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    PRIMARY KEY (id)
);