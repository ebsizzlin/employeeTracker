--create database
DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

--create departments table
CREATE TABLE department (
    id INT auto_increment PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

--create roles table
CREATE TABLE role (
    id INT auto_increment PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    department_id INT NOT NULL
);

--create employees table
CREATE TABLE employee (

);