//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
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
}

//vew departments
viewDepartments = () => {
    var query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

//view roles
viewRoles = () => {
    var query = "SELECT * FROM roles";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

//view employees
viewEmployees = () => {
    var query = "SELECT * FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res);
        promptUser();
    })
}

//add departments
addDepartment = () => {
    inquirer
        .prompt({
            type: 'input',
            name: 'department',
            message: 'Name of the department?'
        })
        .then((answer) => {
            var query = "INSERT INTO department (name) VALUES ( ? )";
            connection.query(query, (err, res) => {
                console.log('Department added!')
                if (err) throw (err);
                console.table(res);
                anotherChoice();
            });
        });
}

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
                message: 'Salary of new role?'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Department ID for role?',
            }
        ])
        .then((res) => {
            var title = res.title;
            var salary = res.salary;
            var department_id = res.department_id;

            var query = 'INSERT INTO role (title, salary, department_id) VALUE("${title}", "${salary}", "${department_id}")';
            connection.query(query, (err, res) => {
                if (err) throw err;
                console.table(res);
                anotherChoice();
            })
        });
}

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
        ])
}

//update employees
updateEmployee = () => {

}