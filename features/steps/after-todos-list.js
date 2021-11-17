const { After, AfterAll } = require('@cucumber/cucumber')
const ToDosList = require('../../handlers/todos-list')

After(async function (scenario) {
  await ToDosList.afterScenarioExecution(scenario)
});

AfterAll(async function () {
  await ToDosList.afterAllScenariosExecution()
});