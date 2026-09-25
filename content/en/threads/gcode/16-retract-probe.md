---
date: 2026-09-25
---

<!--autotranslate-->

![Test piece with different retraction distances and pre-retraction pauses](https://ik.imagekit.io/ivandianov/threads/gcode/retract-probe/01.jpg)

Here I tested different retraction settings, varying the retraction distance and the pause before it.

I misjudged the droplet volume: the filament was extruded either too much or too quickly, so instead of forming a straight line it curled into a knot. With a short pause (the bottom row), the droplets flowed all the way down; with a long two-second pause, they stayed on top of the stems.

I also noticed that the silicone part of the printhead was pressing the neighboring knots down by about 1 mm.

Interestingly, a 1.5-second pause works well and leaves a thin strand. Retraction itself seems to make almost no difference. The collapsed stems may be responsible. I need to learn to draw the stems first and only then retract.

<details>
<summary>Print parameters</summary>

**Retraction test — 2026-09-25** (sketch `2026.09.25 retract probe`, commit `3e6c6ca`)

- Printer, filament, temperatures, and cooling are the same as above
- Field: a 10 × 10 grid of rods at 5 mm spacing (45 × 45 mm), centered on the bed
- Along X, left to right: retraction 0; 0.2; 0.4; …; 1.8 mm
- Along Y, front to back: pause at the top before retraction 0; 0.22; 0.44; …; 2.0 s
- Corner marker at (0, 0), front left: the bottom grid line extends 5 mm to the left beyond the field
- Grid: 0.8 × 0.5 mm lines with 20% over-extrusion (0.48 mm³/mm), 10 mm/s. Rows (along X) at Z 0.5 mm, columns (along Y) at Z 0.7 mm. Each line is printed separately; the nozzle lifts 0.5 mm between lines.
- Rod: rise 5 mm from the top of the grid (Z 0.7) while extruding 0.8 mm³/mm at 5 mm/s (4 mm³ per rod); pause according to its row; retract according to its column at 30 mm/s; lift 1 mm and travel to the next node at 60 mm/s; descend, then unretract by the same distance.
- Path: serpentine by rows
- Print time: 5 min 17 s (excluding start and end); filament: 347 mm

</details>
