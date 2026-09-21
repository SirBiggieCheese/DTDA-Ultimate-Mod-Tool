/* ============================================================================
   DTDA Ultimate Mod Tool — TRANSLATIONS
   ============================================================================

   HOW THIS WORKS
   --------------
   The app's text is written in English directly in skin_builder.html. Rather than
   refactor a 1 MB file into string ids, the translator matches on the ENGLISH TEXT
   ITSELF and swaps it. So a translation is just:

       "English exactly as it appears on screen": "the translation",

   You can add a line here without touching the app at all.

   RULES
   -----
   1. The key must match the English EXACTLY (capitals, punctuation, ellipsis …,
      and curly apostrophes ’ — not straight ones).
   2. Leading emoji and symbols are handled for you. Write the key WITHOUT them:
      the app shows "📖 Tutorial & Guide", you write "Tutorial & Guide".
   3. Delete a line (or leave it "") to keep the English for that string.
   4. *single stars* and **double stars** mark italic/bold, and \n is a line break.
      Keep them where they are.
   5. A key that matches nothing is harmless — it is simply never used.

   COVERAGE
   --------
   Everything in the interface: menus, buttons, panels, tabs, tooltips, dialogs,
   toasts, the walkthrough and the Mod Buddy.

   Deliberately NOT translated:
     · Part, weapon and demon names, and texture paths (game data — modding tools
       normally keep these in English so they match the game files).
     · The long written Guide under Tutorial ▸ Guide.
     · Proper nouns: SirBiggieCheese, FlavorfulGecko5, Atlan, camo names.
   Run  sbLangReport()  in the console to list anything still untranslated.

   These are a ROUGH first pass by Claude for a native speaker to correct.
   ========================================================================== */

