# Harvest Craft Bot for Path of Exile #

With harvest returning to the main game a method for storing and searching crafts seems necessary. This particular approach is fully manual, but built as a set of custom commands for (YAGPDB)[https://github.com/jonas747/yagpdb].

## Notes

- All db insertions use a prefix of `poehcs` to hopefully avoid conflicts
  - Specifically the keys prefixes currently in use are:
    - `poehcs_u_{craft_shortcut}_{ilvl}` for storing user owned crafts
    - `poehcs_c_{craft_shortcut}` for storing craft shortcut to description mappings

## Common stanzas
- Increment a craft for a user
```
{{$count := dbIncr .User.ID (joinStr "_" "poehcs" (lower ($args.Get 0)) (lower ($args.Get 1))) [increment value]}}
```
- Strip the first x characters from a string (9 for user crafts, 13 for craft maps)
```
{{slice $string [num_characters]}}
```