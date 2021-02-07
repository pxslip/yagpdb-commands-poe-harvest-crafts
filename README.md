# Harvest Craft Bot for Path of Exile #

With harvest returning to the main game a method for storing and searching crafts seems necessary. This particular approach is fully manual, but built as a set of custom commands for (YAGPDB)[https://github.com/jonas747/yagpdb].

## Notes

- All db insertions use a prefix of `poehcs` to hopefully avoid conflicts
  - Specifically the keys prefixes currently in use are:
    - `poehcs_{craft_shortcut}_{i_lvl}` for storing user owned crafts
    - `poehcs_craft_{craft_shortcut}` for storing craft shortcut to description mappings
