
class JSKeyCode {
    static getKeyCode(key, location = 0)
    {
        switch (key)
        {
            case " ":
                key = "Space";
                break;
            case ",":
            case "<":
                key = "Oemcomma";
                break;
            case ".":
            case ">":
                key = "OemPeriod";
                break;
            case "-":
            case "_":
                key = "OemMinus";
                break;
            case "=":
            case "+":
                key = "Oemplus";
                break;
            case "`":
            case "~":
                key = "Oemtilde";
                break;
            case "/":
            case "?":
                key = "OemQuestion";
                break;
            case ";":
            case ":":
                key = "OemSemicolon";
                break;
            case "'":
            case "\"":
                key = "OemQuotes";
                break;
            case "[":
            case "{":
                key = "Oem4";
                break;
            case "]":
            case "}":
                key = "Oem6";
                break;
            case "|":
            case "\\":
                key = "Oem5";
                break;
            case "!":
                key = "1";
                break;
            case "@":
                key = "2";
                break;
            case "#":
                key = "3";
                break;
            case "$":
                key = "4";
                break;
            case "%":
                key = "5";
                break;
            case "^":
                key = "6";
                break;
            case "&":
                key = "7";
                break;
            case "*":
                key = "8";
                break;
            case "(":
                key = "9";
                break;
            case ")":
                key = "0";
                break;
            case "AltKey":
                key = "Menu";
                break;
            case "ContextMenu":
                key = "Apps";
                break;
        }

        if ((/^\d{1}$/g).test(key)) {
            key = (location === 3 ? "NumPad" : "D") + key
        } else if ((/^\w{1}$/g).test(key)) {
            key = key.ToUpper();
        }

        let keyCode = 0;
        if (typeof KeyCodes[key] !== 'undefined') {
            keyCode = KeyCodes[key];
        }

        return keyCode;
    }

    /** reference : https://www.w3.org/TR/uievents-code/ */
    static getCodeFromKeyCode (n, l) {
        if (n >= 48 && n <= 57) return 'Digit' + unescape('%' + (n).toString(16));
        if (n >= 65 && n <= 90) return 'Key' + unescape('%' + (n).toString(16));
        if (n >= 96 && n <= 105) return 'Numpad' + (n - 96);
        if (n >= 112 && n <= 135) return 'F' + (n - 111);

        if (n == 8) return 'Backspace';
        if (n == 9) return 'Tab';
        if (n == 13) return (l === 3 ? 'Numpad' : '') + 'Enter';

        if (n == 16) return 'Shift' + (l === 2 ? 'Right' : 'Left');
        if (n == 17) return 'Control' + (l === 2 ? 'Right' : 'Left');
        if (n == 18) return 'Alt' + (l === 2 ? 'Right' : 'Left');
        if (n == 19) return 'Pause';
        if (n == 20) return 'CapsLock';

        if (n == 27) return 'Escape';

        if (n == 32) return 'Space';
        if (n == 33) return 'PageUp';
        if (n == 34) return 'PageDown';
        if (n == 35) return 'End';
        if (n == 36) return 'Home';

        if (n == 37) return 'ArrowLeft';
        if (n == 38) return 'ArrowUp';
        if (n == 39) return 'ArrowRight';
        if (n == 40) return 'ArrowDown';

        if (n == 44) return 'PrintScreen';
        if (n == 45) return 'Insert';
        if (n == 65) return 'Delete';

        if (n == 91) return 'MetaLeft';
        if (n == 92) return 'MetaRight';
        if (n == 93) return 'ContextMenu';

        if (n == 106) return (l === 3 ? 'Numpad' : '') + 'Multiply';
        if (n == 107) return (l === 3 ? 'Numpad' : '') + 'Add';
        if (n == 108) return (l === 3 ? 'Numpad' : '') + 'Separator';
        if (n == 109) return (l === 3 ? 'Numpad' : '') + 'Subtract';
        if (n == 110) return (l === 3 ? 'Numpad' : '') + 'Decimal';
        if (n == 111) return (l === 3 ? 'Numpad' : '') + 'Divide';

        if (n == 144) return 'NumLock';
        if (n == 145) return 'ScrollLock';

        if (n == 186) return 'Semicolon';
        if (n == 187) return 'Equal';
        if (n == 188) return 'Comma';
        if (n == 189) return 'Minus';
        if (n == 190) return 'Period';
        if (n == 191) return 'Slash';
        if (n == 192) return 'Backquote';
        if (n == 219) return 'BracketLeft';
        if (n == 220) return 'Backslash';
        if (n == 221) return 'BracketRight';
        if (n == 222) return 'Quote';

        if (n == 255) return 'WakeUp';

        return 'Unidentified';
    }
}