window.SB_TRANSLATIONS = {

  /* ======================================================================== */
  es: {
    __name__: 'Español',

    /* ---- PATTERNS: strings the app builds at runtime from numbers or proper nouns.
       A fixed key can never match "14 sections / 35 texture targets" (hundreds of number
       combinations) or "1st-person arms — Nightmare" (the skin name is a proper noun and
       must stay in English so it matches the game). $1/$2 keep the captured parts. ---- */
    __patterns__: [
      [/^(\d+) sections? \/ (\d+) texture targets?$/, '$1 secciones / $2 objetivos de textura'],
      [/^(\d+) of (\d+) weapons?$/,                   '$1 de $2 armas'],
      [/^(\d+) weapons?$/,                            '$1 armas'],
      [/^(\d+) parts?$/,                              '$1 piezas'],
      [/^(\d+) part\(s\)$/,                           '$1 pieza(s)'],
      [/^1st-person arms — (.+)$/,                    'Brazos en 1.ª persona — $1'],
      [/^3rd-person body armour — (.+)$/,             'Armadura en 3.ª persona — $1'],
      [/^Shield Skin — (.+)$/,                        'Skin del escudo — $1'],
      [/^Slayer skin — (.+)$/,                        'Skin del Slayer — $1'],
      [/^Dragon — (.+)$/,                             'Dragón — $1']
    ],

    /* ---- PART & TARGET WORDS --------------------------------------------------------------------
       Part names are compounds: "Baron - Body", "Abs (Conqueror)", "Left arm (1p) (Nightmare)".
       The app translates each PIECE, so these ~90 words cover well over a thousand on-screen names.
       Demon, weapon and skin names are NOT here on purpose — they must stay English to match the game. */
    'Abs': 'Abdomen', 'Back': 'Espalda', 'Belt': 'Cinturón', 'Boots': 'Botas',
    'Chest': 'Pecho', 'front': 'frente', 'Front': 'Frente', 'Helmet': 'Casco',
    'Left arm': 'Brazo izquierdo', 'Right arm': 'Brazo derecho', 'Legs': 'Piernas',
    'Shoulders': 'Hombros', 'Suit': 'Traje', 'Fingers': 'Dedos',
    'Left brace': 'Brazalete izquierdo', 'Right brace': 'Brazalete derecho',
    'Cape': 'Capa', 'Face': 'Cara', 'Visor': 'Visor', 'Skin': 'Piel', 'Body': 'Cuerpo',
    'Head': 'Cabeza', 'Eyes': 'Ojos', 'Eye': 'Ojo', 'Hair': 'Pelo', 'Fur': 'Pelaje',
    'Cloth': 'Tela', 'Armor': 'Armadura', 'Armour': 'Armadura', 'Metal': 'Metal',
    'Tongue': 'Lengua', 'Teeth': 'Dientes', 'Arm': 'Brazo', 'Arms': 'Brazos',
    'Leg': 'Pierna', 'Wing': 'Ala', 'Wings': 'Alas', 'Neck': 'Cuello', 'Torso': 'Torso',
    'Tail': 'Cola', 'Horns': 'Cuernos', 'Hands': 'Manos', 'Hand': 'Mano',
    'Leader': 'Líder', 'Boss': 'Jefe', 'Enforcer': 'Ejecutor', 'Base': 'Base',
    'Dress': 'Vestido', 'Skirt': 'Falda', 'Robe': 'Túnica', 'Halo': 'Halo',
    'Mouth': 'Boca', 'Skeleton': 'Esqueleto', 'Glass': 'Cristal', 'Shield': 'Escudo',
    'Weapon': 'Arma', 'Blade': 'Hoja', 'Gem': 'Gema', 'Barrel': 'Cañón',
    'Shell': 'Cartucho', 'Ammo': 'Munición', 'Skull': 'Calavera', 'Sphere': 'Esfera',
    'Pants': 'Pantalones', 'Necklace': 'Collar', 'Corpse': 'Cadáver', 'Cloak': 'Capucha',
    'Veil': 'Velo', 'Gear': 'Equipo', 'Backpack': 'Mochila', 'Saddle': 'Silla',
    'Membranes': 'Membranas', 'Tentacles': 'Tentáculos', 'Tentacle': 'Tentáculo',
    'Broken helmet': 'Casco roto', 'Broken visor': 'Visor roto',
    'Praetor armour': 'Armadura Praetor', 'Praetor arms': 'Brazos Praetor',
    'Praetor limbs': 'Extremidades Praetor', 'Praetor visor': 'Visor Praetor',
    'Praetor visor glass': 'Cristal del visor Praetor',
    'Barbarian arms and legs': 'Brazos y piernas Bárbaro', 'Barbarian cape': 'Capa Bárbaro',
    'Barbarian cape fur': 'Pelaje de la capa Bárbaro', 'Barbarian chest': 'Pecho Bárbaro',
    'Barbarian skin': 'Piel Bárbaro', 'Barbarian visor glass': 'Cristal del visor Bárbaro',
    'Marine arms': 'Brazos del marine',
    'Slayer beard / fur': 'Barba / pelaje del Slayer', 'Slayer eyes': 'Ojos del Slayer',
    'Slayer hair': 'Pelo del Slayer',
    'Zombie arms': 'Brazos zombi', 'Zombie arms & legs': 'Brazos y piernas zombi',
    'Zombie head & tongue': 'Cabeza y lengua zombi', 'Zombie skin': 'Piel zombi',
    'Zombie torso': 'Torso zombi',
    'Shield body': 'Cuerpo del escudo', 'Destroyed shield': 'Escudo destruido',
    'Reforged shield': 'Escudo reforjado', 'Shield debris': 'Restos del escudo',
    '1p': '1.ª p.', '3p': '3.ª p.', '1st person': '1.ª persona', '3rd person': '3.ª persona',
    'default': 'por defecto', 'advanced': 'avanzado', 'exposed arms': 'brazos descubiertos',

    /* ---- Tool headings ---- */
    'WEAPON STAT EDITOR': 'EDITOR DE ESTADÍSTICAS DE ARMAS',
    'HUD SPRITE EDITOR': 'EDITOR DE CARA DEL HUD',
    'MODEL SWAP': 'CAMBIAR MODELO',
    'AI HEALTH EDITOR': 'EDITOR DE VIDA ENEMIGA',
    'Damage mod name': 'Nombre del mod de daño',
    'Face mod name': 'Nombre del mod de cara',
    'Health mod name': 'Nombre del mod de vida',
    'Model mod name': 'Nombre del mod de modelos',
    'Section controls': 'Controles de sección',
    'Recolour this section…': 'Cambiar el color de esta sección…',
    'Randomize options': 'Opciones de aleatorio',
    'Proving Grounds OST': 'Banda sonora de Proving Grounds',
    'Everyday steps for each of the 4 tools, plus how to export & install.':
      'Los pasos habituales de las 4 herramientas, y cómo exportar e instalar.',
    'Package your exported damage mod (opens the Atlan Packager).':
      'Empaqueta tu mod de daño exportado (abre Atlan Packager).',
    'Package your exported face mod (opens the Atlan Packager).':
      'Empaqueta tu mod de cara exportado (abre Atlan Packager).',
    'Package your exported health mod (opens the Atlan Packager).':
      'Empaqueta tu mod de vida exportado (abre Atlan Packager).',
    'Package your exported model mod (opens the Atlan Packager).':
      'Empaqueta tu mod de modelos exportado (abre Atlan Packager).',
    'Save your current health setup as a preset file':
      'Guarda tu configuración de vida actual como archivo',
    'Load a preset file to restore a saved health setup':
      'Carga un archivo para restaurar una configuración de vida guardada',
    'Load a previously exported _Source folder as a preset':
      'Carga como conjunto una carpeta _Source exportada anteriormente',
    'Re-export the loaded mod as a ready .zip, unchanged — drop it straight into mods\\':
      'Reexporta el mod cargado como .zip listo, sin cambios: ponlo directamente en mods\\',
    'Randomly assign tray PNGs to every part in this tab — or random colours in Transparency mode':
      'Asigna al azar los PNG de la bandeja a todas las piezas de esta pestaña, o colores al azar en modo Transparencia',
    'Randomly assign tray PNGs across every tab — or random colours in Transparency mode':
      'Asigna al azar los PNG de la bandeja en todas las pestañas, o colores al azar en modo Transparencia',
    'Randomly assign to each separate texture target in this tab — random colours in Transparency mode':
      'Asigna al azar a cada objetivo de textura de esta pestaña; colores al azar en modo Transparencia',
    'Randomly assign to every separate texture target in all tabs — random colours in Transparency mode':
      'Asigna al azar a cada objetivo de textura de todas las pestañas; colores al azar en modo Transparencia',
    'The ultimate texture modding tool for DOOM: The Dark Ages — made by':
      'La herramienta definitiva de modding de texturas para DOOM: The Dark Ages, creada por',
    'Experimental. Default off. Only changes the exported mod when the slider > 0. Try each style, tell me which looks right.':
      'Experimental. Desactivado por defecto. Solo cambia el mod exportado si el control es > 0. Prueba cada estilo y dime cuál queda bien.',

    /* ---- Part groups & environment sections ---- */
    'Body Armour': 'Armadura', 'Face, Skin & Cape': 'Cara, piel y capa',
    'First-Person Arms': 'Brazos en 1.ª persona', 'Praetor Suit': 'Traje Praetor',
    'Barbarian Suit': 'Traje Bárbaro', 'Melee': 'Cuerpo a cuerpo',
    'Kits': 'Kits', 'Turret': 'Torreta', 'Misc': 'Varios',
    'Classic Marine First-Person Arms': 'Brazos en 1.ª persona del marine clásico',
    'Praetor First-Person Arms': 'Brazos en 1.ª persona Praetor',
    'Atlan body (3rd person)': 'Cuerpo del Atlan (3.ª persona)',
    'Atlan cockpit (1st person)': 'Cabina del Atlan (1.ª persona)',
    'Atlan Royal skin (3rd person)': 'Skin Atlan Real (3.ª persona)',
    'Atlan Weapons': 'Armas del Atlan',
    'Ceilings': 'Techos', 'Floors': 'Suelos', 'Doors': 'Puertas', 'Skies': 'Cielos',
    'Tiles': 'Baldosas', 'Liquids': 'Líquidos', 'Nature': 'Naturaleza', 'Vegetation': 'Vegetación',
    'Decals': 'Calcomanías', 'Explosives': 'Explosivos', 'Switches': 'Interruptores',
    'Objects': 'Objetos', 'Props': 'Accesorios', 'Brick & Stone': 'Ladrillo y piedra',
    'Metal & Support': 'Metal y soportes', 'Wood & Windows': 'Madera y ventanas',
    'Tech & Computer': 'Tecnología y ordenadores', 'Lights & Signs': 'Luces y señales',
    'Steps, Gates & Crates': 'Escalones, puertas y cajas',

    /* ---- Bits the report turned up ---- */
    ', powered by': ', con la tecnología de',
    '& Atlan Tools': 'y Atlan Tools',
    '— see the bar above.': '— mira la barra de arriba.',
    '(F4 toggles)': '(F4 lo activa o desactiva)',
    'Biggie Cheese Presets': 'Conjuntos de Biggie Cheese',
    'PBR Material Presets+': 'Materiales PBR+',
    'Advanced Textures & How It Works': 'Texturas avanzadas y cómo funciona',
    'Add sheet to presets': 'Añadir hoja a los conjuntos',
    'Save added sheets': 'Guardar las hojas añadidas',
    'Each extra variant adds another': 'Cada variante extra añade otra',
    'DEV LOG — actions & errors (press F4 to hide)':
      'REGISTRO DEV — acciones y errores (pulsa F4 para ocultarlo)',

    /* ---- Top bar / navigation ---- */
    'Edit': 'Editar',
    'Create': 'Crear',
    'Load': 'Cargar',
    'Settings': 'Ajustes',
    'Tutorial': 'Tutorial',
    'Current project': 'Proyecto actual',
    'Texture Tool': 'Texturas',
    'Weapon Stats': 'Armas',
    'HUD Sprite': 'Cara del HUD',
    'Model Swap': 'Cambiar modelo',
    'AI Health': 'Vida enemiga',
    'Ultimate Mod Tool': 'Ultimate Mod Tool',
    'Untitled': 'Sin título',
    'No project yet — click to save, export or pick tools':
      'Aún no hay proyecto: haz clic para guardar, exportar o elegir herramientas',

    /* ---- Settings menu ---- */
    'Appearance': 'Apariencia', 'Sound': 'Sonido', 'Modding': 'Modding', 'App': 'Aplicación',
    'This mod': 'Este mod', 'Recent': 'Recientes', 'Advanced': 'Avanzado', 'Basic': 'Básico',
    'Monochrome UI: Off': 'Interfaz monocroma: No',
    'Monochrome UI: On': 'Interfaz monocroma: Sí',
    'Welcome on Startup: Off': 'Pantalla de bienvenida: No',
    'Welcome on Startup: On': 'Pantalla de bienvenida: Sí',
    'Tool colours': 'Colores de las herramientas',
    'Per-tool accent colours': 'Color de acento de cada herramienta',
    'Weapon Stats editor colour': 'Color del editor de armas',
    'HUD Sprite editor colour': 'Color del editor de cara del HUD',
    'AI Health editor colour': 'Color del editor de vida enemiga',
    'Sound Settings': 'Ajustes de sonido',
    'Sound options — startup sound, music autoplay, background music':
      'Opciones de sonido: sonido de inicio, música automática, música de fondo',
    'Master Sound: On': 'Sonido general: Sí', 'Master Sound: Off': 'Sonido general: No',
    'Startup Sound: On': 'Sonido de inicio: Sí', 'Startup Sound: Off': 'Sonido de inicio: No',
    'Music Autoplay: On': 'Música automática: Sí', 'Music Autoplay: Off': 'Música automática: No',
    'Background Music: On': 'Música de fondo: Sí', 'Background Music: Off': 'Música de fondo: No',
    'Error / Confirm Sounds: On': 'Sonidos de aviso: Sí',
    'Error / Confirm Sounds: Off': 'Sonidos de aviso: No',
    'Play the DOOM sound when the app starts': 'Reproducir el sonido de DOOM al abrir la aplicación',
    'Start the music automatically on launch': 'Iniciar la música automáticamente al abrir',
    'Keep the music playing when the app is minimised or another window is focused':
      'Seguir reproduciendo la música cuando la aplicación esté minimizada o en segundo plano',
    'Switch the UI to a monochrome (grey) theme': 'Cambiar la interfaz a un tema monocromo (gris)',
    'Folders & locations': 'Carpetas y ubicaciones',
    'Set or change your export folder and your Atlan Packager / Loader / mods-folder locations.':
      'Define o cambia tu carpeta de exportación y las rutas de Atlan Packager / Loader / carpeta mods.',
    'Tutorial & Guide': 'Tutorial y guía',
    'Open the written guide, or replay the interactive walkthrough':
      'Abre la guía escrita o repite el recorrido interactivo',
    'Written guide + the interactive walkthrough': 'Guía escrita y recorrido interactivo',
    'Interactive walkthrough': 'Recorrido interactivo',
    'Guide level:': 'Nivel de la guía:',
    'Mod Buddy: On': 'Mod Buddy: Sí', 'Mod Buddy: Off': 'Mod Buddy: No',
    'Report a bug': 'Informar de un fallo',
    'Report a *bug* or request a *feature*': 'Informa de un *fallo* o pide una *función*',
    'Credits & Thanks': 'Créditos y agradecimientos',
    'Credits & thanks to the mod authors this tool builds on.':
      'Créditos y agradecimientos a los autores de mods en los que se apoya esta herramienta.',
    'Reload': 'Recargar', 'Force Reload (reset)': 'Recarga forzada (reiniciar)', 'Quit': 'Salir',
    'Language': 'Idioma', 'Change the language of the interface': 'Cambiar el idioma de la interfaz',
    'Language: English': 'Idioma: Inglés',
    'Save project': 'Guardar proyecto', 'Export mod': 'Exportar mod', 'Rename…': 'Renombrar…',
    'New random name': 'Nombre aleatorio', 'Edit tools & categories…': 'Editar herramientas y categorías…',
    'Write .decl files: Yes': 'Escribir archivos .decl: Sí',
    'Write .decl files: No': 'Escribir archivos .decl: No',
    'Advanced textures (F2): Off': 'Texturas avanzadas (F2): No',
    'Advanced textures (F2): On': 'Texturas avanzadas (F2): Sí',
    'Advanced Texture Options': 'Opciones de textura avanzadas',
    'Unlock per-part PBR channels (shine / metal / glow) for advanced skins':
      'Desbloquea los canales PBR por pieza (brillo / metal / luz) para skins avanzadas',
    'Import quality: Lossless': 'Calidad de importación: Sin pérdida',
    'Import quality: Editable': 'Calidad de importación: Editable',
    'Imported mod export': 'Exportación de mods importados',
    'Export texture aliases only, no .decl files — for kits that ship their own. Glow, transparency, eyes and hair stop working while this is on.':
      'Exporta solo los alias de textura, sin archivos .decl, para kits que traen los suyos. La luz, la transparencia, los ojos y el pelo dejan de funcionar mientras esté activado.',
    'Lossless = the exact original textures, but you can\'t edit them. Editable = decoded layers you can tweak, at lower resolution.':
      'Sin pérdida = las texturas originales exactas, pero no se pueden editar. Editable = capas decodificadas que puedes retocar, a menor resolución.',
    'Settings — fonts, music, theme and app options':
      'Ajustes: fuentes, música, tema y opciones de la aplicación',
    'Show this when I start': 'Mostrar esto al iniciar',
    'Show / hide the randomize options': 'Mostrar u ocultar las opciones de aleatorio',
    'Show the glow controls on the texture page': 'Mostrar los controles de luz en la página de texturas',
    'Show alignment grid': 'Mostrar la cuadrícula de alineación',
    'Toggle edit mode to rename or move parts': 'Activa el modo edición para renombrar o mover piezas',
    'Hide this from the tool (dev only — Edit ▸ Show hidden brings it back)':
      'Ocultar esto de la herramienta (solo dev: Editar ▸ Mostrar ocultos lo devuelve)',

    /* ---- Left column / trays ---- */
    'PNG Tray': 'Bandeja de PNG', 'Add PNGs': 'Añadir PNG',
    'Upload once, then drag textures onto parts, enemy cards, or the fill-tab box. Randomize uses this tray.':
      'Súbelos una vez y arrastra las texturas a las piezas, a las tarjetas de enemigos o a la casilla de rellenar pestaña. El aleatorio usa esta bandeja.',
    'Transparency Tray': 'Bandeja de transparencias',
    'Ready-made see-through looks. Click one to apply it — to the part or section you have selected, or to the whole category if nothing is selected.':
      'Estilos transparentes ya preparados. Haz clic en uno para aplicarlo a la pieza o sección seleccionada, o a toda la categoría si no hay nada seleccionado.',
    'Surprise me': 'Sorpréndeme', 'Roll a brand-new random look': 'Genera un estilo nuevo al azar',
    'Clear this category': 'Restablecer esta categoría',
    'Make every part in this category solid again': 'Volver a hacer sólidas todas las piezas de esta categoría',
    'SirBiggieCheese Preset Camos': 'Camuflajes de SirBiggieCheese',
    'Built-in SirBiggieCheese camo presets': 'Camuflajes incluidos de SirBiggieCheese',
    'Add all camos to PNG Tray': 'Añadir todos los camuflajes a la bandeja',
    'Add selected camos to PNG Tray': 'Añadir los camuflajes seleccionados a la bandeja',
    'Add the ticked camos from your folders to the PNG tray':
      'Añade a la bandeja los camuflajes marcados de tus carpetas',
    'Add the ticked SirBiggieCheese camos to your PNG tray':
      'Añade a tu bandeja los camuflajes marcados de SirBiggieCheese',
    'Delete selected camos': 'Eliminar los camuflajes seleccionados',
    'Delete the ticked camos from your folders': 'Elimina de tus carpetas los camuflajes marcados',
    'Hide the ticked built-in camos (local only)': 'Oculta los camuflajes incluidos marcados (solo local)',
    'Upload camos to SirBiggieCheese': 'Subir camuflajes a SirBiggieCheese',
    'Upload your own PNGs into the SirBiggieCheese preset list':
      'Sube tus propios PNG a la lista de SirBiggieCheese',
    'Add Your Own Preset': 'Añadir tu propio conjunto',
    'Create preset folder / upload camos': 'Crear carpeta de camuflajes / subir camuflajes',
    'Create a named preset folder, then add individual camo PNGs into it.':
      'Crea una carpeta con nombre y añade dentro los PNG de camuflaje.',
    'Create and manage your own camo preset folders':
      'Crea y gestiona tus propias carpetas de camuflajes',
    'Name a new preset folder and upload camos into it':
      'Pon nombre a una carpeta nueva y sube camuflajes dentro',
    'PBR Material Presets': 'Materiales PBR',
    'Save material': 'Guardar material', 'Material name (e.g. Chrome)': 'Nombre del material (p. ej. Cromo)',
    'No materials yet. Drop layers above, name it, and Save — then drag it onto any part.':
      'Aún no hay materiales. Suelta capas arriba, ponle nombre y guarda; luego arrástralo a cualquier pieza.',
    'Import mod folder (all layers)': 'Importar carpeta de mod (todas las capas)',
    'Load a Slayer Kit mod folder — click to pick one, or drag it here':
      'Carga una carpeta de mod del Slayer Kit: haz clic para elegirla o arrástrala aquí',
    'Re-package loaded mod (lossless)': 'Reempaquetar el mod cargado (sin pérdida)',
    'Drag a camo onto a part, a Fill box, a PBR channel, or the PNG tray — or use':
      'Arrastra un camuflaje a una pieza, a una casilla de relleno, a un canal PBR o a la bandeja, o usa',
    'Your Presets': 'Tus conjuntos', 'Albedo': 'Albedo', 'Specular': 'Especular',
    'Colour': 'Color', 'Smooth': 'Suavizado',

    /* ---- Modes, sliders, transparency ---- */
    'Standard PNG': 'PNG normal',
    'Standard PNG mode — paint parts with your own texture PNGs (with optional glow sliders below).':
      'Modo PNG normal: pinta las piezas con tus propias texturas PNG.',
    'Transparency + Animation': 'Transparencia y animación',
    'Make parts see-through, glowing and animated instead of painting them.':
      'Haz las piezas transparentes, brillantes y animadas en vez de pintarlas.',
    'Transparency style': 'Estilo de transparencia',
    'Opacity': 'Opacidad', 'Brightness': 'Brillo', 'Speed': 'Velocidad', 'Animation': 'Animación',
    'Editing': 'Editando', 'Nothing selected': 'Nada seleccionado', 'Whole section': 'Sección completa',
    'Glow': 'Luz', 'Glow sliders': 'Controles de luz', 'Total': 'Total',
    'Weapons': 'Armas', 'Enemies': 'Enemigos', 'Set all': 'Ajustar todo', 'Default': 'Por defecto',
    'changed': 'modificado', 'Test': 'Prueba', 'Hex colour': 'Color hexadecimal',
    'How *see-through* the part is — lower is more transparent.':
      'Cómo de *transparente* es la pieza: menos es más transparente.',
    'How *brightly* the part glows. 0 = tint only.': 'Cuánto *brilla* la pieza. 0 = solo color.',
    'How *fast* the animation moves. *1* = default.':
      'Cómo de *rápido* se mueve la animación. *1* = por defecto.',
    'The *animation style*. *Static* = no motion, *Disabled* = none at all.':
      'El *estilo de animación*. *Estático* = sin movimiento, *Desactivado* = ninguna.',
    'Static (default)': 'Estático (por defecto)', 'Smoke': 'Humo', 'Drift': 'Deriva',
    'Swirl': 'Remolino', 'Streaks': 'Franjas', 'Disabled (no animation)': 'Desactivado (sin animación)',
    'Alpha (plain blend)': 'Alfa (mezcla simple)', 'Glass / refraction': 'Cristal / refracción',
    'Hologram (shield-style)': 'Holograma (estilo escudo)',
    'Weird glow (experimental)': 'Luz extraña (experimental)',
    'Master glow on/off': 'Luz general activada/desactivada',
    'Master glow on/off (emissive / bloom)': 'Luz general activada/desactivada (emisiva / bloom)',
    'Controls the overall glow for everything at once': 'Controla la luz general de todo a la vez',
    'Controls the glow on armour parts': 'Controla la luz de las piezas de armadura',
    'Controls the glow on weapons': 'Controla la luz de las armas',
    'Controls the glow on enemies': 'Controla la luz de los enemigos',
    'Controls the glow on skin & face': 'Controla la luz de la piel y la cara',
    'Make this category transparent': 'Hacer transparente esta categoría',
    'Make this section transparent': 'Hacer transparente esta sección',
    'Make every part in this category see-through': 'Hacer transparentes todas las piezas de esta categoría',
    'Make every part in this section see-through': 'Hacer transparentes todas las piezas de esta sección',
    'Apply to category': 'Aplicar a la categoría', 'Apply to section': 'Aplicar a la sección',
    'Apply the chosen colour to every part in this category':
      'Aplica el color elegido a todas las piezas de esta categoría',
    'Apply this colour to every part in this section':
      'Aplica este color a todas las piezas de esta sección',
    'Choose a colour for every part in this category': 'Elige un color para todas las piezas de esta categoría',
    'Choose a colour for every part in this section': 'Elige un color para todas las piezas de esta sección',
    'Recolour this category…': 'Cambiar el color de esta categoría…',
    'Category controls': 'Controles de categoría',
    'Acts on *every part in this category* (the current tab)':
      'Actúa sobre *todas las piezas de esta categoría* (la pestaña actual)',
    'Acts on *every part in this section*': 'Actúa sobre *todas las piezas de esta sección*',
    'See-through': 'Transparente', 'Pick a colour': 'Elige un color',
    'Type or paste a hex colour, e.g. #7D3CFF': 'Escribe o pega un color hexadecimal, p. ej. #7D3CFF',
    'Click a *section* or a *part* to select it — the sliders then edit only that.':
      'Haz clic en una *sección* o una *pieza* para seleccionarla; los controles editarán solo eso.',
    'Click a section or a part to select it': 'Haz clic en una sección o una pieza para seleccionarla',
    'Clear the selection and go back to editing the defaults':
      'Quita la selección y vuelve a editar los valores por defecto',

    /* ---- Parts area / randomize / export ---- */
    'click / drop PNG': 'clic / suelta un PNG',
    'Drag PNG Here to Fill Section': 'Arrastra un PNG aquí para rellenar la sección',
    'Drag PNG here to fill current tab': 'Arrastra un PNG aquí para rellenar la pestaña actual',
    'Drop a PNG here to apply it to all parts in the current tab':
      'Suelta un PNG aquí para aplicarlo a todas las piezas de la pestaña actual',
    'This tab': 'Esta pestaña', 'This tab, targets': 'Esta pestaña, objetivos',
    'All tabs': 'Todas las pestañas', 'All tabs, targets': 'Todas las pestañas, objetivos',
    'Randomize every part on the current tab': 'Aleatoriza todas las piezas de la pestaña actual',
    'Randomize each separate texture target on the current tab':
      'Aleatoriza cada objetivo de textura de la pestaña actual',
    'Randomize every part on every tab': 'Aleatoriza todas las piezas de todas las pestañas',
    'Randomize every separate texture target on every tab':
      'Aleatoriza cada objetivo de textura de todas las pestañas',
    'Undo': 'Deshacer', 'Undo the last change': 'Deshacer el último cambio',
    'Undo the last change — *Ctrl+Z*': 'Deshacer el último cambio — *Ctrl+Z*',
    'Clear all': 'Borrar todo', 'Clear every assigned part': 'Borra todas las piezas asignadas',
    'Save': 'Guardar', 'parts assigned': 'piezas asignadas',
    'Click to see what you\'ve changed': 'Haz clic para ver lo que has cambiado',
    'Export': 'Exportar', 'Export mod folder': 'Exportar carpeta del mod',
    'Export & package': 'Exportar y empaquetar', 'Export & Install': 'Exportar e instalar',
    'Export the mod folder, ready for the Atlan Mod Packager':
      'Exporta la carpeta del mod, lista para Atlan Mod Packager',
    'Exporting mod folder': 'Exportando la carpeta del mod',
    'Preparing files...': 'Preparando archivos…', 'Packaging…': 'Empaquetando…',
    'Package': 'Empaquetar',
    'Package your exported mod (opens the Atlan Packager)': 'Empaqueta tu mod exportado (abre Atlan Packager)',
    'Package your exported mod (opens the Atlan Packager).': 'Empaqueta tu mod exportado (abre Atlan Packager).',
    'Load & Launch': 'Cargar e iniciar',
    'Load your mods and launch the game (Atlan Mod Loader)': 'Carga tus mods e inicia el juego (Atlan Mod Loader)',
    'Load your mods and launch the game (Atlan Mod Loader).': 'Carga tus mods e inicia el juego (Atlan Mod Loader).',
    'Load your mods and launch the game.': 'Carga tus mods e inicia el juego.',
    'Mod name': 'Nombre del mod', 'New name': 'Nombre nuevo',
    'Generate a fresh export name': 'Genera un nombre nuevo',
    'Generate a fresh random export name': 'Genera un nombre aleatorio nuevo',
    'Load mod folder': 'Cargar carpeta de mod', 'Load preset': 'Cargar conjunto',
    'Choose export folder': 'Elige la carpeta de exportación',
    'Open an *existing mod folder* (or drag one onto this button)':
      'Abre una *carpeta de mod existente* (o arrastra una a este botón)',
    'Save this mod so you can *reopen it later* — find it under the mod name ▸ Recent':
      'Guarda este mod para *reabrirlo más tarde*: lo encontrarás en el nombre del mod ▸ Recientes',
    'Start a *new mod* — choose which tools it uses':
      'Empieza un *mod nuevo*: elige qué herramientas usa',
    'Unload this mod': 'Descargar este mod',
    'Search all parts…': 'Buscar piezas…', 'Search enemies…': 'Buscar enemigos…',
    'Search faces…': 'Buscar caras…', 'Search weapons…': 'Buscar armas…',
    'Search parts across all tabs by name': 'Busca piezas por nombre en todas las pestañas',
    'Search parts': 'Buscar piezas',

    /* ---- Tabs / categories ---- */
    'Slayer': 'Slayer', 'Guns': 'Armas de fuego', 'Melee & Shield': 'Cuerpo a cuerpo y escudo',
    'Melee Weapons': 'Armas cuerpo a cuerpo', 'Melee weapons': 'Armas cuerpo a cuerpo',
    'Ranged weapons': 'Armas a distancia', 'Demons': 'Demonios', 'Demon enemies': 'Enemigos demoníacos',
    'Bosses & Large': 'Jefes y grandes', 'Bosses & large enemies': 'Jefes y enemigos grandes',
    'Projectiles': 'Proyectiles', 'Projectile & ammo materials': 'Materiales de proyectiles y munición',
    'Campaign Environment': 'Entorno de campaña',
    'Campaign world environment surfaces': 'Superficies del entorno de la campaña',
    'Classic Environment': 'Entorno clásico',
    'Classic-DOOM environment surfaces': 'Superficies del entorno del DOOM clásico',
    'Atlan / Dragon': 'Atlan / Dragón', 'Atlan mech parts & weapons': 'Piezas y armas del mech Atlan',
    'Sentinels & NPCs': 'Centinelas y PNJ', 'Sentinels & NPC characters': 'Centinelas y personajes PNJ',
    'Extras / Unknown (identify later)': 'Extras / Desconocidos (identificar luego)',
    'Doom Slayer armour, arms, face, cape & suits':
      'Armadura, brazos, cara, capa y trajes del Doom Slayer',
    'Only skin certain categories?': '¿Solo quieres personalizar ciertas categorías?',
    'Add more categories to this mod': 'Añadir más categorías a este mod',
    'Pick the tools this mod needs — you can add more later.':
      'Elige las herramientas que necesita este mod; puedes añadir más luego.',
    'Choose which tools this mod uses (untick to remove)':
      'Elige qué herramientas usa este mod (desmarca para quitarlas)',
    'Remove this tool from the mod': 'Quitar esta herramienta del mod',
    'Add another tool to this mod': 'Añadir otra herramienta a este mod',
    'Slayer skin:': 'Skin del Slayer:', 'Shield skin:': 'Skin del escudo:',
    'Slayer skin: Default': 'Skin del Slayer: Por defecto',
    'Shield skin: Default': 'Skin del escudo: Por defecto',
    'Base Slayer — the classic look': 'Slayer base: el aspecto clásico',
    'Base shield — use the “Shield” section below.': 'Escudo base: usa la sección «Escudo» de abajo.',

    /* ---- Other tools ---- */
    'Weapon Stat Editor': 'Editor de estadísticas de armas',
    'Weapon Stat Editor — tweak damage, fire rate, ammo & range, then export a mod (beta)':
      'Editor de estadísticas de armas: ajusta daño, cadencia, munición y alcance, y exporta un mod (beta)',
    'Damage, fire rate, ammo & range': 'Daño, cadencia, munición y alcance',
    'Damage, Fire Rate, Ammo or Range': 'Daño, cadencia, munición o alcance',
    'Weapon Damage': 'Daño del arma', 'Weapons Fire Rate': 'Cadencia de disparo',
    'Ammo Capacity': 'Capacidad de munición', 'Weapon Range': 'Alcance del arma',
    'Projectile Speed': 'Velocidad del proyectil',
    'Move Speed While Firing': 'Velocidad de movimiento al disparar',
    'Pick a stat section —': 'Elige una sección de estadísticas:',
    'Set every weapon in this section': 'Ajusta todas las armas de esta sección',
    'Randomize every weapon in this section': 'Aleatoriza todas las armas de esta sección',
    'Reset this whole section to vanilla': 'Restablece toda esta sección al original',
    'Reset this one to vanilla': 'Restablece esta al original',
    'Save your current slider setup as a preset file':
      'Guarda tu configuración actual como archivo de ajustes',
    'Load a preset file to restore a saved slider setup':
      'Carga un archivo para restaurar una configuración guardada',
    'HUD Sprite Editor': 'Editor de cara del HUD',
    'Replace the Doomguy HUD face': 'Sustituye la cara del Doomguy en el HUD',
    'Drop sheet': 'Suelta la hoja', 'No sheet': 'Sin hoja', 'No sheet loaded.': 'No hay ninguna hoja cargada.',
    'Drag your sprite-sheet PNG here, or click to browse':
      'Arrastra aquí tu hoja de sprites PNG, o haz clic para buscarla',
    '11 columns × 5 rows of faces · transparent background':
      '11 columnas × 5 filas de caras · fondo transparente',
    'AI prompt': 'Texto para IA',
    'Copy a ready-made prompt for an AI image generator, set up for this sheet layout':
      'Copia un texto listo para un generador de imágenes por IA, preparado para este formato de hoja',
    'Auto-center sprites': 'Centrar sprites automáticamente',
    'Re-centre each face in its grid cell': 'Vuelve a centrar cada cara en su celda',
    'Auto-make zombie (green) variant': 'Crear variante zombi (verde) automáticamente',
    'Also replace hologram face style': 'Sustituir también el estilo de cara de holograma',
    'Adds a second HUD texture — package this one on its own':
      'Añade una segunda textura de HUD: empaquétala por separado',
    'Adds two more HUD textures — package these on their own':
      'Añade dos texturas de HUD más: empaquétalas por separado',
    'Save current sheet': 'Guardar la hoja actual', 'Add your own preset': 'Añadir tu propia hoja',
    'Save this sheet as a preset': 'Guarda esta hoja como conjunto',
    'Undo the last sheet change': 'Deshacer el último cambio de la hoja',
    'Load a sheet, then “Save current sheet” to reuse it here.':
      'Carga una hoja y pulsa «Guardar la hoja actual» para reutilizarla aquí.',
    'Pick your own mugshot sheet PNG(s) to add to Your Presets':
      'Elige tus propias hojas PNG para añadirlas a Tus conjuntos',
    'Give a weapon a different model': 'Dale a un arma un modelo distinto',
    'Give any weapon a different model from the game’s own set. Only weapons you change are exported.':
      'Dale a cualquier arma un modelo distinto de los que ya trae el juego. Solo se exportan las armas que cambies.',
    'Give every weapon in this section a random model':
      'Da un modelo aleatorio a todas las armas de esta sección',
    'Put this whole section back to its original models':
      'Devuelve toda esta sección a sus modelos originales',
    'Back to the original model': 'Volver al modelo original',
    'Save your swaps as a preset file': 'Guarda tus cambios como archivo de ajustes',
    'Load a saved set of swaps': 'Carga un conjunto de cambios guardado',
    'AI Health Editor': 'Editor de vida enemiga',
    'How much health each demon has': 'Cuánta vida tiene cada demonio',
    'Set a multiplier for any enemy (1.0 = vanilla) and its health updates beside the slider. Only enemies you change are exported.':
      'Pon un multiplicador a cualquier enemigo (1,0 = original) y su vida se actualiza junto al control. Solo se exportan los enemigos que cambies.',

    /* ---- Buttons / dialogs / misc ---- */
    /* NOTE: no 'Back' here on purpose — it is a body part (see the part words above). The walkthrough's
       button was renamed "Previous" so the two meanings stop fighting over one key. */
    'Cancel': 'Cancelar', 'OK': 'Aceptar', 'Skip': 'Omitir', 'Next': 'Siguiente', 'Previous': 'Anterior',
    'Close': 'Cerrar', 'Got it': 'Entendido', 'Yes': 'Sí', 'No': 'No', 'Hide': 'Ocultar',
    'Apply to all': 'Aplicar a todo', 'Clear them': 'Restablecerlas', 'All': 'Todo', 'None': 'Ninguno',
    'All of it': 'Todo', 'Send': 'Enviar', 'Note': 'Nota', 'Move Section': 'Mover sección',
    'Pick options': 'Elegir opciones', 'Yes, pick it': 'Sí, elegirla', 'No, change it': 'No, cambiarla',
    'Volume': 'Volumen', 'Play the *Proving Grounds* theme': 'Reproduce el tema *Proving Grounds*',
    'Pre-release build — version and build id': 'Versión preliminar: versión e id de compilación',
    'Setup required.': 'Falta configurar.', 'No camos': 'Sin camuflajes', '(optional)': '(opcional)',
    'Choose extracted folder…': 'Elige la carpeta extraída…',
    'This tool needs the game\'s own enemy files': 'Esta herramienta necesita los archivos de enemigos del juego',
    '(actions & errors appear here)': '(las acciones y los errores aparecen aquí)',
    'Start here': 'Empieza aquí',
    'Reskin the Slayer, weapons, demons & more': 'Cambia el aspecto del Slayer, las armas, los demonios y más',
    'Texture Tool — build texture & transparency mods (you are here)':
      'Herramienta de texturas: crea mods de textura y transparencia (estás aquí)',
    'What would you like to make?': '¿Qué te gustaría crear?',
    'e.g. make my whole loadout look like lava': 'p. ej. haz que todo mi equipo parezca lava',
    'Hide the buddy (bring him back in Settings)': 'Ocultar al ayudante (puedes recuperarlo en Ajustes)',
    'Show or hide the Mod Buddy helper in the bottom-right corner':
      'Muestra u oculta al ayudante Mod Buddy en la esquina inferior derecha',

    /* ---- Mod Buddy: nudges, greetings, idle lines ---- */
    'Click me if you get stuck.': 'Haz clic si te atascas.',
    'Need a hand? Just click me.': '¿Necesitas ayuda? Haz clic.',
    'Click me and tell me what you want to make.': 'Haz clic y dime qué quieres crear.',
    'Stuck for an idea? Click me.': '¿Sin ideas? Haz clic.',
    'Want help designing something? Click me.': '¿Quieres ayuda con un diseño? Haz clic.',
    'New operator detected. So... You’re the one they assigned me to?':
      'Nuevo operador detectado. Así que… ¿tú eres a quien me han asignado?',
    'New operator detected. I assume one of us knows what we’re doing.':
      'Nuevo operador detectado. Supongo que uno de los dos sabe lo que hace.',
    'You’re back. I was beginning to enjoy the silence.':
      'Has vuelto. Empezaba a disfrutar del silencio.',
    'Welcome back. Nothing caught fire.': 'Bienvenido de nuevo. Nada se ha incendiado.',
    'There you are. I was running out of things to judge.':
      'Ahí estás. Me estaba quedando sin cosas que juzgar.',
    'Back again. Good. I was getting suspicious.': 'Otra vez aquí. Bien. Empezaba a sospechar.',
    'Ready when you are. I’ve waited longer.': 'Cuando quieras. He esperado más tiempo.',
    'You returned. The campaign continues.': 'Has regresado. La campaña continúa.',
    'Good. Something might finally happen.': 'Bien. Puede que por fin pase algo.',
    'You’re here. Try not to break anything immediately.':
      'Ya estás aquí. Intenta no romper nada de inmediato.',
    'Welcome back. I remain inexplicably employed.':
      'Bienvenido de nuevo. Sigo inexplicablemente empleado.',
    'Ah. My operator has returned.': 'Ah. Mi operador ha vuelto.',
    'Kreed put a Tether on me once. This is less restrictive.':
      'Kreed me puso una Atadura una vez. Esto es menos restrictivo.',
    'I spent centuries becoming Hell’s greatest fear. Now I wait for Export.':
      'Pasé siglos convirtiéndome en el mayor temor del Infierno. Ahora espero a que exporte.',
    'The war lasted generations. I assume this loading bar is nearly done.':
      'La guerra duró generaciones. Supongo que esta barra de carga ya casi termina.',
    'I was bound to serve gods and kings. “Desktop assistant” was not discussed.':
      'Fui obligado a servir a dioses y reyes. «Asistente de escritorio» no se mencionó.',
    'Rip and tear, until it is done. Then save. Definitely save.':
      'Desgarra y destroza, hasta que esté hecho. Y luego guarda. Guarda, en serio.',
    'Somewhere, a demon is having a significantly worse day than you.':
      'En algún lugar, un demonio está teniendo un día bastante peor que el tuyo.',
    'You have been staring at this menu for some time. Tactical contemplation, presumably.':
      'Llevas un buen rato mirando este menú. Contemplación táctica, supongo.',
    'This pause has gone on long enough to become tactical.':
      'Esta pausa ya ha durado lo suficiente como para ser táctica.',
    'I once killed a Titan with my bare hands. You’re currently adjusting a slider.':
      'Una vez maté a un Titán con mis manos. Tú estás ajustando un control deslizante.',
    'I remember when decisions were made with steel.':
      'Recuerdo cuando las decisiones se tomaban con acero.',
    'Many great things depended on me once. Now it only appears to be this button.':
      'Grandes cosas dependieron de mí en su día. Ahora solo parece ser este botón.'
  },

  /* ======================================================================== */
  fr: {
    __name__: 'Français',

    /* ---- PATTERNS — see the Spanish block above for what these are for. ---- */
    __patterns__: [
      [/^(\d+) sections? \/ (\d+) texture targets?$/, '$1 sections / $2 cibles de texture'],
      [/^(\d+) of (\d+) weapons?$/,                   '$1 armes sur $2'],
      [/^(\d+) weapons?$/,                            '$1 armes'],
      [/^(\d+) parts?$/,                              '$1 pièces'],
      [/^(\d+) part\(s\)$/,                           '$1 pièce(s)'],
      [/^1st-person arms — (.+)$/,                    'Bras à la 1re personne — $1'],
      [/^3rd-person body armour — (.+)$/,             'Armure à la 3e personne — $1'],
      [/^Shield Skin — (.+)$/,                        'Skin du bouclier — $1'],
      [/^Slayer skin — (.+)$/,                        'Skin du Slayer — $1'],
      [/^Dragon — (.+)$/,                             'Dragon — $1']
    ],

    /* ---- PART & TARGET WORDS — see the Spanish block above for how these compose. ---- */
    'Abs': 'Abdomen', 'Back': 'Dos', 'Belt': 'Ceinture', 'Boots': 'Bottes',
    'Chest': 'Torse', 'front': 'avant', 'Front': 'Avant', 'Helmet': 'Casque',
    'Left arm': 'Bras gauche', 'Right arm': 'Bras droit', 'Legs': 'Jambes',
    'Shoulders': 'Épaules', 'Suit': 'Combinaison', 'Fingers': 'Doigts',
    'Left brace': 'Brassard gauche', 'Right brace': 'Brassard droit',
    'Cape': 'Cape', 'Face': 'Visage', 'Visor': 'Visière', 'Skin': 'Peau', 'Body': 'Corps',
    'Head': 'Tête', 'Eyes': 'Yeux', 'Eye': 'Œil', 'Hair': 'Cheveux', 'Fur': 'Fourrure',
    'Cloth': 'Tissu', 'Armor': 'Armure', 'Armour': 'Armure', 'Metal': 'Métal',
    'Tongue': 'Langue', 'Teeth': 'Dents', 'Arm': 'Bras', 'Arms': 'Bras',
    'Leg': 'Jambe', 'Wing': 'Aile', 'Wings': 'Ailes', 'Neck': 'Cou', 'Torso': 'Torse',
    'Tail': 'Queue', 'Horns': 'Cornes', 'Hands': 'Mains', 'Hand': 'Main',
    'Leader': 'Chef', 'Boss': 'Boss', 'Enforcer': 'Exécuteur', 'Base': 'Base',
    'Dress': 'Robe', 'Skirt': 'Jupe', 'Robe': 'Toge', 'Halo': 'Halo',
    'Mouth': 'Bouche', 'Skeleton': 'Squelette', 'Glass': 'Verre', 'Shield': 'Bouclier',
    'Weapon': 'Arme', 'Blade': 'Lame', 'Gem': 'Gemme', 'Barrel': 'Canon',
    'Shell': 'Cartouche', 'Ammo': 'Munitions', 'Skull': 'Crâne', 'Sphere': 'Sphère',
    'Pants': 'Pantalon', 'Necklace': 'Collier', 'Corpse': 'Cadavre', 'Cloak': 'Cape',
    'Veil': 'Voile', 'Gear': 'Équipement', 'Backpack': 'Sac à dos', 'Saddle': 'Selle',
    'Membranes': 'Membranes', 'Tentacles': 'Tentacules', 'Tentacle': 'Tentacule',
    'Broken helmet': 'Casque brisé', 'Broken visor': 'Visière brisée',
    'Praetor armour': 'Armure Praetor', 'Praetor arms': 'Bras Praetor',
    'Praetor limbs': 'Membres Praetor', 'Praetor visor': 'Visière Praetor',
    'Praetor visor glass': 'Verre de la visière Praetor',
    'Barbarian arms and legs': 'Bras et jambes Barbare', 'Barbarian cape': 'Cape Barbare',
    'Barbarian cape fur': 'Fourrure de la cape Barbare', 'Barbarian chest': 'Torse Barbare',
    'Barbarian skin': 'Peau Barbare', 'Barbarian visor glass': 'Verre de la visière Barbare',
    'Marine arms': 'Bras du marine',
    'Slayer beard / fur': 'Barbe / fourrure du Slayer', 'Slayer eyes': 'Yeux du Slayer',
    'Slayer hair': 'Cheveux du Slayer',
    'Zombie arms': 'Bras zombie', 'Zombie arms & legs': 'Bras et jambes zombie',
    'Zombie head & tongue': 'Tête et langue zombie', 'Zombie skin': 'Peau zombie',
    'Zombie torso': 'Torse zombie',
    'Shield body': 'Corps du bouclier', 'Destroyed shield': 'Bouclier détruit',
    'Reforged shield': 'Bouclier reforgé', 'Shield debris': 'Débris du bouclier',
    '1p': '1re p.', '3p': '3e p.', '1st person': '1re personne', '3rd person': '3e personne',
    'default': 'par défaut', 'advanced': 'avancé', 'exposed arms': 'bras découverts',

    /* ---- Tool headings ---- */
    'WEAPON STAT EDITOR': 'ÉDITEUR DE STATISTIQUES D’ARMES',
    'HUD SPRITE EDITOR': 'ÉDITEUR DE VISAGE ATH',
    'MODEL SWAP': 'CHANGER DE MODÈLE',
    'AI HEALTH EDITOR': 'ÉDITEUR DE VIE DES ENNEMIS',
    'Damage mod name': 'Nom du mod de dégâts',
    'Face mod name': 'Nom du mod de visage',
    'Health mod name': 'Nom du mod de vie',
    'Model mod name': 'Nom du mod de modèles',
    'Section controls': 'Commandes de section',
    'Recolour this section…': 'Recolorer cette section…',
    'Randomize options': 'Options d’aléatoire',
    'Proving Grounds OST': 'Bande originale de Proving Grounds',
    'Everyday steps for each of the 4 tools, plus how to export & install.':
      'Les étapes courantes des 4 outils, et comment exporter et installer.',
    'Package your exported damage mod (opens the Atlan Packager).':
      'Empaquette votre mod de dégâts exporté (ouvre Atlan Packager).',
    'Package your exported face mod (opens the Atlan Packager).':
      'Empaquette votre mod de visage exporté (ouvre Atlan Packager).',
    'Package your exported health mod (opens the Atlan Packager).':
      'Empaquette votre mod de vie exporté (ouvre Atlan Packager).',
    'Package your exported model mod (opens the Atlan Packager).':
      'Empaquette votre mod de modèles exporté (ouvre Atlan Packager).',
    'Save your current health setup as a preset file':
      'Enregistre vos réglages de vie actuels dans un fichier',
    'Load a preset file to restore a saved health setup':
      'Charge un fichier pour restaurer des réglages de vie enregistrés',
    'Load a previously exported _Source folder as a preset':
      'Charge comme lot un dossier _Source exporté précédemment',
    'Re-export the loaded mod as a ready .zip, unchanged — drop it straight into mods\\':
      'Ré-exporte le mod chargé en .zip prêt à l’emploi, inchangé — déposez-le directement dans mods\\',
    'Randomly assign tray PNGs to every part in this tab — or random colours in Transparency mode':
      'Attribue au hasard les PNG du bac à toutes les pièces de cet onglet, ou des couleurs au hasard en mode Transparence',
    'Randomly assign tray PNGs across every tab — or random colours in Transparency mode':
      'Attribue au hasard les PNG du bac sur tous les onglets, ou des couleurs au hasard en mode Transparence',
    'Randomly assign to each separate texture target in this tab — random colours in Transparency mode':
      'Attribue au hasard à chaque cible de texture de cet onglet ; couleurs au hasard en mode Transparence',
    'Randomly assign to every separate texture target in all tabs — random colours in Transparency mode':
      'Attribue au hasard à chaque cible de texture de tous les onglets ; couleurs au hasard en mode Transparence',
    'The ultimate texture modding tool for DOOM: The Dark Ages — made by':
      'L’outil de modding de textures ultime pour DOOM: The Dark Ages, créé par',
    'Experimental. Default off. Only changes the exported mod when the slider > 0. Try each style, tell me which looks right.':
      'Expérimental. Désactivé par défaut. Ne modifie le mod exporté que si le curseur est > 0. Essayez chaque style et dites-moi lequel rend bien.',

    /* ---- Part groups & environment sections ---- */
    'Body Armour': 'Armure', 'Face, Skin & Cape': 'Visage, peau et cape',
    'First-Person Arms': 'Bras à la 1re personne', 'Praetor Suit': 'Armure Praetor',
    'Barbarian Suit': 'Armure Barbare', 'Melee': 'Corps à corps',
    'Kits': 'Kits', 'Turret': 'Tourelle', 'Misc': 'Divers',
    'Classic Marine First-Person Arms': 'Bras à la 1re personne du marine classique',
    'Praetor First-Person Arms': 'Bras à la 1re personne Praetor',
    'Atlan body (3rd person)': 'Corps de l’Atlan (3e personne)',
    'Atlan cockpit (1st person)': 'Cockpit de l’Atlan (1re personne)',
    'Atlan Royal skin (3rd person)': 'Skin Atlan Royal (3e personne)',
    'Atlan Weapons': 'Armes de l’Atlan',
    'Ceilings': 'Plafonds', 'Floors': 'Sols', 'Doors': 'Portes', 'Skies': 'Ciels',
    'Tiles': 'Carrelage', 'Liquids': 'Liquides', 'Nature': 'Nature', 'Vegetation': 'Végétation',
    'Decals': 'Décalcomanies', 'Explosives': 'Explosifs', 'Switches': 'Interrupteurs',
    'Objects': 'Objets', 'Props': 'Accessoires', 'Brick & Stone': 'Brique et pierre',
    'Metal & Support': 'Métal et supports', 'Wood & Windows': 'Bois et fenêtres',
    'Tech & Computer': 'Technologie et ordinateurs', 'Lights & Signs': 'Lumières et panneaux',
    'Steps, Gates & Crates': 'Marches, grilles et caisses',

    /* ---- Bits the report turned up ---- */
    ', powered by': ', propulsé par',
    '& Atlan Tools': 'et Atlan Tools',
    '— see the bar above.': '— voir la barre ci-dessus.',
    '(F4 toggles)': '(F4 pour activer/désactiver)',
    'Biggie Cheese Presets': 'Lots de Biggie Cheese',
    'PBR Material Presets+': 'Matériaux PBR+',
    'Advanced Textures & How It Works': 'Textures avancées et fonctionnement',
    'Add sheet to presets': 'Ajouter la planche aux lots',
    'Save added sheets': 'Enregistrer les planches ajoutées',
    'Each extra variant adds another': 'Chaque variante supplémentaire en ajoute une autre',
    'DEV LOG — actions & errors (press F4 to hide)':
      'JOURNAL DEV — actions et erreurs (F4 pour masquer)',

    /* ---- Top bar / navigation ---- */
    'Edit': 'Modifier',
    'Create': 'Créer',
    'Load': 'Charger',
    'Settings': 'Paramètres',
    'Tutorial': 'Tutoriel',
    'Current project': 'Projet actuel',
    'Texture Tool': 'Textures',
    'Weapon Stats': 'Armes',
    'HUD Sprite': 'Visage ATH',
    'Model Swap': 'Changer de modèle',
    'AI Health': 'Vie des ennemis',
    'Ultimate Mod Tool': 'Ultimate Mod Tool',
    'Untitled': 'Sans titre',
    'No project yet — click to save, export or pick tools':
      'Aucun projet pour l’instant — cliquez pour enregistrer, exporter ou choisir des outils',

    /* ---- Settings menu ---- */
    'Appearance': 'Apparence', 'Sound': 'Son', 'Modding': 'Modding', 'App': 'Application',
    'This mod': 'Ce mod', 'Recent': 'Récents', 'Advanced': 'Avancé', 'Basic': 'Simple',
    'Monochrome UI: Off': 'Interface monochrome : Non',
    'Monochrome UI: On': 'Interface monochrome : Oui',
    'Welcome on Startup: Off': 'Écran d’accueil au démarrage : Non',
    'Welcome on Startup: On': 'Écran d’accueil au démarrage : Oui',
    'Tool colours': 'Couleurs des outils',
    'Per-tool accent colours': 'Couleur d’accent de chaque outil',
    'Weapon Stats editor colour': 'Couleur de l’éditeur d’armes',
    'HUD Sprite editor colour': 'Couleur de l’éditeur de visage ATH',
    'AI Health editor colour': 'Couleur de l’éditeur de vie des ennemis',
    'Sound Settings': 'Réglages du son',
    'Sound options — startup sound, music autoplay, background music':
      'Options sonores : son de démarrage, lecture auto, musique de fond',
    'Master Sound: On': 'Son général : Oui', 'Master Sound: Off': 'Son général : Non',
    'Startup Sound: On': 'Son de démarrage : Oui', 'Startup Sound: Off': 'Son de démarrage : Non',
    'Music Autoplay: On': 'Lecture auto de la musique : Oui',
    'Music Autoplay: Off': 'Lecture auto de la musique : Non',
    'Background Music: On': 'Musique de fond : Oui', 'Background Music: Off': 'Musique de fond : Non',
    'Error / Confirm Sounds: On': 'Sons d’alerte : Oui', 'Error / Confirm Sounds: Off': 'Sons d’alerte : Non',
    'Play the DOOM sound when the app starts': 'Jouer le son de DOOM au lancement',
    'Start the music automatically on launch': 'Lancer la musique automatiquement au démarrage',
    'Keep the music playing when the app is minimised or another window is focused':
      'Continuer la musique quand l’application est réduite ou en arrière-plan',
    'Switch the UI to a monochrome (grey) theme': 'Passer l’interface en thème monochrome (gris)',
    'Folders & locations': 'Dossiers et emplacements',
    'Set or change your export folder and your Atlan Packager / Loader / mods-folder locations.':
      'Définissez ou modifiez votre dossier d’export et les emplacements d’Atlan Packager / Loader / du dossier mods.',
    'Tutorial & Guide': 'Tutoriel et guide',
    'Open the written guide, or replay the interactive walkthrough':
      'Ouvrir le guide écrit ou revoir la visite interactive',
    'Written guide + the interactive walkthrough': 'Guide écrit et visite interactive',
    'Interactive walkthrough': 'Visite interactive',
    'Guide level:': 'Niveau du guide :',
    'Mod Buddy: On': 'Mod Buddy : Oui', 'Mod Buddy: Off': 'Mod Buddy : Non',
    'Report a bug': 'Signaler un bug',
    'Report a *bug* or request a *feature*': 'Signalez un *bug* ou proposez une *fonctionnalité*',
    'Credits & Thanks': 'Crédits et remerciements',
    'Credits & thanks to the mod authors this tool builds on.':
      'Crédits et remerciements aux auteurs de mods sur lesquels cet outil s’appuie.',
    'Reload': 'Recharger', 'Force Reload (reset)': 'Rechargement forcé (réinitialiser)', 'Quit': 'Quitter',
    'Language': 'Langue', 'Change the language of the interface': 'Changer la langue de l’interface',
    'Language: English': 'Langue : Anglais',
    'Save project': 'Enregistrer le projet', 'Export mod': 'Exporter le mod', 'Rename…': 'Renommer…',
    'New random name': 'Nouveau nom aléatoire', 'Edit tools & categories…': 'Modifier les outils et catégories…',
    'Write .decl files: Yes': 'Écrire les fichiers .decl : Oui',
    'Write .decl files: No': 'Écrire les fichiers .decl : Non',
    'Advanced textures (F2): Off': 'Textures avancées (F2) : Non',
    'Advanced textures (F2): On': 'Textures avancées (F2) : Oui',
    'Advanced Texture Options': 'Options de texture avancées',
    'Unlock per-part PBR channels (shine / metal / glow) for advanced skins':
      'Débloque les canaux PBR par pièce (brillance / métal / lueur) pour les skins avancés',
    'Import quality: Lossless': 'Qualité d’import : Sans perte',
    'Import quality: Editable': 'Qualité d’import : Modifiable',
    'Imported mod export': 'Export des mods importés',
    'Export texture aliases only, no .decl files — for kits that ship their own. Glow, transparency, eyes and hair stop working while this is on.':
      'N’exporte que les alias de texture, sans fichiers .decl, pour les kits qui fournissent les leurs. La lueur, la transparence, les yeux et les cheveux cessent de fonctionner tant que c’est activé.',
    'Lossless = the exact original textures, but you can\'t edit them. Editable = decoded layers you can tweak, at lower resolution.':
      'Sans perte = les textures d’origine exactes, mais non modifiables. Modifiable = des calques décodés que vous pouvez retoucher, en plus basse résolution.',
    'Settings — fonts, music, theme and app options':
      'Paramètres : polices, musique, thème et options de l’application',
    'Show this when I start': 'Afficher ceci au démarrage',
    'Show / hide the randomize options': 'Afficher ou masquer les options d’aléatoire',
    'Show the glow controls on the texture page': 'Afficher les réglages de lueur sur la page textures',
    'Show alignment grid': 'Afficher la grille d’alignement',
    'Toggle edit mode to rename or move parts':
      'Activer le mode édition pour renommer ou déplacer des pièces',
    'Hide this from the tool (dev only — Edit ▸ Show hidden brings it back)':
      'Masquer ceci dans l’outil (dev uniquement : Modifier ▸ Afficher les éléments masqués le rétablit)',

    /* ---- Left column / trays ---- */
    'PNG Tray': 'Bac à PNG', 'Add PNGs': 'Ajouter des PNG',
    'Upload once, then drag textures onto parts, enemy cards, or the fill-tab box. Randomize uses this tray.':
      'Importez-les une fois, puis glissez les textures sur les pièces, les cartes d’ennemis ou la case de remplissage. L’aléatoire utilise ce bac.',
    'Transparency Tray': 'Bac à transparences',
    'Ready-made see-through looks. Click one to apply it — to the part or section you have selected, or to the whole category if nothing is selected.':
      'Des styles transparents tout prêts. Cliquez pour l’appliquer à la pièce ou à la section sélectionnée, ou à toute la catégorie si rien n’est sélectionné.',
    'Surprise me': 'Surprends-moi', 'Roll a brand-new random look': 'Tirer un tout nouveau style au hasard',
    'Clear this category': 'Réinitialiser cette catégorie',
    'Make every part in this category solid again':
      'Rendre à nouveau opaques toutes les pièces de cette catégorie',
    'SirBiggieCheese Preset Camos': 'Camouflages de SirBiggieCheese',
    'Built-in SirBiggieCheese camo presets': 'Camouflages fournis par SirBiggieCheese',
    'Add all camos to PNG Tray': 'Ajouter tous les camouflages au bac',
    'Add selected camos to PNG Tray': 'Ajouter les camouflages sélectionnés au bac',
    'Add the ticked camos from your folders to the PNG tray':
      'Ajoute au bac les camouflages cochés de vos dossiers',
    'Add the ticked SirBiggieCheese camos to your PNG tray':
      'Ajoute à votre bac les camouflages SirBiggieCheese cochés',
    'Delete selected camos': 'Supprimer les camouflages sélectionnés',
    'Delete the ticked camos from your folders': 'Supprime de vos dossiers les camouflages cochés',
    'Hide the ticked built-in camos (local only)': 'Masque les camouflages fournis cochés (local uniquement)',
    'Upload camos to SirBiggieCheese': 'Importer des camouflages vers SirBiggieCheese',
    'Upload your own PNGs into the SirBiggieCheese preset list':
      'Importez vos propres PNG dans la liste SirBiggieCheese',
    'Add Your Own Preset': 'Ajouter votre propre lot',
    'Create preset folder / upload camos': 'Créer un dossier / importer des camouflages',
    'Create a named preset folder, then add individual camo PNGs into it.':
      'Créez un dossier nommé, puis ajoutez-y les PNG de camouflage.',
    'Create and manage your own camo preset folders':
      'Créez et gérez vos propres dossiers de camouflages',
    'Name a new preset folder and upload camos into it':
      'Nommez un nouveau dossier et importez-y des camouflages',
    'PBR Material Presets': 'Matériaux PBR',
    'Save material': 'Enregistrer le matériau',
    'Material name (e.g. Chrome)': 'Nom du matériau (ex. Chrome)',
    'No materials yet. Drop layers above, name it, and Save — then drag it onto any part.':
      'Aucun matériau pour l’instant. Déposez des calques ci-dessus, nommez-le et enregistrez, puis glissez-le sur une pièce.',
    'Import mod folder (all layers)': 'Importer un dossier de mod (tous les calques)',
    'Load a Slayer Kit mod folder — click to pick one, or drag it here':
      'Chargez un dossier de mod Slayer Kit : cliquez pour le choisir ou glissez-le ici',
    'Re-package loaded mod (lossless)': 'Ré-empaqueter le mod chargé (sans perte)',
    'Drag a camo onto a part, a Fill box, a PBR channel, or the PNG tray — or use':
      'Glissez un camouflage sur une pièce, une case de remplissage, un canal PBR ou le bac, ou utilisez',
    'Your Presets': 'Vos lots', 'Albedo': 'Albédo', 'Specular': 'Spéculaire',
    'Colour': 'Couleur', 'Smooth': 'Lissage',

    /* ---- Modes, sliders, transparency ---- */
    'Standard PNG': 'PNG standard',
    'Standard PNG mode — paint parts with your own texture PNGs (with optional glow sliders below).':
      'Mode PNG standard : peignez les pièces avec vos propres textures PNG.',
    'Transparency + Animation': 'Transparence et animation',
    'Make parts see-through, glowing and animated instead of painting them.':
      'Rendez les pièces transparentes, lumineuses et animées au lieu de les peindre.',
    'Transparency style': 'Style de transparence',
    'Opacity': 'Opacité', 'Brightness': 'Luminosité', 'Speed': 'Vitesse', 'Animation': 'Animation',
    'Editing': 'Modification', 'Nothing selected': 'Rien de sélectionné',
    'Whole section': 'Section entière',
    'Glow': 'Lueur', 'Glow sliders': 'Réglages de lueur', 'Total': 'Total',
    'Weapons': 'Armes', 'Enemies': 'Ennemis', 'Set all': 'Tout régler', 'Default': 'Par défaut',
    'changed': 'modifié', 'Test': 'Test', 'Hex colour': 'Couleur hexadécimale',
    'How *see-through* the part is — lower is more transparent.':
      'À quel point la pièce est *transparente* : plus bas = plus transparent.',
    'How *brightly* the part glows. 0 = tint only.':
      'Intensité de la *lueur* de la pièce. 0 = teinte seulement.',
    'How *fast* the animation moves. *1* = default.':
      'Vitesse de l’animation. *1* = par défaut.',
    'The *animation style*. *Static* = no motion, *Disabled* = none at all.':
      'Le *style d’animation*. *Statique* = aucun mouvement, *Désactivé* = aucune animation.',
    'Static (default)': 'Statique (par défaut)', 'Smoke': 'Fumée', 'Drift': 'Dérive',
    'Swirl': 'Tourbillon', 'Streaks': 'Traînées', 'Disabled (no animation)': 'Désactivé (aucune animation)',
    'Alpha (plain blend)': 'Alpha (fondu simple)', 'Glass / refraction': 'Verre / réfraction',
    'Hologram (shield-style)': 'Hologramme (style bouclier)',
    'Weird glow (experimental)': 'Lueur étrange (expérimental)',
    'Master glow on/off': 'Lueur générale activée/désactivée',
    'Master glow on/off (emissive / bloom)': 'Lueur générale activée/désactivée (émissive / bloom)',
    'Controls the overall glow for everything at once': 'Contrôle la lueur générale de tout à la fois',
    'Controls the glow on armour parts': 'Contrôle la lueur des pièces d’armure',
    'Controls the glow on weapons': 'Contrôle la lueur des armes',
    'Controls the glow on enemies': 'Contrôle la lueur des ennemis',
    'Controls the glow on skin & face': 'Contrôle la lueur de la peau et du visage',
    'Make this category transparent': 'Rendre cette catégorie transparente',
    'Make this section transparent': 'Rendre cette section transparente',
    'Make every part in this category see-through':
      'Rendre transparentes toutes les pièces de cette catégorie',
    'Make every part in this section see-through':
      'Rendre transparentes toutes les pièces de cette section',
    'Apply to category': 'Appliquer à la catégorie', 'Apply to section': 'Appliquer à la section',
    'Apply the chosen colour to every part in this category':
      'Applique la couleur choisie à toutes les pièces de cette catégorie',
    'Apply this colour to every part in this section':
      'Applique cette couleur à toutes les pièces de cette section',
    'Choose a colour for every part in this category':
      'Choisissez une couleur pour toutes les pièces de cette catégorie',
    'Choose a colour for every part in this section':
      'Choisissez une couleur pour toutes les pièces de cette section',
    'Recolour this category…': 'Recolorer cette catégorie…',
    'Category controls': 'Commandes de catégorie',
    'Acts on *every part in this category* (the current tab)':
      'Agit sur *toutes les pièces de cette catégorie* (l’onglet actuel)',
    'Acts on *every part in this section*': 'Agit sur *toutes les pièces de cette section*',
    'See-through': 'Transparent', 'Pick a colour': 'Choisir une couleur',
    'Type or paste a hex colour, e.g. #7D3CFF': 'Saisissez ou collez une couleur hexa, ex. #7D3CFF',
    'Click a *section* or a *part* to select it — the sliders then edit only that.':
      'Cliquez sur une *section* ou une *pièce* pour la sélectionner : les curseurs ne modifieront que celle-ci.',
    'Click a section or a part to select it': 'Cliquez sur une section ou une pièce pour la sélectionner',
    'Clear the selection and go back to editing the defaults':
      'Annule la sélection et revient aux valeurs par défaut',

    /* ---- Parts area / randomize / export ---- */
    'click / drop PNG': 'cliquer / déposer un PNG',
    'Drag PNG Here to Fill Section': 'Glissez un PNG ici pour remplir la section',
    'Drag PNG here to fill current tab': 'Glissez un PNG ici pour remplir l’onglet actuel',
    'Drop a PNG here to apply it to all parts in the current tab':
      'Déposez un PNG ici pour l’appliquer à toutes les pièces de l’onglet actuel',
    'This tab': 'Cet onglet', 'This tab, targets': 'Cet onglet, cibles',
    'All tabs': 'Tous les onglets', 'All tabs, targets': 'Tous les onglets, cibles',
    'Randomize every part on the current tab': 'Rend aléatoires toutes les pièces de l’onglet actuel',
    'Randomize each separate texture target on the current tab':
      'Rend aléatoire chaque cible de texture de l’onglet actuel',
    'Randomize every part on every tab': 'Rend aléatoires toutes les pièces de tous les onglets',
    'Randomize every separate texture target on every tab':
      'Rend aléatoire chaque cible de texture de tous les onglets',
    'Undo': 'Annuler', 'Undo the last change': 'Annuler la dernière modification',
    'Undo the last change — *Ctrl+Z*': 'Annuler la dernière modification — *Ctrl+Z*',
    'Clear all': 'Tout effacer', 'Clear every assigned part': 'Efface toutes les pièces assignées',
    'Save': 'Enregistrer', 'parts assigned': 'pièces assignées',
    'Click to see what you\'ve changed': 'Cliquez pour voir ce que vous avez modifié',
    'Export': 'Exporter', 'Export mod folder': 'Exporter le dossier du mod',
    'Export & package': 'Exporter et empaqueter', 'Export & Install': 'Exporter et installer',
    'Export the mod folder, ready for the Atlan Mod Packager':
      'Exporte le dossier du mod, prêt pour Atlan Mod Packager',
    'Exporting mod folder': 'Export du dossier du mod',
    'Preparing files...': 'Préparation des fichiers…', 'Packaging…': 'Empaquetage…',
    'Package': 'Empaqueter',
    'Package your exported mod (opens the Atlan Packager)':
      'Empaquette votre mod exporté (ouvre Atlan Packager)',
    'Package your exported mod (opens the Atlan Packager).':
      'Empaquette votre mod exporté (ouvre Atlan Packager).',
    'Load & Launch': 'Charger et lancer',
    'Load your mods and launch the game (Atlan Mod Loader)':
      'Charge vos mods et lance le jeu (Atlan Mod Loader)',
    'Load your mods and launch the game (Atlan Mod Loader).':
      'Charge vos mods et lance le jeu (Atlan Mod Loader).',
    'Load your mods and launch the game.': 'Charge vos mods et lance le jeu.',
    'Mod name': 'Nom du mod', 'New name': 'Nouveau nom',
    'Generate a fresh export name': 'Générer un nouveau nom',
    'Generate a fresh random export name': 'Générer un nouveau nom aléatoire',
    'Load mod folder': 'Charger un dossier de mod', 'Load preset': 'Charger un lot',
    'Choose export folder': 'Choisir le dossier d’export',
    'Open an *existing mod folder* (or drag one onto this button)':
      'Ouvre un *dossier de mod existant* (ou glissez-en un sur ce bouton)',
    'Save this mod so you can *reopen it later* — find it under the mod name ▸ Recent':
      'Enregistrez ce mod pour le *rouvrir plus tard* : vous le trouverez sous le nom du mod ▸ Récents',
    'Start a *new mod* — choose which tools it uses':
      'Démarrer un *nouveau mod* : choisissez les outils qu’il utilise',
    'Unload this mod': 'Décharger ce mod',
    'Search all parts…': 'Rechercher des pièces…', 'Search enemies…': 'Rechercher des ennemis…',
    'Search faces…': 'Rechercher des visages…', 'Search weapons…': 'Rechercher des armes…',
    'Search parts across all tabs by name': 'Recherche des pièces par nom dans tous les onglets',
    'Search parts': 'Rechercher des pièces',

    /* ---- Tabs / categories ---- */
    'Slayer': 'Slayer', 'Guns': 'Armes à feu', 'Melee & Shield': 'Corps à corps et bouclier',
    'Melee Weapons': 'Armes de corps à corps', 'Melee weapons': 'Armes de corps à corps',
    'Ranged weapons': 'Armes à distance', 'Demons': 'Démons', 'Demon enemies': 'Ennemis démoniaques',
    'Bosses & Large': 'Boss et grands ennemis', 'Bosses & large enemies': 'Boss et grands ennemis',
    'Projectiles': 'Projectiles', 'Projectile & ammo materials': 'Matériaux de projectiles et munitions',
    'Campaign Environment': 'Environnement de campagne',
    'Campaign world environment surfaces': 'Surfaces de l’environnement de la campagne',
    'Classic Environment': 'Environnement classique',
    'Classic-DOOM environment surfaces': 'Surfaces de l’environnement DOOM classique',
    'Atlan / Dragon': 'Atlan / Dragon', 'Atlan mech parts & weapons': 'Pièces et armes du mécha Atlan',
    'Sentinels & NPCs': 'Sentinelles et PNJ', 'Sentinels & NPC characters': 'Sentinelles et PNJ',
    'Extras / Unknown (identify later)': 'Extras / Inconnus (à identifier plus tard)',
    'Doom Slayer armour, arms, face, cape & suits':
      'Armure, bras, visage, cape et tenues du Doom Slayer',
    'Only skin certain categories?': 'Ne personnaliser que certaines catégories ?',
    'Add more categories to this mod': 'Ajouter d’autres catégories à ce mod',
    'Pick the tools this mod needs — you can add more later.':
      'Choisissez les outils dont ce mod a besoin : vous pourrez en ajouter plus tard.',
    'Choose which tools this mod uses (untick to remove)':
      'Choisissez les outils utilisés par ce mod (décochez pour les retirer)',
    'Remove this tool from the mod': 'Retirer cet outil du mod',
    'Add another tool to this mod': 'Ajouter un autre outil à ce mod',
    'Slayer skin:': 'Skin du Slayer :', 'Shield skin:': 'Skin du bouclier :',
    'Slayer skin: Default': 'Skin du Slayer : Par défaut',
    'Shield skin: Default': 'Skin du bouclier : Par défaut',
    'Base Slayer — the classic look': 'Slayer de base : le look classique',
    'Base shield — use the “Shield” section below.':
      'Bouclier de base : utilisez la section « Bouclier » ci-dessous.',

    /* ---- Other tools ---- */
    'Weapon Stat Editor': 'Éditeur de statistiques d’armes',
    'Weapon Stat Editor — tweak damage, fire rate, ammo & range, then export a mod (beta)':
      'Éditeur de statistiques d’armes : ajustez dégâts, cadence, munitions et portée, puis exportez un mod (bêta)',
    'Damage, fire rate, ammo & range': 'Dégâts, cadence, munitions et portée',
    'Damage, Fire Rate, Ammo or Range': 'Dégâts, cadence, munitions ou portée',
    'Weapon Damage': 'Dégâts de l’arme', 'Weapons Fire Rate': 'Cadence de tir',
    'Ammo Capacity': 'Capacité de munitions', 'Weapon Range': 'Portée de l’arme',
    'Projectile Speed': 'Vitesse du projectile',
    'Move Speed While Firing': 'Vitesse de déplacement en tirant',
    'Pick a stat section —': 'Choisissez une section de statistiques :',
    'Set every weapon in this section': 'Règle toutes les armes de cette section',
    'Randomize every weapon in this section': 'Rend aléatoires toutes les armes de cette section',
    'Reset this whole section to vanilla': 'Réinitialise toute cette section aux valeurs d’origine',
    'Reset this one to vanilla': 'Réinitialise celle-ci aux valeurs d’origine',
    'Save your current slider setup as a preset file':
      'Enregistre vos réglages actuels dans un fichier',
    'Load a preset file to restore a saved slider setup':
      'Charge un fichier pour restaurer des réglages enregistrés',
    'HUD Sprite Editor': 'Éditeur de visage ATH',
    'Replace the Doomguy HUD face': 'Remplace le visage du Doomguy dans l’ATH',
    'Drop sheet': 'Déposer la planche', 'No sheet': 'Aucune planche',
    'No sheet loaded.': 'Aucune planche chargée.',
    'Drag your sprite-sheet PNG here, or click to browse':
      'Glissez ici votre planche de sprites PNG, ou cliquez pour parcourir',
    '11 columns × 5 rows of faces · transparent background':
      '11 colonnes × 5 lignes de visages · fond transparent',
    'AI prompt': 'Texte pour IA',
    'Copy a ready-made prompt for an AI image generator, set up for this sheet layout':
      'Copie un texte tout prêt pour un générateur d’images par IA, adapté à ce format de planche',
    'Auto-center sprites': 'Centrer les sprites automatiquement',
    'Re-centre each face in its grid cell': 'Recentre chaque visage dans sa case',
    'Auto-make zombie (green) variant': 'Créer automatiquement la variante zombie (verte)',
    'Also replace hologram face style': 'Remplacer aussi le style de visage hologramme',
    'Adds a second HUD texture — package this one on its own':
      'Ajoute une deuxième texture d’ATH : empaquetez-la séparément',
    'Adds two more HUD textures — package these on their own':
      'Ajoute deux textures d’ATH de plus : empaquetez-les séparément',
    'Save current sheet': 'Enregistrer la planche actuelle',
    'Add your own preset': 'Ajouter votre propre planche',
    'Save this sheet as a preset': 'Enregistre cette planche comme lot',
    'Undo the last sheet change': 'Annuler la dernière modification de la planche',
    'Load a sheet, then “Save current sheet” to reuse it here.':
      'Chargez une planche, puis « Enregistrer la planche actuelle » pour la réutiliser ici.',
    'Pick your own mugshot sheet PNG(s) to add to Your Presets':
      'Choisissez vos propres planches PNG à ajouter à Vos lots',
    'Give a weapon a different model': 'Donner un autre modèle à une arme',
    'Give any weapon a different model from the game’s own set. Only weapons you change are exported.':
      'Donnez à n’importe quelle arme un autre modèle déjà présent dans le jeu. Seules les armes modifiées sont exportées.',
    'Give every weapon in this section a random model':
      'Donne un modèle aléatoire à toutes les armes de cette section',
    'Put this whole section back to its original models':
      'Remet toute cette section à ses modèles d’origine',
    'Back to the original model': 'Revenir au modèle d’origine',
    'Save your swaps as a preset file': 'Enregistre vos changements dans un fichier',
    'Load a saved set of swaps': 'Charge un ensemble de changements enregistré',
    'AI Health Editor': 'Éditeur de vie des ennemis',
    'How much health each demon has': 'Combien de vie a chaque démon',
    'Set a multiplier for any enemy (1.0 = vanilla) and its health updates beside the slider. Only enemies you change are exported.':
      'Réglez un multiplicateur pour un ennemi (1,0 = d’origine) et sa vie s’affiche à côté du curseur. Seuls les ennemis modifiés sont exportés.',

    /* ---- Buttons / dialogs / misc ---- */
    /* NOTE: no 'Back' here on purpose — see the Spanish note above. */
    'Cancel': 'Annuler', 'OK': 'OK', 'Skip': 'Passer', 'Next': 'Suivant', 'Previous': 'Précédent',
    'Close': 'Fermer', 'Got it': 'Compris', 'Yes': 'Oui', 'No': 'Non', 'Hide': 'Masquer',
    'Apply to all': 'Tout appliquer', 'Clear them': 'Les réinitialiser', 'All': 'Tout', 'None': 'Aucun',
    'All of it': 'Tout', 'Send': 'Envoyer', 'Note': 'Note', 'Move Section': 'Déplacer la section',
    'Pick options': 'Choisir les options', 'Yes, pick it': 'Oui, la choisir',
    'No, change it': 'Non, la changer',
    'Volume': 'Volume', 'Play the *Proving Grounds* theme': 'Jouer le thème *Proving Grounds*',
    'Pre-release build — version and build id': 'Version préliminaire : version et identifiant de build',
    'Setup required.': 'Configuration requise.', 'No camos': 'Aucun camouflage',
    '(optional)': '(facultatif)',
    'Choose extracted folder…': 'Choisir le dossier extrait…',
    'This tool needs the game\'s own enemy files':
      'Cet outil a besoin des fichiers d’ennemis du jeu',
    '(actions & errors appear here)': '(les actions et les erreurs apparaissent ici)',
    'Start here': 'Commencez ici',
    'Reskin the Slayer, weapons, demons & more':
      'Changez l’apparence du Slayer, des armes, des démons et plus',
    'Texture Tool — build texture & transparency mods (you are here)':
      'Outil Textures : créez des mods de texture et de transparence (vous êtes ici)',
    'What would you like to make?': 'Que voulez-vous créer ?',
    'e.g. make my whole loadout look like lava':
      'ex. donne à tout mon équipement un aspect de lave',
    'Hide the buddy (bring him back in Settings)':
      'Masquer l’assistant (vous pouvez le récupérer dans les Paramètres)',
    'Show or hide the Mod Buddy helper in the bottom-right corner':
      'Afficher ou masquer l’assistant Mod Buddy en bas à droite',

    /* ---- Mod Buddy: nudges, greetings, idle lines ---- */
    'Click me if you get stuck.': 'Clique sur moi si tu bloques.',
    'Need a hand? Just click me.': 'Besoin d’aide ? Clique sur moi.',
    'Click me and tell me what you want to make.': 'Clique et dis-moi ce que tu veux créer.',
    'Stuck for an idea? Click me.': 'À court d’idées ? Clique sur moi.',
    'Want help designing something? Click me.': 'Envie d’aide pour créer ? Clique sur moi.',
    'New operator detected. So... You’re the one they assigned me to?':
      'Nouvel opérateur détecté. Alors… c’est à toi qu’on m’a affecté ?',
    'New operator detected. I assume one of us knows what we’re doing.':
      'Nouvel opérateur détecté. Je suppose que l’un de nous deux sait ce qu’il fait.',
    'You’re back. I was beginning to enjoy the silence.':
      'Te revoilà. Je commençais à apprécier le silence.',
    'Welcome back. Nothing caught fire.': 'Bon retour. Rien n’a pris feu.',
    'There you are. I was running out of things to judge.':
      'Ah, te voilà. Je n’avais presque plus rien à juger.',
    'Back again. Good. I was getting suspicious.':
      'De retour. Bien. Je commençais à avoir des soupçons.',
    'Ready when you are. I’ve waited longer.': 'Quand tu veux. J’ai attendu bien plus longtemps.',
    'You returned. The campaign continues.': 'Tu es revenu. La campagne continue.',
    'Good. Something might finally happen.': 'Bien. Il va peut-être enfin se passer quelque chose.',
    'You’re here. Try not to break anything immediately.':
      'Te voilà. Essaie de ne rien casser tout de suite.',
    'Welcome back. I remain inexplicably employed.':
      'Bon retour. Je reste inexplicablement employé.',
    'Ah. My operator has returned.': 'Ah. Mon opérateur est de retour.',
    'Kreed put a Tether on me once. This is less restrictive.':
      'Kreed m’a mis une Entrave, autrefois. Ceci est moins contraignant.',
    'I spent centuries becoming Hell’s greatest fear. Now I wait for Export.':
      'J’ai passé des siècles à devenir la plus grande peur de l’Enfer. Maintenant j’attends l’export.',
    'The war lasted generations. I assume this loading bar is nearly done.':
      'La guerre a duré des générations. J’imagine que cette barre de chargement touche à sa fin.',
    'I was bound to serve gods and kings. “Desktop assistant” was not discussed.':
      'J’étais lié au service des dieux et des rois. « Assistant de bureau » n’était pas prévu.',
    'Rip and tear, until it is done. Then save. Definitely save.':
      'Déchire et massacre, jusqu’au bout. Puis enregistre. Surtout, enregistre.',
    'Somewhere, a demon is having a significantly worse day than you.':
      'Quelque part, un démon passe une journée nettement pire que la tienne.',
    'You have been staring at this menu for some time. Tactical contemplation, presumably.':
      'Tu fixes ce menu depuis un moment. Contemplation tactique, je suppose.',
    'This pause has gone on long enough to become tactical.':
      'Cette pause dure depuis assez longtemps pour devenir tactique.',
    'I once killed a Titan with my bare hands. You’re currently adjusting a slider.':
      'J’ai tué un Titan à mains nues. Toi, tu règles un curseur.',
    'I remember when decisions were made with steel.':
      'Je me souviens du temps où les décisions se prenaient avec de l’acier.',
    'Many great things depended on me once. Now it only appears to be this button.':
      'De grandes choses ont dépendu de moi. Aujourd’hui, il semble que ce ne soit que ce bouton.'
  }
};
