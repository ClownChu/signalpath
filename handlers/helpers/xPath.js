class xPathHelper {
    static getHTMLElementByxPathJSString(selector, type = 'XPathResult.FIRST_ORDERED_NODE_TYPE') {
        return `document.evaluate('${selector}', document, null, ${type}, null)`
    }
}

module.exports = {
    xPathHelper
}