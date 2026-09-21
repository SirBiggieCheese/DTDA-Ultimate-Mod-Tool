// Shipped PBR Material Presets for the Texture Tool's Advanced (PBR) mode.
// Each entry maps 3 layer images to our slots: albedo (colour), smoothness (shine), specular (metal).
// Source packs are standard spec/gloss + metal/rough materials; mapping used when they were prepared:
//   _basecolor -> albedo   ·   _glossiness -> smoothness   ·   _metallic -> specular
// (normal / height / roughness / AO / opacity are intentionally not shipped — the tool keeps normals vanilla.)
// The tool fetches these on load and adds them to the PBR preset list, alongside any you build yourself.
// TEMP: shipped starter presets removed (2026-07-14) — they looked poor and need more testing before shipping. The loader
// stays wired, so re-adding entries here is all that's needed to bring them back. The downscaled images are still in
// presets/pbr/ (Tech_Grid_01, Tech_BraidedCable_01, Tech_Mesh_01, Tech_PlasticGrid_03, Tech_Polystyrene_01).
window.PBR_PRESETS = [];
