#!/usr/bin/env node
const util = require('util');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');


const exec = util.promisify(require('child_process').exec);
async function runCmd(command) {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch {
    (error) => {
      console.log(error);
    };
  }
}

async function useNpm() {
  try {
    await execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

if (process.argv.length < 3) {
  console.log('Please specify the target project directory.');
  console.log('For example:');
  console.log('    npx create-nodejs-sequelize-app my-app');
  console.log('    OR');
  console.log('    npm init nodejs-app my-app');
  process.exit(1);
}


const ownPath = process.cwd();
const folderName = process.argv[2];
const appPath = path.join(ownPath, folderName);
const repo = 'https://github.com/brijeshftw/npm-event-process';

try {
  fs.mkdirSync(appPath);
} catch (err) {
  if (err.code === 'EEXIST') {
    console.log('Directory already exists. Please choose another name for the project.');
  } else {
    console.log(err);
  }
  process.exit(1);
}

async function setup() {
  try {

    console.log(`Downloading files from repo ${repo}`);
    await runCmd(`git clone --depth 1 ${repo} ${folderName}`);
    console.log('Cloned successfully.');
    console.log('');


    process.chdir(appPath);


    const hasNpm = await useNpm();
    console.log('Installing dependencies...');
    if (hasNpm) {
      await runCmd('yarn install');
    } else {
      await runCmd('npm install');
    }
    console.log('Dependencies installed successfully.');
    console.log();


    console.log('Environment files copied.');


    await runCmd('npx rimraf ./.git');

    fs.unlinkSync(path.join(appPath, 'bin', 'createkafka.js'));
    fs.rmdirSync(path.join(appPath, 'bin'));

    console.log('Installation is now complete!');
    console.log();

    console.log('start by typing:');
    console.log(`    cd ${folderName}`);
    console.log(hasNpm ? '    yarn dev' : '    npm run dev');
    console.log();
  } catch (error) {
    console.log(error);
  }
}

setup();
