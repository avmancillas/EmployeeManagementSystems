const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");

const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Leolola21",
    database: "employee_TrackerDB",

});

const start = () => {
    inquirer
      .prompt(
        {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "Add a department",
            "Add an employee",
            "Add role",
            "View department",
            "View employees",
            "View role",
            "Update employee role",

        ],
    })
    .then((answer) => {
        switch (answer.action){
            case "Add a department":
                addDepartment();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Add role":
                addRole();
                break;
            case "View department":
                viewDepartment();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "View role":
                viewRole();
                break;
            case "Update employee role":
                updateRole();
                break;
            case "Exit":
                connection.end();
                break;      
            default:
                console.log(`Invalid action: ${answer.action}`);
                      

               
        }
    });
};


connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
});


const addDepartment = () => {
  inquirer
    .prompt(
        {
            name:"Department",
            type: "input",
            message: "What department would you like to add?"
        })
    .then ((res) => {
        connection.query("INSERT INTO department (dept_name) VALUES (?)",[res.Department]
        
        );
        ((err,res) => {
            if (err) throw err
            console.log("Department has been added");
            console.table("All Department:", res);

            start(); 
                    
        })
         
     });
};

const addEmployee = () => {
    
    inquirer
      .prompt(
          {
              name:"first_name",
              type: "input",
              message: "Who would you like to add?"
          },
          {
              name: "last_name",
              type:"input",
              message:"What is the employee's last name?"
          },
          {
              name: "role_id",
              type:"input",
              message: "What is the employee's role id?"
          },
          {
              name: "manager_id",
              type: "input",
              message: "What is the manager's id?"
          })
      .then ((res) => {
        connection.query("INSERT INTO employee SET ?", {first_name: res.first_name,last_name:res.last_name,role_id:res.role_id,manager_id:res.manager_id},
              
          ((err) => {
              if (err) throw err
              console.log("Employee has been added");
              console.table("All Employees:", res);
  
            }));
            start(); 
       });
};

const addRole = () => {
    
    inquirer
    .prompt(
          {
              name:"title",
              type: "input",
              message: "What role would you like to add?"
          },
          {
                name:"salary",
                type: "input",
                message: "What's the salary?"
          },
          {
                name:"department_id",
                type: "input",
                message: "What's the id number?"
          },

          )
      .then ((res) => {
          
          connection.query('INSERT INTO role_name SET?', {title:res.title,salary:res.salary,department_id:res.department_id}, (err,res) => {
              if (err) throw err
              console.log("Role has been added");
              console.table("All Roles:", res);
  
              
            start();  
                      
          });
            
       });
};
    


const viewDepartment = () => {
    const query = "Select * FROM department";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table("All Departments:",res);

        start();
    });
}

const viewEmployees = () => {
    const query = "Select * FROM employee";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table("All Employees:",res);

        start();
    });
}

const viewRole = () => {
    const query = "Select * FROM role_name";
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table("All Roles:",res);

        start();
    });
}

const updateRole = () => {
    const query = "UPDATE role_name (title) VALUE (?) ";[res.title]
    connection.query(query,(err,res) => {
        if (err) throw err;
        console.table("All Roles:",res);

        start();
    });
}



