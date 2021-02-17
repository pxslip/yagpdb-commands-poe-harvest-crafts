// This script is used as part of the pipeline (or manually) to update the insertion commands needed to seed the DB
const join = require("path").join;
const { open, writeFile } = require("fs/promises");

(async function () {
  const handle = await open(join(__dirname, "tags.csv"));
  const crafts = (await handle.readFile({ encoding: "utf-8" })).split("\n");
  for (const line of crafts) {
    let i = 1;
    while (crafts.length > 0) {
      const craftSlice = crafts.splice(0, 10);
      const craftSdict = craftSlice.join(" ").split('","').join('" "');
      const tpl = `{{- ange $shortcut, $desc := sdict ${craftSdic -}}}
{{- bSet 0 (joinStr "" "poehcs_craft_" $shortcut) $des -}}
{{- n -}}
Inserted Craft Group ${i}`;
      writeFile(join(__dirname, "inserts", `insert-crafts-${i}.go.tmpl`), tpl);
      i++;
    }
  }
  handle.close();
})();
