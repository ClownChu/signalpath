const path = require('path')
const fs = require('fs')
const { Kita, Definitions } = require('kita-webdriver')
const screenshot = require('desktop-screenshot');
const { xPathHelper } = require('./xPath');
const { JSKeyboard } = require('./jsKeyboard');
const { SystemHelper } = require('./System');

class Browser {
    constructor () {
        this.browserProcessName = null
        this.scenarioCollection = null
        this.browserName = null
        this.browserDisplayName = null

        this.headlessMode = process.env.BROWSER_EXECUTION_MODE === 'headless'
        this.incognitoMode = false

        this.userDataDir = null

        this.driver = null
    }

    initiateBrowser(browserDisplayName = 'Google Chrome', scenarioCollection = 'Default')
    {
        this.browserDisplayName = browserDisplayName
        this.scenarioCollection = scenarioCollection
        this.browserName = this.browserDisplayName.split('-')[0].trim().toLowerCase()

        this.incognitoMode = false
        if (this.browserDisplayName.toLowerCase().includes('incognito') || this.browserDisplayName.toLowerCase().includes('inprivate')) {
            this.incognitoMode = true
        }
        
        this.driver = Kita.WebDriver.new(this.browserName)
        this.driver.capabilities.set(Definitions.Capability.SupportedCapabilities.PRIVATE_MODE, this.incognitoMode)
        this.driver.capabilities.set(Definitions.Capability.SupportedCapabilities.HEADLESS_MODE, this.headlessMode)

        this.browserProcessName = this.driver.capabilities.get(Definitions.Capability.SupportedCapabilities.BROWSER_PROCESS_NAME)

        this.userDataDir = path.join(__dirname, `../../temp/${this.scenarioCollection}/userdata/${this.browserProcessName}`)
        this.driver.capabilities.set(Definitions.Capability.SupportedCapabilities.USER_DATA_DIR, this.userDataDir)

        return new Promise((resolve, reject) => {
            this.driver.start().then(() => {
                this.waitForHTMLElement('/html/body', 30 * 1000).then((result) => {
                    resolve(result)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    closeBrowserWindow() {    
        return new Promise((resolve, reject) => {
            this.driver.browserInstance.close().then(() => {
                SystemHelper.sleep(2000).then(() => {
                    resolve(true)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    saveScreenshot(screenshotFolderPath, imageSufix = "") {
        if (!fs.existsSync(screenshotFolderPath)){
            fs.mkdirSync(screenshotFolderPath, { recursive: true })
        }

        return new Promise((resolve, reject) => {
            this.driver.browserInstance.takeScreenshot().then((screenshot) => {
                fs.writeFileSync(path.join(screenshotFolderPath, `${Date.now()}${imageSufix}.jpeg`), screenshot.data, 'base64')

                if (!fs.existsSync(screenshotFolderPath)){
                    fs.mkdirSync(screenshotFolderPath, { recursive: true })
                }

                resolve(true)
            }, (err) => {
                reject(err)
            })
        })
    }
    
    navigate(url = "about:blank", waitForBody = true) {
        return new Promise((resolve, reject) => {
            this.driver.browserInstance.navigate(url).then(() => {
                SystemHelper.sleep(2 * 1000).then(() => {
                    this.waitForHTMLElement('/html/body', (waitForBody ? 30 * 1000 : -1)).then((result) => {
                        if (!result) {
                            resolve(false)
                        }
    
                        this.driver.browserInstance.eval('window.location.href').then((currentUrl) => {
                            resolve(currentUrl.value)
                        })
                    })
                })
            }, (err) => {
                reject(err)
            })
        })
    }   

    clickOnHTMLElement(selector) {
        return this.driver.browserInstance.eval(`${xPathHelper.getHTMLElementByxPathJSString(selector)}.singleNodeValue.click()`)
    }

    waitForHTMLElement(selector, timeout = 10 * 1000) {
        return new Promise((resolve, reject) => {
            if (timeout < 0) {
                resolve(true)
            }
            
            this.driver.browserInstance.eval(`
                window.kitaExec = () => {
                    let element = null
                    const startingDate = new Date()
                    while (element === null && (startingDate.getTime() + ${timeout}) >= (new Date()).getTime()) {
                        element = ${xPathHelper.getHTMLElementByxPathJSString(selector)}.singleNodeValue
                    }

                    setTimeout(() => {
                        delete window.kitaExec
                    }, 0)
                    
                    return element !== null
                }
                window.kitaExec()
            `).then((response) => {
                resolve(response.value)
            }, (err) => {
                reject(err)
            })
        })
    } 

    verifyThatElementsExists(selector) {
        return new Promise((resolve, reject) => {
            this.waitForHTMLElement(selector, 0).then((result) => {
                resolve(result)
            }, (err) => {
                reject(err)
            })
        })
    }

    getHTMLElementAttribute(selector, attribute) {
        return this.driver.browserInstance.eval(`
            window.kitaExec = () => {
                let element = ${xPathHelper.getHTMLElementByxPathJSString(selector)}.singleNodeValue

                setTimeout(() => {
                    delete window.kitaExec
                }, 0)
                
                return element.getAttribute('${attribute}')
            }
            window.kitaExec()
        `)
    }

    setHTMLElementValue(selector, value) {
        return new Promise((resolve, reject) => {
            this.driver.browserInstance.eval(`
                window.kitaExec = () => {
                    const element = ${xPathHelper.getHTMLElementByxPathJSString(selector)}.singleNodeValue
                    element.value = '${value.replace(`'`, `\\'`)}'

                    setTimeout(() => {
                        delete window.kitaExec
                    }, 0)
                    
                    return element.dispatchEvent(new Event('input'))
                }
                window.kitaExec()
            `).then(() => {
                this.getHTMLElementAttribute(selector, 'value').then((attribute) => {
                    resolve(attribute.value === value)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    sendKeyStrokeToHTMLElement(selector, key, location = 0) {
        return new Promise((resolve, reject) => {
            const eventChain = ['keydown', 'keyup', 'keypress']
            let script = `
                window.kitaExec = () => {
                    const element = ${xPathHelper.getHTMLElementByxPathJSString(selector)}.singleNodeValue
                    const results = []
            `
            eventChain.forEach((type) => {
                script += `
                    event = ${JSKeyboard.getKeyboardEventJSString(type, key, location)}
                    results.push(element.dispatchEvent(event))
                `
            })

            script += `
                    setTimeout(() => {
                        delete window.kitaExec
                    }, 0)
                    
                    return JSON.stringify(results)
                }
                window.kitaExec()
            `
            
            this.driver.browserInstance.eval(script).then(() => {
                resolve(true)
            }, (err) => {
                reject(err)
            })
        })
    }

    getAllElementsInnerText(selector, excludeEmpty = true) {
        return new Promise((resolve, reject) => {
            this.driver.browserInstance.eval(`
                window.kitaExec = () => {
                    const nodesInnerText = []
                    const nodesIterator = ${xPathHelper.getHTMLElementByxPathJSString(selector, 'XPathResult.UNORDERED_NODE_ITERATOR_TYPE')}
                    let node = nodesIterator.iterateNext()
                    while (node) {
                        const innerText = node.innerText
                        if (${excludeEmpty} === false
                            || (${excludeEmpty} === true 
                                && innerText.length > 0)
                        ) {
                            nodesInnerText.push(node.textContent)
                        }
                        node = nodesIterator.iterateNext()
                    } 

                    setTimeout(() => {
                        delete window.kitaExec
                    }, 0)

                    return JSON.stringify(nodesInnerText)
                }

                window.kitaExec()
            `).then((result) => {
                resolve(JSON.parse(result.value))
            }, (err) => {
                reject(err)
            })
        })
    }
}

module.exports = new Browser()