const path = require('path')
const fs = require('fs')

class TODOsList {
    constructor() {
        this.scenarioCollection = 'todos-list'
        this.scenarioUrl = 'https://todomvc.com/examples/angular2/'
        this.scenarioPageSelectors = {
            newTodoInput: '/html/body/todo-app/section/header/input',
            todosListLabel: '/html/body/todo-app/section/section/ul/li/div/label',
            todosListCounter: '/html/body/todo-app/section/footer/span/strong',
            todosListCheckbox: '/html/body/todo-app/section/section/ul/li/div/input',
            todosListRemoveIcon: '/html/body/todo-app/section/section/ul/li/div/button'
        }

        this.browser = require('./helpers/browser')
    }

    async navigateToList(browserDisplayName) {
        await this.browser.initiateBrowser(browserDisplayName, this.scenarioCollection)
        const currentUrl = await this.browser.navigate(this.scenarioUrl)

        return currentUrl === this.scenarioUrl
    }

    async waitForListToLoad() {
        const element = await this.browser.waitForHTMLElement(this.scenarioPageSelectors.newTodoInput)
        return element !== undefined
    }
    
    async addNewItemsToList(arrayOfNewItemsForTheList) {
        let result = true
        for (let i = 0; i < arrayOfNewItemsForTheList.length; i++) {
            const item = arrayOfNewItemsForTheList[i]
            if (await this.browser.setHTMLElementValue(this.scenarioPageSelectors.newTodoInput, item)) {
                await this.browser.sendKeyStrokeToHTMLElement(this.scenarioPageSelectors.newTodoInput, this.browser.Key.ENTER)
            } else {
                result = false
            }
        }

        return result
    }

    async completeItemsInList(arrayOfItemsToCompleteInList) {
        for (let i = 0; i < arrayOfItemsToCompleteInList.length; i++) {
            const todoItemLabel = arrayOfItemsToCompleteInList[i]

            const itemCheckboxSelectorByInnerText = this.scenarioPageSelectors.todosListCheckbox.replace('/div/input', `/div[./label[contains(text(),"${todoItemLabel}")]]/input`)
            await this.browser.clickOnHTMLElement(itemCheckboxSelectorByInnerText)
        }

        return true
    }

    async removeItemsFromList(arrayOfItemsToRemoveFromList) {
        for (let i = 0; i < arrayOfItemsToRemoveFromList.length; i++) {
            const todoItemLabel = arrayOfItemsToRemoveFromList[i]

            const itemDeleteIconSelectorByInnerText = this.scenarioPageSelectors.todosListRemoveIcon.replace('/div/button', `/div[./label[contains(text(),"${todoItemLabel}")]]/button`)
            
            await this.browser.hoverOverHTMLElement(itemDeleteIconSelectorByInnerText.replace('/button', ''))
            await this.browser.clickOnHTMLElement(itemDeleteIconSelectorByInnerText)
        }

        return true
    }

    async getAllItemsInList() {
        if (!await this.browser.verifyThatElementsExists(this.scenarioPageSelectors.todosListLabel)) {
            return []
        }
        
        const itemsInList = await this.browser.getAllElementsInnerText(this.scenarioPageSelectors.todosListLabel) 
        return itemsInList
    }

    async getIncompleteItemsInList() {
        const incomletedItemsInListSelector = this.scenarioPageSelectors.todosListLabel.replace('/ul/li/', '/ul/li[not(contains(@class, "completed"))]/')
        if (!await this.browser.verifyThatElementsExists(incomletedItemsInListSelector)) {
            return []
        }
        
        const incompletedItemsInList = await this.browser.getAllElementsInnerText(incomletedItemsInListSelector) 
        return incompletedItemsInList
    }

    async getCompletedItemsInList() {
        const comletedItemsInListSelector = this.scenarioPageSelectors.todosListLabel.replace('/ul/li/', '/ul/li[contains(@class, "completed")]/')
        if (!await this.browser.verifyThatElementsExists(comletedItemsInListSelector)) {
            return []
        }
        
        const completedItemsInList = await this.browser.getAllElementsInnerText(comletedItemsInListSelector) 
        return completedItemsInList
    }

    async getIncompleteItemCounter() {
        if (!await this.browser.verifyThatElementsExists(this.scenarioPageSelectors.todosListCounter)) {
            return 0
        }

        const counterValue = await this.browser.getAllElementsInnerText(this.scenarioPageSelectors.todosListCounter) 
        return parseInt(counterValue)
    }

    async afterScenarioExecution(scenario) {
        const screenshotFolderPath = path.join(
            __dirname, 
            `../screenshots/${this.scenarioCollection}`, 
            scenario.gherkinDocument.feature.name, 
            this.browser.browserDisplayName
        )

        await this.browser.saveScreenshot(screenshotFolderPath, `_${scenario.result.status}`)

        await this.browser.closeBrowserWindow()
    }

    async beforeAllScenariosExecution() {
        await this.afterAllScenariosExecution()

        const screenshotsFolderPath = path.join(__dirname, `../screenshots/${this.scenarioCollection}`)
        if (fs.existsSync(screenshotsFolderPath)) {
            fs.rmdirSync(screenshotsFolderPath, {
                recursive: true,
            })
        }
        fs.mkdirSync(screenshotsFolderPath, { recursive: true })
    }

    async afterAllScenariosExecution() {
        const tempFolderPath = path.join(__dirname, `../temp/${this.scenarioCollection}`)
        if (fs.existsSync(tempFolderPath)) {
            fs.rmdirSync(tempFolderPath, {
                recursive: true,
            })
        }
        fs.mkdirSync(tempFolderPath, { recursive: true })
    }
}

module.exports = new TODOsList()