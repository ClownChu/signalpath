const assert = require('assert')
const { Then } = require('@cucumber/cucumber')
const ToDosList = require('../../handlers/todos-list')

const options = { 
  timeout: 60 * 1000 
}

Then('I should see {string} appended to {string}', options, async function (newItemsForList, existingItemsInList) {
  const expectedItemsInList = existingItemsInList + (existingItemsInList.length > 0 ? `;${newItemsForList}` : newItemsForList)
  const actualItemsInList = await ToDosList.getAllItemsInList()

  assert.strictEqual(actualItemsInList.join(';'), expectedItemsInList)
})

Then('I should see the items {string} completed and the items {string} still incomplete', options, async function (expectedCompletedItems, expectedIncompleteItems) {
  const completedItemsInList = await ToDosList.getCompletedItemsInList()
  const incompleteItemsInList = await ToDosList.getIncompleteItemsInList()

  assert.strictEqual(completedItemsInList.join(';'), expectedCompletedItems)
  assert.strictEqual(incompleteItemsInList.join(';'), expectedIncompleteItems)
})

Then('I should see only the remaining items {string} in the list', options, async function (expectedRemainingItems){
  const actualItemsInList = await ToDosList.getAllItemsInList()

  assert.strictEqual(actualItemsInList.join(';'), expectedRemainingItems)
})