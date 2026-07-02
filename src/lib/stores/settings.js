import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import tryCatch from '$lib/resources/try-catch';

export const defaultSettings = {
    /** Whether or not the user is logged in */
    loggedIn: false,
    /** The logged-in user's token */
    token: "",

    /** The theme of the site */
    appTheme: "light",
    /** The language of the site */
    appLanguage: "browser",

    /** Alert IDs that have been dismissed */
    alertDismissed: [],
    /** The last status alert text dismissed (should be reset on no status alert) */
    alertStatusDismissed: "",
};

// NOTE: uses localStorage
const settings = writable(defaultSettings);
if (browser) {
    const stringStored = localStorage.getItem('pm:settings');
    const saved = tryCatch(() => JSON.parse(stringStored));
    if (saved) {
        settings.set({
            ...defaultSettings,
            ...(saved ?? {}),
        });

        document.dispatchEvent(new CustomEvent("penguinmod-store-settings-updated"));
    }
    settings.subscribe((value) => {
        localStorage.setItem('pm:settings', JSON.stringify(value));
        document.dispatchEvent(new CustomEvent("penguinmod-store-settings-updated"));
    });
}

export default settings;