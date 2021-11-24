const path = require('path')
const fs = require('fs')
const { SystemHelper } = require('./helpers/System')

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

    navigateToList(browserDisplayName) {
        return new Promise((resolve, reject) => {
            this.browser.initiateBrowser(browserDisplayName, this.scenarioCollection).then((result) => {
                if (!result) {
                    resolve(false)
                }

                this.browser.navigate(this.scenarioUrl).then((currentUrl) => {
                    resolve(currentUrl === this.scenarioUrl)
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    waitForListToLoad() {
        return new Promise((resolve, reject) => {
            this.browser.waitForHTMLElement(this.scenarioPageSelectors.newTodoInput).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err)
            })
        })
    }
    
    addNewItemsToList(arrayOfNewItemsForTheList) {
        const addToListPromise = item => new Promise((resolve, reject) => {
            this.browser.setHTMLElementValue(this.scenarioPageSelectors.newTodoInput, item).then((result) => {
                if (!result) {
                    resolve(false)
                }
                
                this.browser.sendKeyStrokeToHTMLElement(this.scenarioPageSelectors.newTodoInput, 'Enter').then((result) => {
                    SystemHelper.sleep(500).then(() => {
                        resolve(result)
                    })
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
        
        
        return new Promise((resolve) => {
            arrayOfNewItemsForTheList.reduce(
                (p, x) => p.then(() => addToListPromise(x)),
                Promise.resolve()
            ).then(() => {
                resolve(true)
            })
        })
    }

    completeItemsInList(arrayOfItemsToCompleteInList) {
        const completeItemInListPromise = item => new Promise((resolve, reject) => {
            const itemCheckboxSelectorByInnerText = this.scenarioPageSelectors.todosListCheckbox.replace('/div/input', `/div[./label[contains(text(),"${item}")]]/input`)
            this.browser.clickOnHTMLElement(itemCheckboxSelectorByInnerText).then((result) => {
                SystemHelper.sleep(500).then(() => {
                    resolve(result)
                })
            }, (err) => {
                reject(err)
            })
        })
        
        return new Promise((resolve) => {
            arrayOfItemsToCompleteInList.reduce(
                (p, x) => p.then(() => completeItemInListPromise(x)),
                Promise.resolve()
            ).then(() => {
                resolve(true)
            })
        })
    }

    removeItemsFromList(arrayOfItemsToRemoveFromList) {
        const removeItemInListPromise = item => new Promise((resolve, reject) => {
            const itemDeleteIconSelectorByInnerText = this.scenarioPageSelectors.todosListRemoveIcon.replace('/div/button', `/div[./label[contains(text(),"${item}")]]/button`)
            this.browser.clickOnHTMLElement(itemDeleteIconSelectorByInnerText).then((result) => {
                SystemHelper.sleep(500).then(() => {
                    resolve(result)
                })
            }, (err) => {
                reject(err)
            })
        })
        
        return new Promise((resolve) => {
            arrayOfItemsToRemoveFromList.reduce(
                (p, x) => p.then(() => removeItemInListPromise(x)),
                Promise.resolve()
            ).then(() => {
                resolve(true)
            })
        })
    }

    getAllItemsInList() {
        return new Promise((resolve, reject) => {
            this.browser.verifyThatElementsExists(this.scenarioPageSelectors.todosListLabel).then((result) => {
                if (!result) {
                    resolve([])
                }

                this.browser.getAllElementsInnerText(this.scenarioPageSelectors.todosListLabel).then((itemsInList) => {
                    resolve(itemsInList)
                }, (err) => {
                    reject(err)
                })

            }, (err) => {
                reject(err)
            })
        })
    }

    getIncompleteItemsInList() {
        const incomletedItemsInListSelector = this.scenarioPageSelectors.todosListLabel.replace('/ul/li/', '/ul/li[not(contains(@class, "completed"))]/')
        
        return new Promise((resolve, reject) => {
            this.browser.verifyThatElementsExists(incomletedItemsInListSelector).then((result) => {
                if (!result) {
                    resolve([])
                }

                this.browser.getAllElementsInnerText(incomletedItemsInListSelector).then((incompletedItemsInList) => {
                    resolve(incompletedItemsInList)
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    getCompletedItemsInList() {
        const comletedItemsInListSelector = this.scenarioPageSelectors.todosListLabel.replace('/ul/li/', '/ul/li[contains(@class, "completed")]/')
        
        return new Promise((resolve, reject) => {
            this.browser.verifyThatElementsExists(comletedItemsInListSelector).then((result) => {
                if (!result) {
                    resolve([])
                }

                this.browser.getAllElementsInnerText(comletedItemsInListSelector).then((completedItemsInList) => {
                    resolve(completedItemsInList)
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    getIncompleteItemCounter() {
        return new Promise((resolve, reject) => {
            this.browser.verifyThatElementsExists(this.scenarioPageSelectors.todosListCounter).then((result) => {
                if (!result) {
                    resolve(0)
                }

                this.browser.getAllElementsInnerText(this.scenarioPageSelectors.todosListCounter).then((counterValue) => {
                    resolve(parseInt(counterValue))
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    afterScenarioExecution(scenario) {
        const screenshotFolderPath = path.join(
            __dirname, 
            `../screenshots/${this.scenarioCollection}`, 
            scenario.gherkinDocument.feature.name, 
            this.browser.browserDisplayName
        )

        return new Promise((resolve, reject) => {
            this.browser.saveScreenshot(screenshotFolderPath, `_${scenario.result.status}`).then(() => {
                this.browser.closeBrowserWindow().then(() => {
                    resolve(true)
                }, (err) => {
                    reject(err)
                })
            })
        })
    }

    beforeAllScenariosExecution() {
        const screenshotsFolderPath = path.join(__dirname, `../screenshots/${this.scenarioCollection}`)
        if (fs.existsSync(screenshotsFolderPath)) {
            fs.rmdirSync(screenshotsFolderPath, {
                recursive: true,
            })
        }

        return new Promise((resolve) => {
            this.afterAllScenariosExecution().then(() => {
                fs.mkdirSync(screenshotsFolderPath, { recursive: true })

                resolve(true)
            })
        })
    }

    afterAllScenariosExecution() {
        const tempFolderPath = path.join(__dirname, `../temp/${this.scenarioCollection}`)

        return new Promise((resolve) => {
            if (fs.existsSync(tempFolderPath)) {
                fs.rmdirSync(tempFolderPath, {
                    recursive: true,
                })
            }
            fs.mkdirSync(tempFolderPath, { recursive: true })

            resolve(true)
        })
    }
}

module.exports = new TODOsList()