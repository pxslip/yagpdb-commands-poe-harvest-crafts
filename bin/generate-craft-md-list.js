const { writeFile } = require("fs/promises");
const { join } = require("path");
require("./get-crafts").then((crafts) => {
  let contents = ["# Path of Exile Harvest Craft Shortcuts"];

  for (const line of crafts) {
    if (line.length > 0) {
      let [shortcut, description] = line.split('","');
      shortcut = shortcut.substr(1);
      description = description.substr(0, description.length - 1);
      contents.push(`- \`${shortcut}\`: ${description}`);
    }
  }

  writeFile(join(__dirname, "..", "Crafts.md"), contents.join("\n"));
});
