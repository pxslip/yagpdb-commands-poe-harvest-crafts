#! /usr/bin/env node
// This script is used as part of the pipeline (or manually) to update the insertion commands needed to seed the DB
const join = require("path").join;
const { open, writeFile } = require("fs/promises");

// lazy argument parsing...
if (process.argv === 3) {
  // use an iife to get access to async since top level async is still a proposal
  (async function () {
    const guildID = process.argv[2];
    // grab the craft data, thanks Akala!
    const handle = await open(join(__dirname, "..", "data", "tags.csv"));
    try {
      // and read the crafts out, lazy CSV parsing ftw!
      const crafts = (await handle.readFile({ encoding: "utf-8" })).split("\n");
      let pgSql =
        "INSERT INTO templates_user_database (CreatedAt, UpdatedAt, GuildID, UserID, Key, ValueNum, ValueRaw) VALUES ";
      for (const line of crafts) {
        if (line.length > 0) {
          // create a new insert for each craft line
          let [shortcut, description] = line.split('","');
          shortcut = shortcut.substr(1);
          description = description.substr(0, description.length - 1);
          pgSql += `(now(), now(), ${guildID}, 0, "poehcs_craft_${shortcut}", "${description}"),`;
        }
      }
      pgSql = pgSql.slice(0, -1) + ";";
      writeFile(join(__dirname, "../", "inserts", "insert-crafts.sql"), pgSql);
    } catch (exc) {
      console.error(exc);
    } finally {
      handle.close();
    }
  })();
} else {
  console.log(
    "Usage: generate-sql-insert.js [GuildId] (to get your Guild ID see https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-)"
  );
}
