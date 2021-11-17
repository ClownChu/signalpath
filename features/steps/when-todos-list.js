const assert = require('assert')
const { When } = require('@cucumber/cucumber')
const ToDosList = require('../../handlers/todos-list')

const options = { 
  timeout: 60 * 1000 
}

When('I add the items: {string} to the list', options, async function (newItemsForList) {
  const arrayOfNewItemsForList = newItemsForList.split(';')
    .map((value) => { 
      return value.trim(); 
    })
  const result = await ToDosList.addNewItemsToList(arrayOfNewItemsForList)

  assert.strictEqual(result, true);
})

When('I click to complete the items: {string}', options, async function(itemsToCompleteInList) {
  const arrayOfItemsToCompleteInList = itemsToCompleteInList.split(';')
    .map((value) => { 
      return value.trim(); 
    })
  const result = await ToDosList.completeItemsInList(arrayOfItemsToCompleteInList)

  assert.strictEqual(result, true);
})

When('I click to remove the items: {string}', options, async function(itemsToRemoveFromList) {
  const arrayOfItemsToRemoveFromList = itemsToRemoveFromList.split(';')
    .map((value) => { 
      return value.trim(); 
    })
  const result = await ToDosList.removeItemsFromList(arrayOfItemsToRemoveFromList)

  assert.strictEqual(result, true);
})