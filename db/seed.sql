USE employees_DB;

--department seed
INSERT INTO department (name)
VALUES
    ("Production"),
    ("Supervisory"),
    ("Story Artist"),
    ("Asset Artist"),
    ("Shot Artist");

--role seed
INSERT INTO roles (title, salary, department_id)
VALUES

--employee seed
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES