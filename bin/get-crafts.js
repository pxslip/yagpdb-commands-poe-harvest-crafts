const { join } = require("path");
const { open } = require("fs/promises");

module.exports = (async function () {
  const handle = await open(join(__dirname, "..", "data", "tags.csv"));
  const crafts = (await handle.readFile({ encoding: "utf-8" })).split("\n");
  return crafts;
})();
