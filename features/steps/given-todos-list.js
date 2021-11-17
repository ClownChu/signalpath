const assert = require('assert');
const { Given } = require('@cucumber/cucumber')
const ToDosList = require('../../handlers/todos-list');

const options = { 
  timeout: 60 * 1000 
}

Given('that I navigated to the todo list page using {string}', options, async function (browserDisplayName) {
  const result = await ToDosList.navigateToList(browserDisplayName)

  assert.strictEqual(result, true)
})

Given('the list has become available', options, async function () {
  const result = await ToDosList.waitForListToLoad()

  assert.strictEqual(result, true);
})

Given('that the list loads with the items: {string}', options, async function (requiredTodosInListForScenario) {
  const currentTodosInListArray = await ToDosList.getAllItemsInList()

  assert.strictEqual(currentTodosInListArray.join(';'), requiredTodosInListForScenario)
})

Given('that the list has the items: {string}', options, async function (requiredItemsInListForScenario) {
  const currentTodosInListArray = await ToDosList.getAllItemsInList()
  if (currentTodosInListArray.join(';') === requiredItemsInListForScenario) {
    return true
  }
  
  const arrayOfNewItemsForTheList = requiredItemsInListForScenario.split(';')
    .map((value) => { 
      return value.trim(); 
    })
  const result = await ToDosList.addNewItemsToList(arrayOfNewItemsForTheList)

  assert.strictEqual(result, true)
});
