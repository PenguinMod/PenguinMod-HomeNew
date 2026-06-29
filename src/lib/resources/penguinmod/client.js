import { browser } from "$app/environment";
import { PUBLIC_API_URL } from "$env/static/public";
import { get } from "svelte/store";

import { PenguinModAPI } from "penguinmod";

import StoreSettings from "$lib/stores/settings";

// fix the api url for ApiModule
const apiUrl = new URL(PUBLIC_API_URL);
apiUrl.pathname = "/api";

// get the current token so we dont need to use setToken everywhere (outside of auth at least)
let userToken = null;
if (browser) {
    const currentSettings = get(StoreSettings);
    if (currentSettings.loggedIn)
        userToken = currentSettings.token;
}

const PenguinModClient = new PenguinModAPI({
    apiUrl: apiUrl,
    token: userToken,
});
if (browser) {
    PenguinModClient.injectOptions = (options) => {
        return {
            headers: {
                "PenguinMod-Frontend": location.host,
                "PenguinMod-FrontendType": "PenguinMod-HomeNew",
            },
        };
    };
}

export default PenguinModClient;
