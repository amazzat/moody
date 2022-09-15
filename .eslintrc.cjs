const { configure, presets } = require("eslint-kit");

module.exports = configure({
  presets: [
    presets.node(),
    presets.typescript(),
    presets.react(),
    presets.nextJs(),
    presets.prettier(),
    presets.imports(),
  ],
});
