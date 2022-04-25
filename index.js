const inquirer = require("inquirer");
const fs = require('fs');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Manager = require('./lib/Manager');
const generate = require('./util/generateHtml.js');
var team = [];

const init = async () => {
    try {
        const ans = await inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the manager's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is the manager's id?",
            },
            {
                type: "input",
                name: "email",
                message: "What is the manager's email?",
            },
            {
                type: "input",
                name: "office",
                message: "What is the manager's office number?",
            },
        ]);
        team.push(new Manager(ans.name, ans.id, ans.email, ans.office));
        addTeamMember();
    } catch (err) {
        console.log(err)
    }
}

const addTeamMember = async () => {
    try {
        let ans = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: "What would you like to do next?",
                choices: ["Add an Engineer", "Add an Intern", "Finish Building Team"],
            }
        ]);
        switch (ans.choice) {
            case "Add an Engineer":
                const ans1 = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the engineer's name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is the engineer's id?",
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is the engineer's email?",
                    },
                    {
                        type: "input",
                        name: "github",
                        message: "What is the engineer's github user name?",
                    },
                ]);
                team.push(new Engineer(ans1.name, ans1.id, ans1.email, ans1.github));
                addTeamMember();
                break;
            case "Add an Intern":
                const ans2 = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: "What is the intern's name?",
                    },
                    {
                        type: "input",
                        name: "id",
                        message: "What is the intern's id?",
                    },
                    {
                        type: "input",
                        name: "email",
                        message: "What is the intern's email?",
                    },
                    {
                        type: "input",
                        name: "school",
                        message: "What is the intern's school name?",
                    },
                ]);
                team.push(new Intern(ans2.name, ans2.id, ans2.email, ans2.school));
                addTeamMember();
                break;
            default:
                const content = generate(team);
                fs.writeFile('./dist/index.html', content, (err) => {
                    if (err)
                        console.log(err);
                    else {
                        console.log("HTML generated successfully in dist folder!");
                    }
                });
        }
    } catch (err) {
        console.log(err);
    }
}

init();