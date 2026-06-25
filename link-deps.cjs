const fs = require("fs");
const path = require("path");





// CONFIG
const pathPenguinModApiModule = "C:/Users/Jeremy/Documents/Projects/PenguinMod/PenguinMod-ApiModule";
const pathPenguinModMarkDownNew = "C:/Users/Jeremy/Documents/Projects/PenguinMod/PenguinMod-MarkDownNew";
const pathPenguinModSvelteUI = "C:/Users/Jeremy/Documents/Projects/PenguinMod/PenguinMod-SvelteUI";
const nodeModulesPathPenguinModApiModule = path.join(__dirname, "node_modules/penguinmod");
const nodeModulesPathPenguinModMarkDownNew = path.join(__dirname, "node_modules/PenguinMod-MarkDown");
const nodeModulesPathPenguinModSvelteUI = path.join(__dirname, "node_modules/PenguinMod-SvelteUI");




// script
console.log("Linking with LOCAL Paths (make sure you configured them), run this script as administrator/sudo if you have an issue");

// nodeModulesPathPenguinModApiModule
if (fs.existsSync(pathPenguinModApiModule) && fs.existsSync(nodeModulesPathPenguinModApiModule)) {
    fs.rmSync(nodeModulesPathPenguinModApiModule, { recursive: true, force: true });
    fs.symlinkSync(pathPenguinModApiModule, nodeModulesPathPenguinModApiModule);
    console.log("symlinked:", pathPenguinModApiModule, "to", nodeModulesPathPenguinModApiModule);
} else {
    console.warn("one of these is missing:", pathPenguinModApiModule, nodeModulesPathPenguinModApiModule);
}
// nodeModulesPathPenguinModMarkDownNew
if (fs.existsSync(pathPenguinModMarkDownNew) && fs.existsSync(nodeModulesPathPenguinModMarkDownNew)) {
    fs.rmSync(nodeModulesPathPenguinModMarkDownNew, { recursive: true, force: true });
    fs.symlinkSync(pathPenguinModMarkDownNew, nodeModulesPathPenguinModMarkDownNew);
    console.log("symlinked:", pathPenguinModMarkDownNew, "to", nodeModulesPathPenguinModMarkDownNew);
} else {
    console.warn("one of these is missing:", pathPenguinModMarkDownNew, nodeModulesPathPenguinModMarkDownNew);
}
// nodeModulesPathPenguinModSvelteUI
if (fs.existsSync(pathPenguinModSvelteUI) && fs.existsSync(nodeModulesPathPenguinModSvelteUI)) {
    fs.rmSync(nodeModulesPathPenguinModSvelteUI, { recursive: true, force: true });
    fs.symlinkSync(pathPenguinModSvelteUI, nodeModulesPathPenguinModSvelteUI);
    console.log("symlinked:", pathPenguinModSvelteUI, "to", nodeModulesPathPenguinModSvelteUI);
} else {
    console.warn("one of these is missing:", pathPenguinModSvelteUI, nodeModulesPathPenguinModSvelteUI);
}