const {Builder, By, Key, until} = require('selenium-webdriver')
const Chrome = require('selenium-webdriver/chrome')
const Edge = require('selenium-webdriver/edge')
const path = require('path')
const fs = require('fs')

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
        this.Key = Key
    }

    async initiateBrowser(browserDisplayName = 'Google Chrome', scenarioCollection = 'Default')
    {
        this.browserDisplayName = browserDisplayName
        this.scenarioCollection = scenarioCollection
        this.browserName = this.browserDisplayName.split('-')[0].trim()

        this.incognitoMode = false
        if (this.browserDisplayName.toLowerCase().includes('incognito') || this.browserDisplayName.toLowerCase().includes('inprivate')) {
            this.incognitoMode = true
        }

        let options = null
        let builder = null
        switch (this.browserName) {
            case "Google Chrome":
                this.browserProcessName = 'chrome'
                options = this.getWebDriverOptions(new Chrome.Options())

                builder = new Builder()
                    .forBrowser('chrome')
                    .setChromeOptions(options)

                break
            case "Microsoft Edge":
                this.browserProcessName = 'msedge'
                options = new Edge.Options()
                options = this.getWebDriverOptions(new Edge.Options())

                builder = new Builder()
                    .forBrowser('MicrosoftEdge')
                    .setEdgeOptions(options)

                break
        }

        const customDriverPath = `${path.join(__dirname, `../../webdrivers/${this.browserProcessName}driver`)};`
        if (!process.env.PATH.includes(customDriverPath)) {
            require(`${this.browserProcessName}driver`)
        }

        this.driver = builder.build()
    }

    getWebDriverOptions(options) {
        this.userDataDir = path.join(__dirname, `../../temp/${this.scenarioCollection}/userdata/${this.browserProcessName}`)

        options.addArguments('no-first-run')
        options.addArguments('disable-sync')
        options.addArguments('disable-gpu')
        options.addArguments('enable-automation')
        options.addArguments('start-maximized')

        if (this.incognitoMode) {
            options.addArguments('incognito')
            options.addArguments('inprivate')
        } else {
            options.addArguments(`user-data-dir=${this.userDataDir}`)
        }

        if (this.headlessMode) {
            options.addArguments('headless')
        }

        return options
    }

    async closeBrowserWindow() {
        return this.driver.close()
    }

    async saveScreenshot(screenshotFolderPath, imageSufix = "") {
        if (!fs.existsSync(screenshotFolderPath)){
            fs.mkdirSync(screenshotFolderPath, { recursive: true })
        }

        const screenshot = await this.driver.takeScreenshot()
        fs.writeFileSync(path.join(screenshotFolderPath, `${Date.now()}${imageSufix}.png`), screenshot, 'base64')
    }
    
    async navigate(url = "about:blank", waitForBody = true) {
        await this.driver.get(url)
        if (waitForBody) {
            await this.getHTMLElementRef('/html/body')
        }
   
        return this.driver.getCurrentUrl()
    }   

    async hoverOverHTMLElement(selector, waitForElement = true) {
        const element = await this.getHTMLElementRef(selector, waitForElement)
        const actions = this.driver.actions()
        const mouse = actions.mouse()

        return actions.pause(mouse).move({origin: element}).perform()
    }

    async clickOnHTMLElement(selector, waitForElement = true) {
        const element = await this.getHTMLElementRef(selector, waitForElement)
        return element.click()
    }

    async waitForHTMLElement(selector, timeout = 10 * 1000) {
        const elementBy = By.xpath(selector)
        await this.driver.wait(until.elementLocated(elementBy), timeout)
        return this.driver.findElement(elementBy)
    } 

    async verifyThatElementsExists(selector) {
        const elementBy = By.xpath(selector)
        const elements = await this.driver.findElements(elementBy)
        return elements.length > 0
    }

    async getHTMLElementRef(selector, waitForElement = true) {
        let element = null
        if (waitForElement) {
            element = await this.waitForHTMLElement(selector)
        } else {
            element = await this.driver.findElement(By.xpath(selector))
        }

        return element
    }

    async getHTMLElementAttribute(selector, attribute, waitForElement = true) {
        let element = await this.getHTMLElementRef(selector, waitForElement)
        return element.getAttribute(attribute) 
    }

    async setHTMLElementValue(selector, value, waitForElement = true) {
        await this.sendKeyStrokeToHTMLElement(selector, value, waitForElement)

        const currentValue = await this.getHTMLElementAttribute(selector, 'value') 
        return currentValue === value
    }

    async sendKeyStrokeToHTMLElement(selector, key, waitForElement = true) {
        const element = await this.getHTMLElementRef(selector, waitForElement)
        await element.sendKeys(key)
        return true
    }

    async getAllElementsInnerText(selector, waitForElement = true, excludeEmpty = true) {
        const results = []

        if (waitForElement) {
            await this.waitForHTMLElement(selector)
        }

        const elements = await this.driver.findElements(By.xpath(selector))
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i]
            const elementInnerText = await element.getText()
            
            if (excludeEmpty && elementInnerText.length < 1) {
                continue
            }

            results[i] = elementInnerText
        }

        return results
    }
}

module.exports = new Browser()