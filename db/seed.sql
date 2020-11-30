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
    ("Line Producer", 90, 1),
    ("PA", 80, 1),
    ("VFX", 100, 2),
    ("CG", 100, 2),
    ("Concept", 70, 3),
    ("Storyboard", 70, 3),
    ("Texture", 60, 4),
    ("Rigging", 60, 4),
    ("Animator", 60, 5),
    ("Compositor", 90, 5);

--employee seed
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("Macy", "Jones", 1, NULL),
    ("Agustin", "Noguera", 1, NULL),
    ("Molly", "Kusilka", 2, 1),
    ("Eve", "Golegruz", 2, 1),
    ("Amber", "Collins", 3, NULL),
    ("Mary Margaret", "Gill", 3, 5),
    ("Dikenna", "Ogbo", 4, 5),
    ("Gabby", "Axner", 5, NULL),
    ("Maddy", "Wigglesworth", 6, 8),
    ("Rachel", "Suh", 6, 8),
    ("Kri", "Schafer", 7, 8),
    ("Alex", "Smith", 8, 8),
    ("Katherine", "Trott", 9, 8),
    ("Bharat", "Modi", 9, 8),
    ("Jaren", "Hubal", 10, 8),
