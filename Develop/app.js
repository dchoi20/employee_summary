const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

function init() {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What's your managers name?",
    },
    {
      type: "input",
      name: "id",
      message: "What's your managers ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What's your managers email?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What's your managers office number?",
    },
  ]);
}

function teamRoster() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Who is on your roster?",
        choices: ["Engineer", "Intern", "No more"],
      },
    ])
    .then((choice) => {
      if (choice.role === "Engineer") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your engineer's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is your engineer's ID?",
            },
            {
              type: "input",
              name: "email",
              message: "What is your engineer's email?",
            },
            {
              tupe: "input",
              name: "github",
              message: "What is your engineer's github username?",
            },
          ])
          .then((choices) => {
            let engineer = new Engineer(
              choices.name,
              choices.id,
              choices.email,
              choices.github
            );
            teamMembers.push(engineer);
            teamRoster();
          });
      } else if (choice.role === "Intern") {
        return inquirer
          .prompt([
            {
              type: "input",
              name: "name",
              message: "What is your intern's name?",
            },
            {
              type: "input",
              name: "id",
              message: "What is your intern's ID?",
            },
            {
              type: "input",
              name: "email",
              message: "What is your intern's email?",
            },
            {
              type: "input",
              name: "school",
              message: "Where did your intern go to school?",
            },
          ])
          .then((choices) => {
            let intern = new Intern(
              choices.name,
              choices.id,
              choices.email,
              choices.school
            );
            teamMembers.push(intern);
            teamRoster();
          });
      } else {
        fs.writeFile(outputPath, render(teamMembers), function (err) {
          if (err) {
            console.log(err);
          }
        });
      }
    });
}

init().then((input) => {
  const manager = new Manager(
    input.name,
    input.id,
    input.email,
    input.officeNumber
  );
  teamMembers.push(manager);
  teamRoster();
});
