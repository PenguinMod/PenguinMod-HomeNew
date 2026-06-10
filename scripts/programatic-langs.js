// run with
// npm run indexl10n
// or
// node scripts/programatic-langs.js

/**
 * @fileoverview This generates joke-langs & testing stuff for src/lib/resources/localization/translation/language
 * Run this before indexing the folder or they wont be listed by translation-index.js
 * Make sure to tell finished-percentage to mark these language codes as 100% translated to avoid logs & stuff
 */
import fs from "fs"
import path from "path"
const folderPath = path.join(import.meta.dirname, "../src/lib/resources/localization/translation/language/");

import en from '../src/lib/resources/localization/translation/language/en.json' with { type: "json" };

const madeJokeLangs = [];
// NOTE: If we ever wanted to add a joke lang that is NOT programatic, then add it to the list like so:
// madeJokeLangs.push("lolcat");

// test
(() => {
    const testLang = {"---_PROGRAMATIC": "true"};
    for (const key in en) {
        testLang[key] = key;
    }
    fs.writeFileSync(path.join(folderPath, "test.json"), JSON.stringify(testLang, null, 4), "utf8");
    madeJokeLangs.push("test");
    console.log("PROGRAMATIC LANGS: test");
})();
// en-but-again
(() => {
    // NOTE: This language just exists to test how non-en langs behave while still having en text
    const myLang = { "---_PROGRAMATIC": "true" };
    for (const key in en) {
        myLang[key] = en[key];
    }
    myLang["lang.name"] = "English (but again)";
    fs.writeFileSync(path.join(folderPath, "en-but-again.json"), JSON.stringify(myLang, null, 4), "utf8");
    madeJokeLangs.push("en-but-again");
    console.log("PROGRAMATIC LANGS: en-but-again");
})();
// en-scream
(() => {
    const myLang = { "---_PROGRAMATIC": "true" };
    for (const key in en) {
        myLang[key] = String(en[key]).toUpperCase() + "!!!";
    }
    fs.writeFileSync(path.join(folderPath, "en-scream.json"), JSON.stringify(myLang, null, 4), "utf8");
    madeJokeLangs.push("en-scream");
    console.log("PROGRAMATIC LANGS: en-scream");
})();
// en-reversed
(() => {
    const myLang = { "---_PROGRAMATIC": "true" };
    for (const key in en) {
        myLang[key] = String(en[key]).split("").reverse().join("");
    }
    fs.writeFileSync(path.join(folderPath, "en-reversed.json"), JSON.stringify(myLang, null, 4), "utf8");
    madeJokeLangs.push("en-reversed");
    console.log("PROGRAMATIC LANGS: en-reversed");
})();
// en-flipped
(() => {
    const upsideDownMap = {
        'a': '\u0250',
        'b': 'q',
        'c': '\u0254',
        'd': 'p',
        'e': '\u01DD',
        'f': '\u025F',
        'g': '\u0183',
        'h': '\u0265',
        'i': '\u0131',
        'j': '\u027E',
        'k': '\u029E',
        'l': '\u0283',
        'm': '\u026F',
        'n': 'u',
        'o': 'o',
        'p': 'd',
        'q': 'b',
        'r': '\u0279',
        's': 's',
        't': '\u0287',
        'u': 'n',
        'v': '\u028C',
        'w': '\u028D',
        'x': 'x',
        'y': '\u028E',
        'z': 'z',
        'A': '\u2200',
        'B': 'B',
        'C': '\u0186',
        'D': 'D',
        'E': '\u018E',
        'F': '\u2132',
        'G': '\u2141',
        'H': 'H',
        'I': 'I',
        'J': '\u017F',
        'K': 'K',
        'L': '\u2142',
        'M': 'W',
        'N': 'N',
        'O': 'O',
        'P': '\u0500',
        'Q': 'Q',
        'R': 'R',
        'S': 'S',
        'T': '\u22A5',
        'U': '\u2229',
        'V': '\u039B',
        'W': 'M',
        'X': 'X',
        'Y': '\u2144',
        'Z': 'Z'
    };
    const myLang = { "---_PROGRAMATIC": "true" };
    for (const key in en) {
        myLang[key] = String(en[key]).split("").map(char => upsideDownMap[char] || char).reverse().join("");
    }
    fs.writeFileSync(path.join(folderPath, "en-flipped.json"), JSON.stringify(myLang, null, 4), "utf8");
    madeJokeLangs.push("en-flipped");
    console.log("PROGRAMATIC LANGS: en-flipped");
})();
// bleh
(() => {
    const myLang = { "---_PROGRAMATIC": "true" };
    for (const key in en) {
        myLang[key] = String(en[key]).split(" ").map(word => {
            if (word === word.toUpperCase()) return "BLEH";
            if (word[0] === word[0].toUpperCase() && word.slice(1) === word.slice(1).toLowerCase()) return "Bleh";
            return "bleh";
        }).join(" ");
    }
    fs.writeFileSync(path.join(folderPath, "bleh.json"), JSON.stringify(myLang, null, 4), "utf8");
    madeJokeLangs.push("bleh");
    console.log("PROGRAMATIC LANGS: bleh");
})();


fs.writeFileSync(path.join(folderPath, "jokelangs.txt"), `${JSON.stringify(madeJokeLangs)}`, "utf8");
console.log("wrote jokelangs.txt");