# CYPRESS-POM-JAVASCRIPT
This is a sample Cypress Javascript project to automate apartments.com web app.

This is a work in progress project.

Installation Steps: 
1.	Download VS Code https://code.visualstudio.com/download
2.	Download Node.js LTS version https://nodejs.org/en/ and install
3.	Download https://github.com/nerdy-glasses-tester/CYPRESS-POM-JAVASCRIPT/tree/master project under Code button
4.	Unzip project and remove -master from name of project folder by renaming it to CYPRESS-POM-JAVASCRIPT and put it under your mac computer folder structure /Users/username/OneDrive (if you don’t put it in this structure the paths to the classes will require manual edits)
5.	In VS Code go to file open new window>go to file add folder to workspace and choose the project folder>Click on the 2 Document Icon on the upper left menu of VSCode
6.	In VS Code go to file and save workspace as and choose your project folder and select CYPRESS-POM-JAVASCRIPT.code-workspace and save it so you can always open up to this workspace for convenience
7.	In VS Code>click on the bottom triangle icon to open the terminal>Go to the Terminal Tab
8.	In VS Code Terminal>Type npm init and press ok for all questions (will create package.json file)
9.	In VS Code Terminal>Type npm install cypress (will create node_modules folder and package-lock.json file)
10.	In VSCode Terminal>Type npm install prettier
11.	In VSCode Terminal>Type npx cypress open (will create cypress folder and cypress.json file)
12.	In VSCode Terminal>Type npm install cypress-xpath (this is so xpath can be used)
13.	In VSCode Terminal>Type npm install cypress-image-snapshot
14.	In VSCode Terminal>Type npm install –save-dev cypress-failed-log
15.	In VSCode Terminal>Type npx cypress open (select the browser in the upper right dropdown and select run 2 integration specs on the upper right)
16.	Or in VSCode Terminal>Type npx cypress run (to run in Electron browser and get logs and video and screenshots)
17.	Or in VSCode Terminal>Type npx cypress run - - browser chrome (passes gets logs and video and screenshots)
18.	Or in VSCode Terminal>Type npx cypress run - - browser firefox (1 test keeps failing but it passes in reality so false failure but runs well in npx cypress open though; Still looking into resolving it.)

OPTIONAL – my project is not using at moment though have installed

19.	In VSCode Terminal>Type npm install @percy/cypress

20.	In VSCode Terminal>Type npm install @percy/cli

21.	In VSCode Terminal>Type npm install eslint-plugin-cypress

22.	In VSCode Terminal>Type npm install cypress cypress-cucumber-preprocessor

23.	In VSCode> install vscode extensions, the square stack icon on left side of vscode,  Cucumber(Gherkin) Full Support

