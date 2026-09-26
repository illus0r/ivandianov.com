---
date: 2026-09-26
---

<!--autotranslate-->

::: gallery
![Overview of the stem probe temperature zones](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-analysis/01.jpg)
![Stems after the strength test](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-analysis/02.jpg)
![Differences in stem thickness](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-analysis/03.jpg)
![Close-up of the stem probe](https://ik.imagekit.io/ivandianov/threads/gcode/stem-probe-analysis/04.jpg)
:::

At temperatures above 235 °C (245, 255, and 265 °C), the left column (0.2 mm³/mm) came out thicker than the second one (0.5 mm³/mm). Apparently the plastic overheats in the nozzle during the move, or something else happens — who knows.

It is better not to use speeds above 1 mm/s. Rows printed at 2…8 mm/s are unstable at every temperature.

- Retraction wisps still break only at 235 °C.
- The most consistent thicknesses occur at 235 °C. In the three bottom, slowest rows (0.25 / 0.5 / 1 mm/s), the stems measured as follows:

| Extrusion, mm³/mm | Stem Ø, mm ±0.1 mm | Calculated Ø of a solid cylinder with the same volume, mm |
|---|---|---|
| 0.2 | 0.6 | 0.50 |
| 0.5 | 0.8 | 0.80 |
| 0.8 | 1.0 | 1.01 |
| 1.1 | 1.2 | 1.18 |
| 1.4 | 1.4 | 1.34 |

<details>
<summary>Print parameters</summary>

**Stem probe with a base — 2026-09-26** (sketch `2026.09.26 stem probe base`, commit `69c0b94`)

- Printer: Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Material: Syntech PETG White, Ø1.75 mm, donor `_donor_3mf/L.gcode.3mf`
- Temperatures: nozzle at 255 °C for the grid (donor temperature), then 235 / 245 / 255 / 265 °C for the four blocks; bed at 70 °C
- Part cooling: 100%
- Four blocks in a 2 × 2 arrangement, each block 48 × 60 mm, 16 mm gap, field centred at X128 Y128; 235 °C front left, 245 front right, 255 rear left, 265 rear right
- One shared grid for all blocks: rows at Z 0.5, columns at Z 0.7, 0.8 × 0.5 mm line with 1.2 overfill (0.48 mm³/mm), 20 mm/s; the front-left corner is marked by extending the front line 5 mm to the left
- Matrix: extrusion along X is 0.2 / 0.5 / 0.8 / 1.1 / 1.4 mm³ per mm of lift; lift speed along Y (front to back) is 0.25 / 0.5 / 1 / 2 / 4 / 8 mm/s
- Stem spacing: 12 mm; 30 stems per block, 120 total
- Each stem:
  1. Lower to Z 1.0, leaving a 0.3 mm gap above the grid node.
  2. Unretract, then extrude a 1 mm³ base in place at 6 mm³/s.
  3. Rise to Z 5.0: 4 mm with the column's extrusion rate and the row's speed.
  4. Pause for 1.5 s at the top.
- Travel moves: 0.8 mm retract, rise 1 mm above stem tops, travel at 60 mm/s, lower, then 0.8 mm unretract
- Order: print the entire grid at the donor temperature, then print blocks from coldest to hottest while waiting for each temperature with M109; stems within each block are printed in rows from left to right
- Peak flow: 11.2 mm³/s, calculated for the 1.4 mm³/mm × 8 mm/s cell; the generator reports no warnings
- Print time: 17 min 8 s; filament: 750 mm

</details>
