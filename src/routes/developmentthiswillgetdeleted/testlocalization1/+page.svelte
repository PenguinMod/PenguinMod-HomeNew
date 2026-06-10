<script>
    // components
    import LocalizedString from "$lib/components/Localization/LocalizedString.svelte";

    import Locale from "$lib/resources/localization/locale.js";
    import TranslationLoader from "$lib/resources/localization/translation/loader";
    
    import en from "$lib/resources/localization/translation/language/en.json";
    import languageInfo from "$lib/resources/localization/translation/language/language-info";

    import StoreSettings from "$lib/stores/settings";

    const languageCodeSet = (langCode) => {
        $StoreSettings.appLanguage = langCode;
    };

    /**
     * @type {TranslationIndex.Key}
     */
    let translationKey = $state("lang.name");
</script>

<h1>TranslationLoader &amp; LocalizedString</h1>
<h2>{$StoreSettings.appLanguage} -&gt; {TranslationLoader.mapSavedLanguageCode($StoreSettings.appLanguage)}</h2>

<select bind:value={translationKey}>
    {#each Object.keys(en) as translationKey}
        <option value={translationKey}>{translationKey}</option>
    {/each}
</select>
<LocalizedString
    key={translationKey}
    text={"Missing translation"}
/>

<hr />

<button onclick={() => languageCodeSet("browser")}>browser</button>
<hr />
{#each languageInfo.languageOrder as languageCode}
    <button onclick={() => languageCodeSet(languageCode)}>{languageCode}: {languageInfo.languageName[languageCode]}</button>
    <br />
{/each}