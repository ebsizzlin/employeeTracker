//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
            name: 'action',
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
            }
        })
}

//vew departments
viewDepartments = () => {

}

//view roles
viewRoles = () => {

}

//view employees
viewEmployees = () => {

}

//add departments
addDepartment = () => {

}

//add roles
addRole = () => {

}

//add employees
addEmployee = () => {

}

//update employees
updateEmployee = () => {

}