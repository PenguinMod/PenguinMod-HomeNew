import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import tryCatch from '$lib/resources/try-catch';

/**
 * @type {StoreSettingsInterface}
 */
export const defaultSettings = {
    loggedIn: false,
    token: "",

    appTheme: "light",
    appLanguage: "browser",

    alertDismissed: [],
    alertStatusDismissed: [],
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