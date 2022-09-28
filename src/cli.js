

 import { createSpinner } from "nanospinner";
 import inquirer from 'inquirer';
 import shell from "shelljs";
 import welcome from "cli-welcome";
 import colors from "colors";
 
 import { version, name } from "../package.json";
 
 export async function cli(args) {
   console.clear();
 
   const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
 
   async function handleAnswer(
     template,
     project_name,
     start_repository,
     scaffold_crud
   ) {
     const spinner = createSpinner("Creating project...\n").start();
     await sleep();
     try {
       let repoUrl = "";
       shell.mkdir(project_name);
       shell.cd(project_name);
       if (template === "Nest") {
         repoUrl = "https://github.com/brijeshftw/npm-event-process.git";
       } else {
         repoUrl = "https://github.com/brijeshftw/npm-event-process.git";
       }
       if (scaffold_crud) {
         shell.exec(`git clone -b master ${repoUrl} .`);
       } else {
         shell.exec(`git clone ${repoUrl} .`);
       }
       shell.rm("-rf", [".git"]);
 
       if (start_repository) {
         shell.exec("git init");
         console.log("");
       }
 
       spinner.success({
         text: `${template} project generated 🎈`,
       });
       process.exit(0);
     } catch (error) {
       spinner.error({
         text: `💀💀💀 Something went wrong when creating the project`,
       });
       process.exit(1);
     }
   }
 
   async function askTemplate() {
     const project_name_question = await inquirer.prompt({
       name: "project_name",
       type: "input",
       message: "Project name:",
       default: "eg: elden-ring",
     });
     const template_type_question = await inquirer.prompt({
       name: "template_type",
       type: "list",
       message: "Please choice which project template to use:",
       choices: ["React", "Nest"],
       default: "Nest",
     });
 
     const scaffold_crud_question = await inquirer.prompt({
       name: "scaffold_crud",
       type: "confirm",
       message: "Do you want to scaffold a CRUD?:",
     });
 
     const initialize_repository_question = await inquirer.prompt({
       name: "start_repository",
       type: "confirm",
       message: "Start git repository?:",
     });
 
     handleAnswer(
       template_type_question.template_type,
       project_name_question.project_name,
       initialize_repository_question.start_repository,
       scaffold_crud_question.scaffold_crud
     );
   }
 
   welcome({
     title: "mg-project-cli",
     tagLine: `by brijeshftw`,
     description: `A another test CLI to generate a ${colors.cyan(
       "React"
     )} template using typescript and redux or\na ${colors.red(
       "Nestjs"
     )} boilerplate with kafka`,
     version: version,
     bgColor: "#797EF6",
     color: "#000000",
     bold: true,
   });
 
   await askTemplate();
 }