---
date: 2026-09-25
---

<!--autotranslate-->

::: gallery
![Shader lattice with a 1 mm layer height among greenery](https://ik.imagekit.io/ivandianov/threads/gcode/shader-lattice-layer-1mm/01.jpg)
![Surface made of tiny knots, viewed from inside the lattice](https://ik.imagekit.io/ivandianov/threads/gcode/shader-lattice-layer-1mm/02.jpg)
:::

I reduced the layer height, and the result is very strong. The surface looks as if it is made of tiny knots.

<details>
<summary>Print parameters</summary>

**Shader lattice on a cylinder, 1 mm layer height — 2026-09-24** (sketch `2026.09.24 shader lattice layer 1mm`, commit `0f940c0`)

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: 255 °C nozzle, 70 °C bed
- Part cooling fan: 100%
- Relief cylinder: radius from 20 to 28 mm (8 mm outward relief), centered at X128 Y128
- Pattern: 10 periods around the circumference, 25.1 mm vertical period
- Base: a continuous line along the lower contour at Z 0.2 mm, 0.5 × 0.2 mm, 20 mm/s
- Layer height: 1 mm. First droplet layer at Z 0.7 mm (0.5 mm above the base), 50 layers total, final layer at Z 49.7 mm
- Droplet spacing along the contour: 4 mm. Each new droplet is placed midway between the droplets of the previous layer.
- Droplet: 2.5 mm³ on the surface, 4 mm³ on the ribs (where the contour runs radially); extruded in place at 6 mm³/s. 5140 droplets total, 5090 of them on the ribs.
- Strand between droplets: 0.35 × 0.2 mm (0.07 mm³/mm), 15 mm/s
- Travel across holes: 0.8 mm retraction, 0.6 mm lift, travel at 60 mm/s, descend, 0.8 mm unretraction. 719 travel moves total.
- Print time: 71 min 19 s (excluding start and end); filament: 8847 mm

</details>
