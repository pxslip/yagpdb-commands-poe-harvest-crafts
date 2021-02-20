# Harvest Craft Bot for Path of Exile

With harvest returning to the main game a method for storing and searching crafts seems necessary. This particular approach is fully manual, but built as a set of custom commands for (YAGPDB)[https://github.com/jonas747/yagpdb].

## Installation

These commands are for use with [YAGPDB](https://yagpdb.xyz) and can be added as Custom commands.

Now the fun part: the commands under `inserts` are also required to be run...once. These commands insert data into the database that is necessary for the craft commands to work. Blame the YAGPDB for the fact that there are 29 files, as commands are limited to 10 inserts each...

If you are self-hosted you could manually insert the data into the DB

## Commands

The example command prefixes are examples only, choose a command trigger that makes sense to you!

- Add a Craft `add-craft.go.tmpl [shortcut] [iLvl]` - add a craft associated with the calling user at the given iLvl
- Remove a Craft `remove-craft.go.tmpl [shortcut] [iLvl]` - remove a craft from your list once used
- My Crafts `my-crafts.go.tmpl` - get a list of crafts the current user ahs
- List Crafts `list-crafts.go.tmpl {page}` - get a list of crafts with shortcut and description (limited to 10 per page)
- Check Craft Shortcut `is-craft-shortcut.go.tmpl [shortcut]` - check if a value is a valid craft shortcut
- Find a Craft `find-craft.go.tmpl [shortcut] {iLvl} {page}` - search crafts by shortcut and iLvl limited to 10 per page, use the page parameter to show later pages
- Get whisper message `get-whisper.go.tmpl [discord_username] [shortcut] [iLvl]` - get a whisper message to copy to in game chat
- List commands in module `list-commands.go.tmpl` - outputs a list of the commands in this module
- Set your IGN `set-ign.go.tmpl [ign]` - sets the in game name where buyers can contact you
- Set your league `set-league.go.tmpl [league]` - set the league you're selling from

* Legend: Parameters wrapped in [] are required, wherease parameters wrapped in {} are optional

## Notes

- All db insertions use a prefix of `poehcs` to hopefully avoid conflicts
  - Specifically the keys prefixes currently in use are:
    - `poehcs_u_{craft_shortcut}_{ilvl}` for storing user owned crafts
    - `poehcs_c_{craft_shortcut}` for storing craft shortcut to description mappings

## Common stanzas

- Increment a craft for a user

```
{{- count := dbIncr .User.ID (joinStr "_" "poehcs" (lower ($args.Get 0)) (lower ($args.Get 1))) [increment value -}}
```

- Strip the first x characters from a string (9 for user crafts, 13 for craft maps)

```
{{- slice $string [num_characters] -}}
```
