USE employees_DB;

-- department seed
INSERT INTO department (id, name)
VALUES
    (1, "Production"),
    (2, "Supervisory"),
    (3, "Story Artist"),
    (4, "Asset Artist"),
    (5, "Shot Artist");

-- role seed
INSERT INTO roles (id, title, salary, department_id)
VALUES
    (1, "Line Producer", 90, 1),
    (2, "PA", 80, 1),
    (3, "VFX", 100, 2),
    (4, "CG", 100, 2),
    (5, "Concept", 70, 3),
    (6, "Storyboard", 70, 3),
    (7, "Texture", 60, 4),
    (8, "Rigging", 60, 4),
    (9, "Animator", 60, 5),
    (10, "Compositor", 90, 5);

-- employee seed
INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
-- tbh i have no clue what the role and manager ids technically connect to i j guessed what it might mean
    (1, "Macy", "Jones", 1, NULL),
    (2, "Agustin", "Noguera", 1, NULL),
    (3, "Molly", "Kusilka", 2, 1),
    (4, "Eve", "Golecruz", 2, 1),
    (5, "Amber", "Collins", 3, NULL),
    (6, "Mary Margaret", "Gill", 3, 5),
    (7, "Dikenna", "Ogbo", 4, 5),
    (8, "Gabby", "Axner", 5, NULL),
    (9, "Maddy", "Wigglesworth", 6, 8),
    (10, "Rachel", "Suh", 6, 8),
    (11, "Kri", "Schafer", 7, 8),
    (12, "Alex", "Smith", 8, 8),
    (13, "Katherine", "Trott", 9, 8),
    (14, "Bharat", "Modi", 9, 8),
    (15, "Jaren", "Hubal", 10, 8)
