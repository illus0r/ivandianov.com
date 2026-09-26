---
date: 2026-09-26
---

<!--autotranslate-->

::: gallery
![Stem test piece with four temperature zones](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-base/01.jpg)
![Test piece after removing the stems that snapped off easily](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-base/02.jpg)
:::

I tried to find suitable parameters for printing a stem. The test piece has four temperature zones, each with a 5 × 6 array of stems.

Within each zone, thickness changes from left to right (thicker on the right), while extrusion speed changes from bottom to top (faster at the top).

In the second photo, I snapped off the stems that came away easily.

For some reason, the thin stems in the first columns become thick, apparently because of the long pause. The pause is there to let the nozzle heat the filament. Some columns have caps on top: this is plastic oozing during the pause.

The stems need to be extruded slowly: only the bottom two rows came out properly. The fine string breaks only at the lowest temperature; at the other temperatures it reaches all the way down to the base.

<details>
<summary>Print parameters</summary>

**Stem-with-base test — 2026-09-26** (sketch `2026.09.26 stem probe base`, no commit)

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: nozzle at 235 / 245 / 255 / 265 °C by block, bed at 70 °C
- Part cooling fan: 100%
- Four blocks in a 2 × 2 arrangement, each 48 × 60 mm, with a 16 mm gap, centered at X128 Y128; 235 °C front left, 245 °C front right, 255 °C rear left, 265 °C rear right
- Base grid: rows at Z 0.5, columns at Z 0.7, 0.8 × 0.5 line with a 1.2 over-extrusion factor, 20 mm/s; the field corner is marked by a 5 mm tail extending left from the front line
- Parameter grid: along X, extrusion 0.2 / 0.5 / 0.8 / 1.1 / 1.4 mm³/mm; along Y, upward speed 0.25 / 0.5 / 1 / 2 / 4 / 8 mm/s
- Stem spacing 12 mm, 30 stems per block, 120 total
- Each stem: descend to Z 1.0, leaving a 0.3 mm gap above the grid node; extrude a 1 mm³ base in place at 6 mm³/s; rise to Z 5.0, a 4 mm move with the column’s extrusion rate and the row’s speed; pause for 1.5 s at the top.
- Travel moves: retract 0.8 mm, lift 1 mm above the stem tips, travel at 60 mm/s, descend, unretract
- Order: print the entire base grid first, then the blocks from coldest to hottest; stems are printed in rows from left to right
- Peak flow 11.2 mm³/s, calculated for the 1.4 mm³/mm × 8 mm/s cell
- Print time: 17 min 8 s; filament: 750 mm

</details>
