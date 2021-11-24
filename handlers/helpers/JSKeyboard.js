const { JSKeyCode } = require("./JSKeyCode")

class JSKeyboard {
    static getKeyboardEventJSString(type, key, location = 0) {
        const keyCode = JSKeyCode.getKeyCode(key, location)
        if (keyCode === 0) {
            return null
        }

        return `
            new KeyboardEvent('${type}', {
                keyCode: ${keyCode}, 
                code: '${JSKeyCode.getCodeFromKeyCode(keyCode)}', 
                key: '${key.replace(`'`, `\\'`)}'
            })
        `
    }
}

module.exports = {
    JSKeyboard
}