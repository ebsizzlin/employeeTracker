//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

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
            } else if (answer.choice === 'All done!') {
                console.log("That's a wrap!");
                connection.end();
            }
        });
};

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

// ==============
// currently under the assumption that my .then operations don't work, will likely have correct update after 12/4 tutoring session
// ==============

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
        });
};

//add employees
addEmployee = () => {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

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
                    type: 'list',
                    name: 'role_id',
                    message: "Employee's role ID?",
                    choices: () => {
                        arrayRole = [];
                        res.map(res => {
                            arrayRole.push(
                                res.title
                            );
                        })
                        return arrayRole;
                    }
                },
            ])
            .then((answer) => {
                var role = answer.role;
                connection.query("SELECT * FROM role", (err, res) => {
                    if (err) throw (err);
                    var roleFilter = res.filter((res) => {
                        return res.title == role;
                    })
                    var roldId = roleFilter[0].id;
                    connection.query("SELECT * FROM employee", (err, res) => {
                        inquirer
                            .prompt([
                                {
                                    type: 'list',
                                    name: 'manager_id',
                                    message: "Which manager?",
                                    choices: () => {
                                        arrayManager = []
                                        res.map(res => {
                                            arrayManager.push(
                                                res.last_name
                                            )
                                        })
                                        return arrayManager;
                                    }
                                }
                            ])
                            .then((answerManager => {
                                var manager = answerManager.manager;
                                connection.query("SELECT * FROM employee", (err, res) => {
                                    if (err) throw (err);
                                    var managerFilter = res.filter((res) => {
                                        return res.last_name == manager;
                                    })
                                    var managerId = managerFilter[0].id;
                                    
                                    var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
                                    var values = [answer.first_name, answer.last_name, role_id, manager_id]

                                    connection.query(query, values, (err, res, fields) => {
                                        console.log('Employee added: ${(values[0]).toUpperCase()}.')
                                    })
                                })
                            }))
                    })
                },
                (err) => {
                    if (err) throw err;
                    console.log("Employee added!");
                    anotherChoice();
                });
            });
    });
};

//update employees -- this doesnt feel complete
updateEmployee = () => {
    connection.query("SELECT * FROM eployee", (err, res) => {
        if (err) throw err;
        var newEmployees = res.map(employee => employee.first_name + '' + employee.last_name)
    })

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeNew',
                message: "Updating which employee's role?"
                // choices: viewEmployees
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'Update to what?'
                // choices: viewRoles
            }
        ])
        .then((answer) => {
            //new role id moves to first name location
            connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [answer.employee, answer.employeeRole],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    anotherChoice();
                });
        });
};