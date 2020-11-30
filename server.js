//requiring
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
const { asyncScheduler } = require("rxjs");

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
            }
        });

}


//prompt to end questions and generate