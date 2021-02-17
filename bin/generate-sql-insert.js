// This script is used as part of the pipeline (or manually) to update the insertion commands needed to seed the DB
const join = require("path").join;
const { open, writeFile } = require("fs/promises");

const guildID = "PUT YOUR GUILD ID HERE";

(async function () {
  const handle = await open(join(__dirname, "..", "data", "tags.csv"));
  const crafts = (await handle.readFile({ encoding: "utf-8" })).split("\n");
  let pgSql =
    "INSERT INTO templates_user_database (CreatedAt, UpdatedAt, GuildID, UserID, Key, ValueNum, ValueRaw) VALUES ";
  for (const line of crafts) {
    if (line.length > 0) {
      // perform some non-destructive work before generating the insert commands
      let [shortcut, description] = line.split('","');
      shortcut = shortcut.substr(1);
      description = description.substr(0, description.length - 1);
      pgSql += `(now(), now(), ${guildID}, 0, "poehcs_craft_${shortcut}", "${description}"),`;
    }
  }
  pgSql = pgSql.slice(0, -1) + ";";
  writeFile(join(__dirname, "../", "inserts", "insert-crafts.sql"), pgSql);
  handle.close();
})();
