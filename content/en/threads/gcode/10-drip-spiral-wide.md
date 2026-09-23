---
date: 2026-09-23
---

<!--autotranslate-->

::: gallery
![Droplet spiral with a ruler — sector 1](/assets/threads/gcode/drip-spiral-wide/01.webp)
![Droplet spiral with a ruler — sector 2](/assets/threads/gcode/drip-spiral-wide/02.webp)
![Droplet spiral with a ruler — sector 3](/assets/threads/gcode/drip-spiral-wide/03.webp)
![Droplet spiral with a ruler — sector 4](/assets/threads/gcode/drip-spiral-wide/04.webp)
![Full view of the droplet spiral](/assets/threads/gcode/drip-spiral-wide/05.webp)
![Droplets and connecting strand close up](/assets/threads/gcode/drip-spiral-wide/06.webp)
![Surviving section of the droplet spiral](/assets/threads/gcode/drip-spiral-wide/07.webp)
:::

Droplet spiral.

An idea for the next iteration: touch the previous turn with the nozzle before extruding each droplet, so that the layers fuse more reliably.

<details>
<summary>Experiment data</summary>

Pitch is how far each turn sits above the previous one, i.e. the height from which a droplet is extruded onto the turn below.

| Droplet, mm³ | Knots begin at pitch, mm | Maximum pitch, mm |
|---|---|---|
| 1.00 | — (no knots) | 1.14 |
| 1.50 | 1.14 | 1.14 |
| 2.00 | 1.21 | 1.35 |
| 2.50 | 1.21 | 1.41 |
| 3.13 | 1.41 | 1.48 |
| 3.63 | 1.41 | 1.76 |
| 4.00 | 1.55 | 1.76 |

**Print parameters**

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: 255 °C nozzle, 70 °C bed
- Part cooling fan: 100%
- Cylinder Ø40 mm, centered at X128 Y128
- Base: 3 spiral turns at Z 0.2 mm (radii 18.65…20 mm), 0.5 × 0.2 mm line, 20 mm/s
- First wall turn at Z 0.7 mm, or 0.5 mm above the base
- 25 droplets per revolution, 14.4° step, 5.03 mm arc distance between droplets
- Connecting strand: 0.35 × 0.2 mm, 15 mm/s
- Pitch remains constant within each revolution and increases stepwise on every new revolution: from 1.0 mm (turn 1) to 3.0 mm (turn 30), `h(n) = 1 + 2·(n−1)/29`
- Droplet volume follows a sawtooth over every revolution, growing from 1 to 4 mm³: `V(i) = 1 + 3·i/24`, i = 0…24
- Each droplet is extruded in place at 6 mm³/s: 1 mm³ in 0.17 s, 4 mm³ in 0.67 s
- 30 revolutions, total height 60.7 mm
- Print time: 9 min 44 s; filament: 904 mm

**Observations**

- The larger the droplet, the higher the wall remains intact and the later the pearl-like beads turn into knots.
- In every sector, the wall breaks within 0–5 revolutions after the knots begin to appear.

</details>
