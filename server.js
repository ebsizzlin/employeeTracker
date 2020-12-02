//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");
const { join } = require("path");

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
                "Update Employee",
                "All done!"
            ]
        })

        //if and else ifs to go to new functions based off of answer
        .then((answer) => {
            if (answer.action === 'View departments') {
                viewDepartments();
            } else if (answer.action === 'View roles') {
                viewRoles();
            } else if (answer.action === 'View employees') {
                viewEmployees();
            } else if (answer.action === 'Add department') {
                addDepartment();
            } else if (answer.action === 'Add role') {
                addRole();
            } else if (answer.action === 'Add employee') {
                addEmployee();
            } else if (answer.action === 'Update Employee') {
                updateEmployee();
            } else if (answer.action === 'All done!') {
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
                name: 'action',
                message: 'Make another choice?'
            }
        ])
        .then(answer => {
            if (answer.choice) {
                promptUser();
            }
            else {
                connection.end();
                console.log('Success!');
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
                name: 'name',
                message: 'Name of the department?'
            }
        ])
        .then((answer) => {
            //could i use jquery here?
            connection.query("INSERT INTO department (department) VALUES (?) ", [answer.name],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    console.log("Department added!");
                    anotherChoice();
                });
                
            // connection.query(query, (err, res) => {
            //     console.log('Department added!')
            //     if (err) throw (err);
            //     console.table(res);
            //     anotherChoice();
            // });
        });
};

//add roles
addRole = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary of role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Department ID for role?',
            }
        ])
        .then((answer) => {
            //could i use jquery here?
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?) ", [answer.title, answer.salary, answer.department_id],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    console.log("Role added!");
                    anotherChoice();
                });
                
                // (res) => {
                    // var title = res.title;
                    // var salary = res.salary;
                    // var department_id = res.department_id;
                    
                    // var query = 'INSERT INTO role (title, salary, department_id) VALUES ( ? )';
                    // connection.query(query, (err, res) => {
                        //     if (err) throw err;
                        //     console.table(res);
                        //     anotherChoice();
                        // });
                        // });
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
                message: "Employee's role ID?"
            },
            {
                type: 'input',
                name: 'manager_id',
                message: "Employee's manager ID?"
            }
        ])
        .then((answer) => {
            //could i use jquery here?
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    console.log("Employee added!");
                    anotherChoice();
                });

            // (res) => {
            // var first_name = res.first_name;
            // var last_name = res.last_name;
            // var role_id = res.role_id;
            // var manager_id = res.manager_id;
            
            // var query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id VALUES ( ? )';
            // connection.query(query, (err, res) => {
            //     if (err) throw (err);
            //     console.table(res);
            //     anotherChoice();
            // });
        });
};

//update employees -- this doesnt feel complete
updateEmployee = () => {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee',
                message: 'Updating which employee?'
            },
            {
                type: 'input',
                name: 'employeeRole',
                message: 'Update to what?'
            }
        ])
        .then((answer) => {
            connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [answer.employee, answer.employeeRole],
                (err, res) => {
                    if (err) throw err;
                    console.table(res);
                    anotherChoice();
                });
        });
        
    // var query = 'SELECT id, first_name, last_name, role_id FROM employee';
    // connection.query(query, (err, res) => {
    //     if (err) throw err;
    //     console.table(res);
    // });
};