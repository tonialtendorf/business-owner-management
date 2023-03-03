const express = require('express');
const mysql = require('mysql2');
//requiring express/mysql package
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Tonivoh11!',
    database: 'books_db'
  },
  console.log(`Connected to the books_db database.`)
);

const employees = [];
//CLI array of questions

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'employeeManager',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'] 
        }])
        .then(res => {
            switch (res.employeeManager) {
                case "View all departments":
                    viewDepartments();
                    break;
                case "View all roles":
                    questionsIntern();
                    break;
                case "View all employees":
                    questionsEngineer();
                    break;
                case "Add a department":
                    questionsIntern();
                    break;
                case "Add a role":
                    questionsEngineer();
                    break;
                case "Add an employee":
                    questionsIntern();
                    break;
                case "Update an employee role":
                    questionsEngineer();
                    break;
                default:
                    completeTeam();
            }
        });
};
const viewDepartments = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'managerName',
            message: 'Please enter the managers name.',
        },
        {
            type: 'input',
            name: 'managerID',
            message: 'Please enter the managers employee ID',
        },
        {
            type: 'input',
            name: 'managerEmail',
            message: 'Please enter the managers email address',
        },
        {
            type: 'input',
            name: 'managerOfficeNumber',
            message: 'Please enter the managers office number',
        },

    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber)
        teamMembers.push(manager);
        promptMenu()
    })
};

const promptMenu = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'newTeamMember',
            message: 'Do you want to add a new team member to your team?',
            choices: ['Engineer', 'Intern', 'My team is complete'] 
        }])
        .then(res => {
            switch (res.newTeamMember) {
                case "Engineer":
                    questionsEngineer();
                    break;
                case "Intern":
                    questionsIntern();
                    break;
                default:
                    completeTeam();
            }
        });
};

const questionsEngineer = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'engineerName',
            message: 'Please enter the engineers name.',
        },
        {
            type: 'input',
            name: 'engineerID',
            message: 'Please enter the engineers ID',
        },
        {
            type: 'input',
            name: 'engineerEmail',
            message: 'Please enter the engineers email address',
        },
        {
            type: 'input',
            name: 'engineerGithub',
            message: 'Please enter the engineers github username',
        },
    ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        promptMenu();
    })
};

const questionsIntern = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'internName',
            message: 'Please enter the interns name.',
        },
        {
            type: 'input',
            name: 'internID',
            message: 'Please enter the interns ID',
        },
        {
            type: 'input',
            name: 'internEmail',
            message: 'Please enter the interns email address',
        },
        {
            type: 'input',
            name: 'internSchool',
            message: 'Please enter the interns school',
        },
    ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        promptMenu();
    })
};

const completeTeam = () => {
    console.log(`Team is complete`);
    fs.writeFileSync('index.html', createTeamDirectory(teamMembers), "utf-8");
}
questionsManager();

//listening on the port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  