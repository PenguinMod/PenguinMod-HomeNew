import { browser } from "$app/environment";
import { get } from "svelte/store";

import PenguinModClient from "$lib/resources/penguinmod/client.js";

import CacheHelper from "$lib/resources/cache/cache-helper.js";
import { CACHE_USER_INFO } from "$lib/resources/cache/cache-time.js";

import StoreSettings from "$lib/stores/settings";
import StoreSession from "$lib/stores/session";

class Authenticator {
    /**
     * Grabs the latest user info for the active account.
     */
    static async cacheUserInfo() {
        const currentSettings = get(StoreSettings);
        const token = currentSettings.token;

        // get the current user info
        const userInfo = await PenguinModClient.users.getInfo();
        CacheHelper.update({
            userCachedId: userInfo.id,
            userCachedUsername: userInfo.username,
            userCachedDisplayName: userInfo.real_username,
            userCachedUnreadCount: userInfo.messageCount,
            userCachedRank: userInfo.rank,
            userCachedCanRankUp: userInfo.canrankup,
            userCachedSupporter: userInfo.donator,
            userCachedMod: userInfo.approver,
            userCachedAdmin: userInfo.admin,
        });
    }
    /**
     * Marks the cached user info as outdated.
     */
    static dirtyUserInfo() {
        if (!browser) return;
        CacheHelper.reset({
            userCachedTime: true,
        });
    }
    /**
     * Checks if the cached user info is outdated, and grabs the new information if so.
     */
    static async updateOutdatedUserInfo() {
        if (!browser) return;
        if (!CacheHelper.isExpired("userCachedTime", CACHE_USER_INFO)) return;

        // it has been CACHE_USER_INFO ms
        await this.cacheUserInfo();
    }

    /**
     * Takes an account token and saves it, as well as caching all important data about the login.
     * All login methods should eventually lead to this function.
     * @param {string} token The account token to log in with.
     */
    static async loginToken(token) {
        // NOTE: We want to account for the fact that the page can be reloaded early by the user.
        const currentSettings = get(StoreSettings);

        // test that we can actually log in
        PenguinModClient.setToken(token);
        await PenguinModClient.users.getInfo();

        // cache the user info
        this.dirtyUserInfo();
        await this.cacheUserInfo();

        // save this in settings
        // NOTE: this is the real finalizing step
        StoreSettings.set({
            ...currentSettings,
            loggedIn: true,
            token: token,
        });
    }

    /**
     * Invalidates the token and marks cache as dirty.
     */
    static async logout() {
        const currentSettings = get(StoreSettings);

        // attempt to invalidate the token
        try {
            PenguinModClient.setToken(currentSettings.token);
            await PenguinModClient.users.logout();
        } catch (err) {
            // assume this token is already invalidated
            console.warn(err);
        }

        // save this in settings
        StoreSettings.set({
            ...currentSettings,
            loggedIn: false,
            token: "",
        });

        // dirty user cache & other user-related content
        this.dirtyUserInfo();
        CacheHelper.reset({
            userFeedCachedTime: true,
        });
    }
}

export default Authenticator;