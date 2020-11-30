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
    ("Runner", 80, 1),
    ("VFX", 100, 2),
    ("CG", 100, 2),
    ("Lead", 80, 2),
    ("Concept", 70, 3),
    ("Storyboard", 70, 3),
    ("Previs", 70, 3),
    ("Modeller", 60, 4),
    ("Texture", 60, 4),
    ("Rigging", 60, 4),
    ("Cloth", 60, 4),
    ("Animator", 60, 5),
    ("Matte", 60, 5),
    ("Lighting", 70, 5),
    ("Rotoscope", 70, 5),
    ("FX", 70, 5),
    ("Compositor", 90, 5);

--employee seed
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES