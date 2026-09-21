# DOOM: The Dark Ages — Ultimate Mod Tool

The all in one Doom The Dark Ages Mod Tool, made by SirBiggieCheese.

Version **0.2.8** · build **b0921-119** · Windows

---

## What you can change

**Textures** — the Slayer and all of his skins, every weapon, every demon, bosses, the Atlan and
the dragon, projectiles, and the world itself. Glow, transparency and animated see-through parts too,
the limit is your imagination.

**Weapon stats** — damage, fire rate, ammo capacity and range with sliders.

**The HUD face** — you can replace the slayers face whatever character you like.


## It stays on your machine

Offline. No account, no sign-in, no API key, no telemetry, nothing phoning home. It reads your files,
writes a mod folder, and that's the whole relationship.

## Running it from source

```bash
cd app
npm install
npm start
```

Building the installer: `npm run dist` from the same folder.

## What's where

```
index.html    the whole application — UI, logic and exporter, one file
app/          the Electron shell that wraps it
data/         which part maps to which material in the game
assets/       icons, art, sounds, fonts
content/      bundled camos and PBR presets
tools/        decode_atim.py, for previewing the game's compiled textures (needs Python)
```

## Special Thanks

**FlavorfulGecko5** — the Atlan Packager and Loader. None of this ships without them.
**Kuddly Kraken** — the Slayer Kit the PBR work is built on.

## Licence

Not decided yet. Don't sell mods made with this, and don't sell the tool.
