---
date: 2026-09-24
---

<!--autotranslate-->

::: gallery
![Shader lattice on a cylinder, full view with ruler](https://ik.imagekit.io/ivandianov/threads/gcode/shader-lattice/01.jpg)
![Shader lattice on a cylinder, droplet close-up](https://ik.imagekit.io/ivandianov/threads/gcode/shader-lattice/02.jpg)
![Shader lattice on a cylinder, interior view](https://ik.imagekit.io/ivandianov/threads/gcode/shader-lattice/03.jpg)
:::

Tested an SDF-defined lattice surface.

For a 4 mm³ droplet, a 2 mm layer is too tall: the layers did not fuse, and the structure falls apart under light pressure. Many droplets fall through the holes in the previous layers. But on the protrusions, where several droplets gather close together, they form a column that keeps the structure from turning into spaghetti.

<details>
<summary>Print parameters</summary>

**Shader lattice on a cylinder — 2026-09-24** (sketch `2026.09.24 shader lattice`, commit `ae2bc4d`)

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: 255 °C nozzle, 70 °C bed
- Part cooling fan: 100%
- Relief cylinder: radius from 20 to 28 mm (8 mm outward relief), centered at X128 Y128
- Pattern: 10 periods around the circumference, 25.1 mm vertical period
- Base: a continuous line along the lower contour at Z 0.2 mm, 0.5 × 0.2 mm, 20 mm/s
- Layer height: 2 mm; first droplet layer at Z 0.7 mm (0.5 mm above the base); 25 layers total; final layer at Z 48.7 mm
- Droplet spacing along the contour: 4 mm. Each new droplet is placed midway between the droplets of the previous layer.
- Droplet: 2.5 mm³ on the surface, 4 mm³ on the ribs where the contour runs radially. Extruded in place at 6 mm³/s. 2370 droplets total, 2360 of them on the ribs.
- Strand between droplets: 0.35 × 0.2 mm (0.07 mm³/mm), 15 mm/s
- Travel across holes: 0.8 mm retraction, 0.6 mm lift, travel at 60 mm/s, descend, 0.8 mm unretraction. 369 travel moves total.
- Print time: 33 min 31 s; filament: 4107 mm

</details>
