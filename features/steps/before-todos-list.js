const { BeforeAll } = require('@cucumber/cucumber')
const ToDosList = require('../../handlers/todos-list')

BeforeAll(async function () {
  await ToDosList.beforeAllScenariosExecution()
});
