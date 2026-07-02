declare interface StoreSettingsInterface {
    /** Whether or not the user is logged in */
    loggedIn: boolean,
    /** The logged-in user's token */
    token: string,

    /** The theme of the site */
    appTheme: "light"|"dark",
    /** The language of the site */
    appLanguage: "browser"|TranslationIndex.LanguageCode,

    /** Alert IDs that have been dismissed */
    alertDismissed: string[],
    /** The status alert IDs dismissed (should empty nonexistent alerts) */
    alertStatusDismissed: string[],
};
