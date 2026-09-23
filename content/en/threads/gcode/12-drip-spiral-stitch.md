---
date: 2026-09-23
---

<!--autotranslate-->

::: gallery
![Droplet spiral stitch, close-up](https://ik.imagekit.io/ivandianov/threads/gcode/drip-spiral-dip/02.webp)
![Droplet spiral stitch, side view](https://ik.imagekit.io/ivandianov/threads/gcode/drip-spiral-dip/03.webp)
![Droplet spiral stitch, high-pitch side](https://ik.imagekit.io/ivandianov/threads/gcode/drip-spiral-dip/04.webp)
![Droplet spiral stitch, three-quarter view](https://ik.imagekit.io/ivandianov/threads/gcode/drip-spiral-dip/05.webp)
![Droplet spiral stitch, full view](https://ik.imagekit.io/ivandianov/threads/gcode/drip-spiral-dip/06.webp)
:::

Droplet spiral stitch

Another test print of a spiral with changing parameters. The new algorithm:

1. The nozzle travels to the new knot with normal extrusion.
2. It descends with extrusion toward the previous turn, stopping 0.2 mm short.
3. It extrudes 1 mm³ in place.
4. It rises back to the turn height with normal extrusion.
5. It extrudes the droplet.

Pitch: 2…5 mm. Droplet volume: 4…8 mm³.

Some interesting observations:

- I realized too late that on the taller turns the toolhead should hit neighboring droplets. It never did. Possibly the droplets ended up below their intended height because the openwork structure sagged.
- At low droplet volumes the turns fell apart, but not completely: they still fused a little.
- I thought the strand in the previous spiral broke because of the long pause before travel. But perhaps it happened because the nozzle descended without extrusion and pulled on the short horizontal strand.

<details>
<summary>Experiment data</summary>

**Droplet spiral stitch — 2026-09-23** (sketch `2026.09.23 drip spiral stitch`, commit `67fa49a`)

**Ranges**

- **Droplet volume: 4 to 8 mm³.** It follows a sawtooth over every revolution: the first droplet (0°) is 4 mm³ and the last one (345.6°) is 8 mm³, increasing by 1/6 mm³ ≈ 0.167 mm³ per droplet. Formula: `V(i) = 4 + 4·i/24`, i = 0…24.
- **Pitch: 2 to 5 mm.** It stays constant within each revolution and increases stepwise by 0.1875 mm on every new revolution. Formula: `h(n) = 2 + 3·(n−1)/16`, n = 1…17. Values by turn, mm: 1 — 2.00 · 2 — 2.19 · 3 — 2.38 · 4 — 2.56 · 5 — 2.75 · 6 — 2.94 · 7 — 3.13 · 8 — 3.31 · 9 — 3.50 · 10 — 3.69 · 11 — 3.88 · 12 — 4.06 · 13 — 4.25 · 14 — 4.44 · 15 — 4.63 · 16 — 4.81 · 17 — 5.00.

**Print parameters**

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: 255 °C nozzle, 70 °C bed
- Part cooling fan: 100%
- Cylinder Ø40 mm, centered at X128 Y128
- Base: 3 spiral turns at Z 0.2 mm (radii 18.65…20 mm), 0.5 × 0.2 mm line, 20 mm/s
- 25 droplets per revolution, 14.4° step, 5.03 mm arc distance between droplets
- Flat turns: every droplet of a revolution is at the same height; the lift to the next turn happens at the end of the revolution
- Each droplet:
  1. A 0.35 × 0.2 mm strand (0.07 mm³/mm) at 15 mm/s to the next droplet, at turn height.
  2. Descend with the same strand at 15 mm/s to the top of the droplet on the previous turn + 0.2 mm.
  3. Extrude 1 mm³ in place (6 mm³/s).
  4. Rise with the same strand at 15 mm/s back to turn height along the same vertical line.
  5. Extrude droplet V(i) in place at 6 mm³/s (4 mm³ in 0.67 s, 8 mm³ in 1.33 s).
- 17 turns, total height 59.7 mm
- Print time: 14 min 7 s; filament: 1396 mm

</details>
