const StateApplication = $state({
    /** Whether or not to show the navbar */
    navigationBar: false,
    /** Whether or not loggedIn has been processed (always access before accessing loggedIn) */
    loggedInProcessed: false,
});

export default StateApplication;