const RequiresShiftKey = [ 
    "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "{", "}", "|", ":", "\"", "<", ">", "?"
]

/**
 * Reference: https://docs.microsoft.com/en-us/dotnet/api/system.windows.forms.keys?view=netframework-4.8
 */
const KeyCodes = {
    //
    // Summary:
    //     The bitmask to extract modifiers from a key value.
    Modifiers: -65536,
    //
    // Summary:
    //     No key pressed.
    None: 0,
    //
    // Summary:
    //     The left mouse button.
    LButton: 1,
    //
    // Summary:
    //     The right mouse button.
    RButton: 2,
    //
    // Summary:
    //     The CANCEL key.
    Cancel: 3,
    //
    // Summary:
    //     The middle mouse button (three-button mouse).
    MButton: 4,
    //
    // Summary:
    //     The first x mouse button (five-button mouse).
    XButton1: 5,
    //
    // Summary:
    //     The second x mouse button (five-button mouse).
    XButton2: 6,
    //
    // Summary:
    //     The BACKSPACE key.
    Back: 8,
    //
    // Summary:
    //     The TAB key.
    Tab: 9,
    //
    // Summary:
    //     The LINEFEED key.
    LineFeed: 10,
    //
    // Summary:
    //     The CLEAR key.
    Clear: 12,
    //
    // Summary:
    //     The RETURN key.
    Return: 13,
    //
    // Summary:
    //     The ENTER key.
    Enter: 13,
    //
    // Summary:
    //     The SHIFT key.
    ShiftKey: 16,
    //
    // Summary:
    //     The CTRL key.
    ControlKey: 17,
    //
    // Summary:
    //     The ALT key.
    Menu: 18,
    //
    // Summary:
    //     The PAUSE key.
    Pause: 19,
    //
    // Summary:
    //     The CAPS LOCK key.
    Capital: 20,
    //
    // Summary:
    //     The CAPS LOCK key.
    CapsLock: 20,
    //
    // Summary:
    //     The IME Kana mode key.
    KanaMode: 21,
    //
    // Summary:
    //     The IME Hanguel mode key. (maintained for compatibility; use HangulMode)
    HanguelMode: 21,
    //
    // Summary:
    //     The IME Hangul mode key.
    HangulMode: 21,
    //
    // Summary:
    //     The IME Junja mode key.
    JunjaMode: 23,
    //
    // Summary:
    //     The IME final mode key.
    FinalMode: 24,
    //
    // Summary:
    //     The IME Hanja mode key.
    HanjaMode: 25,
    //
    // Summary:
    //     The IME Kanji mode key.
    KanjiMode: 25,
    //
    // Summary:
    //     The ESC key.
    Escape: 27,
    //
    // Summary:
    //     The IME convert key.
    IMEConvert: 28,
    //
    // Summary:
    //     The IME nonconvert key.
    IMENonconvert: 29,
    //
    // Summary:
    //     The IME accept key, replaces System.Windows.Forms.Keys.IMEAceept.
    IMEAccept: 30,
    //
    // Summary:
    //     The IME accept key. Obsolete, use System.Windows.Forms.Keys.IMEAccept instead.
    IMEAceept: 30,
    //
    // Summary:
    //     The IME mode change key.
    IMEModeChange: 31,
    //
    // Summary:
    //     The SPACEBAR key.
    Space: 32,
    //
    // Summary:
    //     The PAGE UP key.
    Prior: 33,
    //
    // Summary:
    //     The PAGE UP key.
    PageUp: 33,
    //
    // Summary:
    //     The PAGE DOWN key.
    Next: 34,
    //
    // Summary:
    //     The PAGE DOWN key.
    PageDown: 34,
    //
    // Summary:
    //     The END key.
    End: 35,
    //
    // Summary:
    //     The HOME key.
    Home: 36,
    //
    // Summary:
    //     The LEFT ARROW key.
    Left: 37,
    //
    // Summary:
    //     The UP ARROW key.
    Up: 38,
    //
    // Summary:
    //     The RIGHT ARROW key.
    Right: 39,
    //
    // Summary:
    //     The DOWN ARROW key.
    Down: 40,
    //
    // Summary:
    //     The SELECT key.
    Select: 41,
    //
    // Summary:
    //     The PRINT key.
    Print: 42,
    //
    // Summary:
    //     The EXECUTE key.
    Execute: 43,
    //
    // Summary:
    //     The PRINT SCREEN key.
    Snapshot: 44,
    //
    // Summary:
    //     The PRINT SCREEN key.
    PrintScreen: 44,
    //
    // Summary:
    //     The INS key.
    Insert: 45,
    //
    // Summary:
    //     The DEL key.
    Delete: 46,
    //
    // Summary:
    //     The HELP key.
    Help: 47,
    //
    // Summary:
    //     The 0 key.
    D0: 48,
    //
    // Summary:
    //     The 1 key.
    D1: 49,
    //
    // Summary:
    //     The 2 key.
    D2: 50,
    //
    // Summary:
    //     The 3 key.
    D3: 51,
    //
    // Summary:
    //     The 4 key.
    D4: 52,
    //
    // Summary:
    //     The 5 key.
    D5: 53,
    //
    // Summary:
    //     The 6 key.
    D6: 54,
    //
    // Summary:
    //     The 7 key.
    D7: 55,
    //
    // Summary:
    //     The 8 key.
    D8: 56,
    //
    // Summary:
    //     The 9 key.
    D9: 57,
    //
    // Summary:
    //     The A key.
    A: 65,
    //
    // Summary:
    //     The B key.
    B: 66,
    //
    // Summary:
    //     The C key.
    C: 67,
    //
    // Summary:
    //     The D key.
    D: 68,
    //
    // Summary:
    //     The E key.
    E: 69,
    //
    // Summary:
    //     The F key.
    F: 70,
    //
    // Summary:
    //     The G key.
    G: 71,
    //
    // Summary:
    //     The H key.
    H: 72,
    //
    // Summary:
    //     The I key.
    I: 73,
    //
    // Summary:
    //     The J key.
    J: 74,
    //
    // Summary:
    //     The K key.
    K: 75,
    //
    // Summary:
    //     The L key.
    L: 76,
    //
    // Summary:
    //     The M key.
    M: 77,
    //
    // Summary:
    //     The N key.
    N: 78,
    //
    // Summary:
    //     The O key.
    O: 79,
    //
    // Summary:
    //     The P key.
    P: 80,
    //
    // Summary:
    //     The Q key.
    Q: 81,
    //
    // Summary:
    //     The R key.
    R: 82,
    //
    // Summary:
    //     The S key.
    S: 83,
    //
    // Summary:
    //     The T key.
    T: 84,
    //
    // Summary:
    //     The U key.
    U: 85,
    //
    // Summary:
    //     The V key.
    V: 86,
    //
    // Summary:
    //     The W key.
    W: 87,
    //
    // Summary:
    //     The X key.
    X: 88,
    //
    // Summary:
    //     The Y key.
    Y: 89,
    //
    // Summary:
    //     The Z key.
    Z: 90,
    //
    // Summary:
    //     The left Windows logo key (Microsoft Natural Keyboard).
    LWin: 91,
    //
    // Summary:
    //     The right Windows logo key (Microsoft Natural Keyboard).
    RWin: 92,
    //
    // Summary:
    //     The application key (Microsoft Natural Keyboard).
    Apps: 93,
    //
    // Summary:
    //     The computer sleep key.
    Sleep: 95,
    //
    // Summary:
    //     The 0 key on the numeric keypad.
    NumPad0: 96,
    //
    // Summary:
    //     The 1 key on the numeric keypad.
    NumPad1: 97,
    //
    // Summary:
    //     The 2 key on the numeric keypad.
    NumPad2: 98,
    //
    // Summary:
    //     The 3 key on the numeric keypad.
    NumPad3: 99,
    //
    // Summary:
    //     The 4 key on the numeric keypad.
    NumPad4: 100,
    //
    // Summary:
    //     The 5 key on the numeric keypad.
    NumPad5: 101,
    //
    // Summary:
    //     The 6 key on the numeric keypad.
    NumPad6: 102,
    //
    // Summary:
    //     The 7 key on the numeric keypad.
    NumPad7: 103,
    //
    // Summary:
    //     The 8 key on the numeric keypad.
    NumPad8: 104,
    //
    // Summary:
    //     The 9 key on the numeric keypad.
    NumPad9: 105,
    //
    // Summary:
    //     The multiply key.
    Multiply: 106,
    //
    // Summary:
    //     The add key.
    Add: 107,
    //
    // Summary:
    //     The separator key.
    Separator: 108,
    //
    // Summary:
    //     The subtract key.
    Subtract: 109,
    //
    // Summary:
    //     The decimal key.
    Decimal: 110,
    //
    // Summary:
    //     The divide key.
    Divide: 111,
    //
    // Summary:
    //     The F1 key.
    F1: 112,
    //
    // Summary:
    //     The F2 key.
    F2: 113,
    //
    // Summary:
    //     The F3 key.
    F3: 114,
    //
    // Summary:
    //     The F4 key.
    F4: 115,
    //
    // Summary:
    //     The F5 key.
    F5: 116,
    //
    // Summary:
    //     The F6 key.
    F6: 117,
    //
    // Summary:
    //     The F7 key.
    F7: 118,
    //
    // Summary:
    //     The F8 key.
    F8: 119,
    //
    // Summary:
    //     The F9 key.
    F9: 120,
    //
    // Summary:
    //     The F10 key.
    F10: 121,
    //
    // Summary:
    //     The F11 key.
    F11: 122,
    //
    // Summary:
    //     The F12 key.
    F12: 123,
    //
    // Summary:
    //     The F13 key.
    F13: 124,
    //
    // Summary:
    //     The F14 key.
    F14: 125,
    //
    // Summary:
    //     The F15 key.
    F15: 126,
    //
    // Summary:
    //     The F16 key.
    F16: 127,
    //
    // Summary:
    //     The F17 key.
    F17: 128,
    //
    // Summary:
    //     The F18 key.
    F18: 129,
    //
    // Summary:
    //     The F19 key.
    F19: 130,
    //
    // Summary:
    //     The F20 key.
    F20: 131,
    //
    // Summary:
    //     The F21 key.
    F21: 132,
    //
    // Summary:
    //     The F22 key.
    F22: 133,
    //
    // Summary:
    //     The F23 key.
    F23: 134,
    //
    // Summary:
    //     The F24 key.
    F24: 135,
    //
    // Summary:
    //     The NUM LOCK key.
    NumLock: 144,
    //
    // Summary:
    //     The SCROLL LOCK key.
    Scroll: 145,
    //
    // Summary:
    //     The left SHIFT key.
    LShiftKey: 160,
    //
    // Summary:
    //     The right SHIFT key.
    RShiftKey: 161,
    //
    // Summary:
    //     The left CTRL key.
    LControlKey: 162,
    //
    // Summary:
    //     The right CTRL key.
    RControlKey: 163,
    //
    // Summary:
    //     The left ALT key.
    LMenu: 164,
    //
    // Summary:
    //     The right ALT key.
    RMenu: 165,
    //
    // Summary:
    //     The browser back key (Windows 2000 or later).
    BrowserBack: 166,
    //
    // Summary:
    //     The browser forward key (Windows 2000 or later).
    BrowserForward: 167,
    //
    // Summary:
    //     The browser refresh key (Windows 2000 or later).
    BrowserRefresh: 168,
    //
    // Summary:
    //     The browser stop key (Windows 2000 or later).
    BrowserStop: 169,
    //
    // Summary:
    //     The browser search key (Windows 2000 or later).
    BrowserSearch: 170,
    //
    // Summary:
    //     The browser favorites key (Windows 2000 or later).
    BrowserFavorites: 171,
    //
    // Summary:
    //     The browser home key (Windows 2000 or later).
    BrowserHome: 172,
    //
    // Summary:
    //     The volume mute key (Windows 2000 or later).
    VolumeMute: 173,
    //
    // Summary:
    //     The volume down key (Windows 2000 or later).
    VolumeDown: 174,
    //
    // Summary:
    //     The volume up key (Windows 2000 or later).
    VolumeUp: 175,
    //
    // Summary:
    //     The media next track key (Windows 2000 or later).
    MediaNextTrack: 176,
    //
    // Summary:
    //     The media previous track key (Windows 2000 or later).
    MediaPreviousTrack: 177,
    //
    // Summary:
    //     The media Stop key (Windows 2000 or later).
    MediaStop: 178,
    //
    // Summary:
    //     The media play pause key (Windows 2000 or later).
    MediaPlayPause: 179,
    //
    // Summary:
    //     The launch mail key (Windows 2000 or later).
    LaunchMail: 180,
    //
    // Summary:
    //     The select media key (Windows 2000 or later).
    SelectMedia: 181,
    //
    // Summary:
    //     The start application one key (Windows 2000 or later).
    LaunchApplication1: 182,
    //
    // Summary:
    //     The start application two key (Windows 2000 or later).
    LaunchApplication2: 183,
    //
    // Summary:
    //     The OEM Semicolon key on a US standard keyboard (Windows 2000 or later).
    OemSemicolon: 186,
    //
    // Summary:
    //     The OEM 1 key.
    Oem1: 186,
    //
    // Summary:
    //     The OEM plus key on any country/region keyboard (Windows 2000 or later).
    Oemplus: 187,
    //
    // Summary:
    //     The OEM comma key on any country/region keyboard (Windows 2000 or later).
    Oemcomma: 188,
    //
    // Summary:
    //     The OEM minus key on any country/region keyboard (Windows 2000 or later).
    OemMinus: 189,
    //
    // Summary:
    //     The OEM period key on any country/region keyboard (Windows 2000 or later).
    OemPeriod: 190,
    //
    // Summary:
    //     The OEM question mark key on a US standard keyboard (Windows 2000 or later).
    OemQuestion: 191,
    //
    // Summary:
    //     The OEM 2 key.
    Oem2: 191,
    //
    // Summary:
    //     The OEM tilde key on a US standard keyboard (Windows 2000 or later).
    Oemtilde: 192,
    //
    // Summary:
    //     The OEM 3 key.
    Oem3: 192,
    //
    // Summary:
    //     The OEM open bracket key on a US standard keyboard (Windows 2000 or later).
    OemOpenBrackets: 219,
    //
    // Summary:
    //     The OEM 4 key.
    Oem4: 219,
    //
    // Summary:
    //     The OEM pipe key on a US standard keyboard (Windows 2000 or later).
    OemPipe: 220,
    //
    // Summary:
    //     The OEM 5 key.
    Oem5: 220,
    //
    // Summary:
    //     The OEM close bracket key on a US standard keyboard (Windows 2000 or later).
    OemCloseBrackets: 221,
    //
    // Summary:
    //     The OEM 6 key.
    Oem6: 221,
    //
    // Summary:
    //     The OEM singled/double quote key on a US standard keyboard (Windows 2000 or later).
    OemQuotes: 222,
    //
    // Summary:
    //     The OEM 7 key.
    Oem7: 222,
    //
    // Summary:
    //     The OEM 8 key.
    Oem8: 223,
    //
    // Summary:
    //     The OEM angle bracket or backslash key on the RT 102 key keyboard (Windows 2000
    //     or later).
    OemBackslash: 226,
    //
    // Summary:
    //     The OEM 102 key.
    Oem102: 226,
    //
    // Summary:
    //     The PROCESS KEY key.
    ProcessKey: 229,
    //
    // Summary:
    //     Used to pass Unicode characters as if they were keystrokes. The Packet key value
    //     is the low word of a 32-bit virtual-key value used for non-keyboard input methods.
    Packet: 231,
    //
    // Summary:
    //     The ATTN key.
    Attn: 246,
    //
    // Summary:
    //     The CRSEL key.
    Crsel: 247,
    //
    // Summary:
    //     The EXSEL key.
    Exsel: 248,
    //
    // Summary:
    //     The ERASE EOF key.
    EraseEof: 249,
    //
    // Summary:
    //     The PLAY key.
    Play: 250,
    //
    // Summary:
    //     The ZOOM key.
    Zoom: 251,
    //
    // Summary:
    //     A constant reserved for future use.
    NoName: 252,
    //
    // Summary:
    //     The PA1 key.
    Pa1: 253,
    //
    // Summary:
    //     The CLEAR key.
    OemClear: 254,
    //
    // Summary:
    //     The bitmask to extract a key code from a key value.
    KeyCode: 65535,
    //
    // Summary:
    //     The SHIFT modifier key.
    Shift: 65536,
    //
    // Summary:
    //     The CTRL modifier key.
    Control: 131072,
    //
    // Summary:
    //     The ALT modifier key.
    Alt: 262144
}

module.exports = {
    JSKeyCode,
    KeyCodes,
    RequiresShiftKey
}