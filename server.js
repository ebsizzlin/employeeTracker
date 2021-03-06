//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
var figlet = require("figlet");

//creating connection info
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Ella98th',
    database: 'employees_DB'
});

//connecting to mysql server & database
connection.connect((err) => {
    if (err) throw err;
    promptUser();
})

//function to prompt user
promptUser = () => {
    //where to add the figlet?
    // figlet('Employee Tracker', (err, result) => {
    //     console.log(err || result);
    // });

    inquirer
        .prompt({
            type: 'list',
            name: 'choice',
            message: 'Pick one:',
            choices: [
                "View departments",
                "View roles",
                "View employees",
                "Add department",
                "Add role",
                "Add employee",
                "Update employee role",
                "Delete department",
                "Delete role",
                "Delete employee",
                "All done!"
            ]
        })
        //if and else ifs to go to new functions based off of answer
        .then((answer) => {
            if (answer.choice === 'View departments') {
                viewDepartments();
            } else if (answer.choice === 'View roles') {
                viewRoles();
            } else if (answer.choice === 'View employees') {
                viewEmployees();
            } else if (answer.choice === 'Add department') {
                addDepartment();
            } else if (answer.choice === 'Add role') {
                addRole();
            } else if (answer.choice === 'Add employee') {
                addEmployee();
            } else if (answer.choice === 'Update employee role') {
                updateEmployee();
            } else if (answer.choice === 'Delete department') {
                deleteDepartment();
            } else if (answer.choice === 'Delete role') {
                deleteRole();
            } else if (answer.choice === 'Delete employee') {
                deleteEmployee();
            } else if (answer.choice === 'All done!') {
                console.log("That's a wrap!");
                connection.end();
            }
        });
};

//how to add 'EMPLOYEE TRACKER' graphic?

//ask if user wants to select something else -- does this work???
anotherChoice = () =>   {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'choice',
                message: 'Make another choice?'
            }
        ])
        .then(answer => {
            if (answer.choice) {
                promptUser();
            }
            else {
                console.log("That's a wrap!");
                connection.end();
            };
        });
};

//vew departments
viewDepartments = () => {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        anotherChoice();
    });
};

//view roles
viewRoles = () => {
    var query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        anotherChoice();
    });
};

//view employees
viewEmployees = () => {
    var query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        anotherChoice();
    });
};

//add departments
addDepartment = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'department',
                message: 'Name of the department?'
            }
        ])
        .then((res) => {
            connection.query("INSERT INTO department (name) VALUES (?) ", [res.department],
                (err, data) => {
                    if (err) throw err;
                    console.table("Department added!");
                    anotherChoice();
                });

            //quit error
            connection.query("SELECT * FROM department", (err, res) => {
                if (err) throw err;
                console.table("All departments: ", res);
                anotherChoice();
            });
        });
};

//add roles
addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Role title?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'Role salary?'
            },
            {
                type: 'number',
                name: 'department_id',
                message: 'Department ID?',
                //choices cycle?

            }
        ])
        .then((res) => {
            //could i use jquery here?
            connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?) ", [res.title, res.salary, res.department_id],
                (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    console.log("Role added!");
                    anotherChoice();
                });

            //quit error
            connection.query("SELECT * FROM roles", (err, res) => {
                if (err) throw err;
                console.table("All roles: ", res);
                anotherChoice();
            });
    });
};

//add employees
addEmployee = () => {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: "Employee's first name?"
                },
                {
                    type: 'input',
                    name: 'last_name',
                    message: "Employee's last name?"
                },
                {
                    type: 'input',
                    name: 'role_id',
                    message: "Employee's role ID?",
                    //choices cycle?
                },
                {
                    type: 'input',
                    name: 'manager_id',
                    message: "Manager's ID?"
                    //choices cycle?

                }
            ])
            .then((res) => {
                connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [res.first_name, res.last_name, res.role_id, res.manager_id], (err, data) => {
                    if (err) throw err;
                    console.table(res);
                    anotherChoice()
                });

                //quit error
                connection.query("SELECT * FROM employee", (err, res) => {
                    if (err) throw err;
                    console.table("All employees: ", res);
                    anotherChoice();
                });
            });
};

//delete department
deleteDepartment = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Department ID to delete?"
                    //choices cycle?
                }
            ])
            .then((res) => {
                var selectedDepartment = res.name;
                console.log(selectedDepartment);
                
                connection.query("DELETE FROM department WHERE ?",
                    [
                        {
                            id: selectedDepartment
                        }
                    ])

                    console.log("Department deleted!");

                    connection.query("SELECT * FROM department", (err, res) => {
                        if (err) throw err;
                        console.table("All departments: ", res);
                        anotherChoice();
                    });
            });
    });
};

//delete roles
deleteRole = () => {
    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Role ID to delete?"
                    //choices cycle?
                }
            ])
            .then((res) => {
                var selectedRole = res.name;
                console.log(selectedRole);

                connection.query("DELETE FROM roles WHERE ?",
                    [
                        {
                            id: selectedRole
                        }
                    ])

                    console.log("Role deleted!");

                    connection.query("SELECT * FROM roles", (err, res) => {
                        if (err) throw err;
                        console.table("All roles: ", res);
                        anotherChoice();
                    });
            });
    });
};

//delete employee
deleteEmployee = () => {
    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        console.table(res);

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'name',
                    message: "Employee ID to delete?"
                    //choices cycle?
                }
            ])
            .then((res) => {
                var selectedEmployee = res.name;
                console.log(selectedEmployee);

                connection.query("DELETE FROM employee WHERE ?",
                    [
                        {
                            id: selectedEmployee
                        }
                    ])

                    console.log("Employee deleted!");
                    
                    connection.query("ALTER TABLE employee DROP id", (err, res) => {
                        if (err) throw err;
                    });
                    connection.query("ALTER TABLE employee AUTO_INCREMENT =1", (err, res) => {
                        if (err) throw err;
                    });
                    connection.query("ALTER TABLE employee ADD id int UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST", (err, res) => {
                        if (err) throw err;
                    });

                    connection.query("SELECT * FROM employee", (err, res) => {
                        if (err) throw err;
                        console.table("All employees: ", res);
                        anotherChoice();
                    });
            });
    });
};

//update employees -- this is just changing role_id to null
updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "Updating which employee's role?",
                //choices cycle?
            },
            {
                type: 'number',
                name: 'role_id',
                message: 'New role ID?'
                //choices cycle?
            }
        ])
        .then((res) => {
            //new role id moves to first name location
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.rold_id, res.first_name],
                (err, data) => {
                    if (err) throw err;
                    console.table(data);
                    anotherChoice();
                });
            
            //quit error
            connection.query("SELECT * FROM employee", (err, res) => {
                if (err) throw err;
                console.table("All employees: ", res);
                anotherChoice();
            })
        });
};

//way to cycle?
            // arrayEmployee = [];
            // res.map(res => {
            //     arrayEmployee.push(
            //         res.title
            //     );
            // })
            // return arrayEmployee;