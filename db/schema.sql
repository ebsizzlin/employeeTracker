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

);

--create employees table
CREATE TABLE employee (

);