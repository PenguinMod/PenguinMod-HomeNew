import languageDatabase from "./language/language-database";

class TranslationMapper {
    /**
     * Map a `TranslationIndex.Key` to `TranslationIndex.Text` depending on the `TranslationIndex.LanguageCode` provided.
     * @param {TranslationIndex.Key} key Which text string to grab.
     * @param {TranslationIndex.LanguageCode} langCode Defaults to `"en"` English text.
     * @param {TranslationIndex.Text | null} defaultText Text to fallback to if no translation exists.
     * @returns {TranslationIndex.Text} The text string in the specified language.
     */
    static map(key, langCode = "en", defaultText = "Missing translation") {
        const language = languageDatabase[langCode] || languageDatabase.en;
        const langText = language[key];
        if (langText) return langText;
        
        const englishText = languageDatabase.en[key];
        return englishText || defaultText;
    }
}

export default TranslationMapper;
