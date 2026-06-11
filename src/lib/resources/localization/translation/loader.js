import { browser } from '$app/environment';

import Locale from '../locale';
import TranslationMapper from './mapper';

import languageInfo from "./language/language-info";

class TranslationLoader {
    /**
     * Handles initialization of the language.
     * Can be ran multiple times (ex, swapping languages)
     * @param {TranslationIndex.LanguageCode} languageCode The language code to use for initialization.
     */
    static initialize(languageCode) {
        if (!browser) return;
        const intendedLanguage = TranslationMapper.mapSavedLanguageCode(languageCode);

        document.documentElement.dir = "ltr";
        if (languageInfo.languageRtl[intendedLanguage]) {
            document.documentElement.dir = "rtl";
        }
    }
}

export default TranslationLoader;
