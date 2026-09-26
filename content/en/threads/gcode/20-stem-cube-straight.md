---
date: 2026-09-26
---

<!--autotranslate-->

::: gallery
![Stem cube, side view](https://ik.imagekit.io/ivandianov/threads/gcode/stem-cube-straight/01.jpg)
![Stem cube, top view](https://ik.imagekit.io/ivandianov/threads/gcode/stem-cube-straight/02.jpg)
:::

I tried making the bridges thin but printing them in five layers: three along X and two along Y.

A thin line does not land well on another thin line: its end cannot stick, so the nozzle drags it away.

The bridge layers did not fuse. They look fragile, but I could not break the structure by hand.

Viewed from above, there is a lot of webbing caused by diagonal offsets. There are blobs at the bottoms of the columns.

<details>
<summary>Print parameters</summary>

**Stem cube, straight travels — 2026-09-26** (sketch `2026.09.26 stem cube straight`, commit `8395a88`)

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm, donor `_donor_3mf/L.gcode.3mf`
- Temperatures: nozzle at 235 °C throughout the print, including the bed grid (M109 wait before the grid); bed at 70 °C
- Part cooling at 100%
- Cube of 3 × 3 × 2 cells measuring 3 × 3 × 3 mm each: 4 × 4 nodes at 3 mm spacing, 9 × 9 mm footprint, centred at X128 Y128; top of the final beam at Z 6.7 mm (calculated)
- Bed grid: 4 rows at Z 0.5, 4 columns at Z 0.7, 0.8 × 0.5 mm line with 1.2 overfill (0.48 mm³/mm), 20 mm/s; the front-left corner is marked with a tail extending 5 mm left from the front line
- 2 tiers at 3 mm each: 2.4 mm stem + 0.6 mm beam (4 passes at 0.2 mm increments). Stem tops by tier at Z 3.1 / 6.1
- 16 stems per tier, 32 total; serpentine traversal from the front-left corner: one row left to right, the next right to left, rows front to back
- Each stem:
  1. Lower to the top of the node with no gap.
  2. Unretract 0.8 mm and pause for 0.5 s.
  3. Rise 2.4 mm while extruding 0.5 mm³ per millimetre of rise at 0.5 mm/s (calculated flow 0.25 mm³/s).
  4. Pause for 1.5 s at the top.
  5. Retract 0.8 mm, lift 1 mm above the tops, and travel to the next stem at 60 mm/s.
- Beams over the stem tops on each tier, 4 passes at 0.2 mm increments, with the first at stem-top height:
  1. Layer 1, rows — back to front from the left edge: 0.07 mm³/mm strand, with 0.2 mm³ pads at both ends of the first strand.
  2. Layer 1, columns — left to right from the front edge: 0.07 mm³/mm strand, with 0.2 mm³ pads at both ends of the first strand.
  3. Layer 2, rows — front to back from the right edge: 0.14 mm³/mm strand, with 0.2 mm³ pads at both ends of the first strand.
  4. Layer 2, columns — right to left from the back edge: 0.14 mm³/mm strand, with 0.2 mm³ pads at both ends of the first strand.
- Each beam line consists of two strands offset ±0.175 mm from the node axis (0.35 mm between strands), printed at 15 mm/s: outward along one strand, turn, then back along the other. Pads are extruded in place at 6 mm³/s
- Between beam lines: lift 0.5 mm, travel along the field edge at 60 mm/s, lower; no retraction
- Direct travels: except for the move from the start to the grid, each travel follows X or Y or includes a 0.175 mm offset on the second axis (at a field corner when switching beam passes and from the last beam of a tier to the first stem of the next tier)
- Print time 4 min 32 s, filament 62 mm

</details>
