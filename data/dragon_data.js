// Dragon parts — APPENDED into the existing "Atlan Mech" tab (renamed "Atlan / Dragon" in the UI) so it doesn't push
// other tabs out of line. Paths from build_dragon.js. Kept to TWO clear groups (Body, Turret/Cannon) for clarity.
window.DRAGON_GROUPS = [
  {g:"Dragon — Body",parts:[
    ["Body — Skin 1 (default)",["models/characters/dragon/1001/dragon_1001"]],
    ["Body — Skin 2",["models/characters/dragon/1002/dragon_1002"]],
    ["Body — Skin 3",["models/characters/dragon/1003/dragon_1003"]],
    ["Body — Skin 4",["models/characters/dragon/1004/dragon_1004"]],
    ["Body — Skin 5",["models/characters/dragon/1005/dragon_1005"]],
    ["Body — Skin 6",["models/characters/dragon/1006/dragon_1006"]],
    ["Body — Skin 7",["models/characters/dragon/1007/dragon_1007"]],
    ["Back panels",["models/characters/dragon/1001/dragon_backpanels_1001"]],
    ["Neck",["models/characters/dragon/1001/dragon_neck_cut_1002"]],
    ["Wings (advanced)",["models/characters/dragon/1001/wings_membranes_default","models/characters/dragon/1001/wings_membranes_supersonic"]]
  ]},
  {g:"Dragon — Turret / Cannon",parts:[
    ["Turret — Skin 1",["models/characters/dragon/1001/dragon_turret_1001"]],
    ["Turret — Skin 2",["models/characters/dragon/1002/dragon_turret_1002"]],
    ["Turret — Skin 3",["models/characters/dragon/1003/dragon_turret_1003"]],
    ["Cannon A",["models/characters/dragon/turret/turret_a"]],
    ["Cannon B",["models/characters/dragon/turret/turret_b"]]
  ]}
];
