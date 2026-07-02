import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import tryCatch from '$lib/resources/try-catch';

export const defaultSession = {
    /** The last time the status endpoint was fetched */
    alertStatusCachedTime: 0,

    /** User cache - last time the user info was actually fetched (reset on logout) */
    userCachedTime: 0,
    /** User cache - The user's ID */
    userCachedId: "",
    /** User cache - The user's name (lowercase) */
    userCachedUsername: "",
    /** User cache - The user's name (displayed) */
    userCachedDisplayName: "",
    /** User cache - The user's bio (generally try not to depend on this) */
    userCachedBio: "",
    /** User cache - The amount of unread messages the user has */
    userCachedUnreadCount: 0,
    /** User cache - The user's rank */
    userCachedRank: 0,
    /** User cache - Whether or not the user can rank up */
    userCachedCanRankUp: false,
    /** User cache - Whether or not the user is a supporter */
    userCachedSupporter: false,
    /** User cache - Whether or not the user is a moderator */
    userCachedMod: false,
    /** User cache - Whether or not the user is an admin */
    userCachedAdmin: false,
    
    /** User feed cache - last time the user feed was actually fetched */
    userFeedCachedTime: 0,
};

// NOTE: uses sessionStorage
// TODO: Session storage might be different between tabs.. thats a problem. Probably we will use BroadcastChannel to tell other tabs what the right info is on set.
const session = writable(defaultSession);
if (browser) {
    const stringStored = sessionStorage.getItem('pm:session');
    const saved = tryCatch(() => JSON.parse(stringStored));
    if (saved) {
        session.set({
            ...defaultSession,
            ...(saved ?? {}),
        });

        document.dispatchEvent(new CustomEvent("penguinmod-store-session-updated"));
    }
    session.subscribe((value) => {
        sessionStorage.setItem('pm:session', JSON.stringify(value));
        document.dispatchEvent(new CustomEvent("penguinmod-store-session-updated"));
    });
}

export default session;