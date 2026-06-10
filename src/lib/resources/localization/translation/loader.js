import { browser } from '$app/environment';

import Locale from '../locale';
import languageInfo from "./language/language-info";

class TranslationLoader {
    /**
     * Handles initialization of the language.
     * Can be ran multiple times (ex, swapping languages)
     * @param {TranslationIndex.LanguageCode} languageCode The language code to use for initialization.
     */
    static initialize(languageCode) {
        if (!browser) return;
        
        document.documentElement.dir = "ltr";
        if (languageInfo.languageRtl[languageCode]) {
            document.documentElement.dir = "rtl";
        }
    }

    /**
     * Maps a language code to one that we support.
     * @param {string} langCode The language code to map to a known language.
     * @returns {TranslationIndex.LanguageCode} The closest language code to the specified one that we support.
     */
    static mapLanguageCode(langCode) {
        // see if this language code is known exactly
        if (languageInfo.languageOrder.includes(langCode)) {
            return langCode;
        }
        if (langCode in languageInfo.languageAlternative) {
            return languageInfo.languageAlternative[langCode];
        }

        // see if we just need to split the language code
        const topLevelLang = langCode.split('-').shift();
        if (languageInfo.languageOrder.includes(topLevelLang)) {
            return topLevelLang;
        }
        if (topLevelLang in languageInfo.languageAlternative) {
            return languageInfo.languageAlternative[topLevelLang];
        }

        // we dont know this language
        return "en";
    }
    /**
     * Maps a saved language code to one that we support.
     * `"browser"` is reserved for "Same as browser" language.
     * @param {"browser" | string | null} savedLanguageCode The language code to map. The browser's language is default.
     * @returns {TranslationIndex.LanguageCode} The closest language code to the specified one that we support.
     */
    static mapSavedLanguageCode(savedLanguageCode) {
        const browserLanguage = Locale.browserLanguage;
        if ((!savedLanguageCode) || (savedLanguageCode === "browser")) savedLanguageCode = browserLanguage;
        if (typeof savedLanguageCode !== "string") throw new Error("Saved language code is not a string (likely invalid settings)");
        return this.mapLanguageCode(savedLanguageCode);
    }
}

export default TranslationLoader;
