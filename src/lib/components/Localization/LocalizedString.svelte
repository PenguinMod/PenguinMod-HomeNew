<script>
    import { browser } from "$app/environment";

    import TranslationMapper from "$lib/resources/localization/translation/mapper";
    import TranslationLoader from "$lib/resources/localization/translation/loader";

    import StoreSettings from "$lib/stores/settings";

    /**
     * @typedef {Object} Properties
     * @property {TranslationIndex.Key} key A translation key
     * @property {TranslationIndex.Text | null} text Text to fallback to if there is no translation text
     * @property {TranslationIndex.LanguageCode | null} lang A specific language code to use
     */
    /** @type {Properties} */
    let props = $props();
    let translationLang = $derived(props.lang
        || (browser ? TranslationLoader.mapSavedLanguageCode($StoreSettings.appLanguage) : "en"));
</script>

{TranslationMapper.map(props.key, translationLang, props.text)}