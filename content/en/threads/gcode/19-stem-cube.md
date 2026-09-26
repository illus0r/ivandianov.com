---
date: 2026-09-26
---

<!--autotranslate-->

::: gallery
![A cube made of stems and thin bridges](https://ik.imagekit.io/ivandianov/threads/gcode/stem-cube/01-ccw.jpg)
:::

I made the columns too thick; they could be much thinner. All bridges except the top ones — 0.07 mm³/mm — sagged.

The bridges came out very thin compared with the supports. Despite that, the structure is very rigid: I cannot squeeze it with my fingers.

The drops at the bases of the columns are excessive; they inflated into little barrels.

<details>
<summary>Print parameters</summary>

**Stem cube — 2026-09-26** (sketch `2026.09.26 stem cube`, commit `5f8c95e`)

**Ranges**

- **Bridge extrusion: from 0.48 to 0.07 mm³/mm.** It stays constant within each tier and changes from tier to tier, bottom to top: 0.48 / 0.35 / 0.25 / 0.15 / 0.07 mm³/mm.

**Print parameters**

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm, donor `_donor_3mf/L.gcode.3mf`
- Temperatures: nozzle at 235 °C throughout the print, including the bed-level grid (M109 wait before the grid); bed at 70 °C
- Part cooling at 100%
- Cube of 5 × 5 × 5 cells: 6 × 6 nodes at 3 mm spacing, 15 × 15 mm footprint, centred at X128 Y128; top of the final grid at Z 18.2 mm (calculated)
- Bed grid: 6 rows at Z 0.5, 6 columns at Z 0.7, 0.8 × 0.5 mm line with 1.2 overfill (0.48 mm³/mm), 20 mm/s; the front-left corner is marked with a tail extending 5 mm left from the front line
- 5 tiers at 3.5 mm each: 0.3 mm gap + 3 mm stem + 0.2 mm column lift. Stem tops by tier at Z 4.0 / 7.5 / 11.0 / 14.5 / 18.0
- 36 stems per tier, 180 total; row-wise traversal — each row left to right, rows front to back
- Each stem:
  1. Lower to the node, stopping 0.3 mm above the top of the node (the grid column beneath it).
  2. Unretract 0.8 mm and extrude a 2 mm³ base in place at 6 mm³/s.
  3. Rise 3 mm while extruding 1.4 mm³ per millimetre of rise at 0.5 mm/s (calculated flow 0.7 mm³/s).
  4. Pause for 1.5 s at the top.
  5. Retract 0.8 mm, lift 1 mm above the tops, and travel to the next stem at 60 mm/s.
- Grid over the stem tops on each tier:
  1. Rows at stem-top height, 15 mm/s, using that tier's extrusion; add another 0.5 mm³ in place at every node at 6 mm³/s.
  2. Columns 0.2 mm above the rows, 15 mm/s, at the same extrusion, with no extra material at the nodes.
  3. Between lines: lift 0.5 mm, travel at 60 mm/s, lower; no retraction.
- Peak flow 7.2 mm³/s, calculated for bridges at 0.48 mm³/mm × 15 mm/s
- Print time 25 min 34 s, filament 636 mm

</details>
