---
date: 2026-09-23
---

<!--autotranslate-->

![The first three turns of the droplet spiral with a nozzle dip](/assets/threads/gcode/drip-spiral-dip/01.webp)

Droplet spiral with a nozzle dip: before each droplet, the nozzle drops down to the droplet on the previous turn.

I printed the first 3 turns. Every droplet came out smooth, no knots. When the nozzle moves sideways after a droplet, the strand at the droplet thins almost to breaking.

<details>
<summary>Experiment data</summary>

| Droplet, mm³ | Pitch, mm | Result |
|---|---|---|
| 1 + 4.00 … 1 + 8.00 | 1.50 / 1.56 / 1.62 (turns 1–3) | smooth droplets; the strand thins almost to breaking at the droplet |

**Print parameters**

- Bambu Lab P1S, 0.4 mm nozzle, Textured PEI Plate
- Syntech PETG White, Ø1.75 mm
- Temperatures: 255 °C nozzle, 70 °C bed
- Part cooling fan: 100%
- Cylinder Ø40 mm, centered at X128 Y128
- Base: 3 spiral turns at Z 0.2 mm (radii 18.65…20 mm), 0.5 × 0.2 mm line, 20 mm/s
- 25 droplets per revolution, 14.4° step, 5.03 mm arc distance between droplets
- Flat turns: all droplets of a revolution at one height, the lift to the next turn happens at the end of the revolution
- Pitch increases stepwise on every revolution: from 1.5 mm (turn 1) to 3.0 mm (turn 27), `h(n) = 1.5 + 1.5·(n−1)/26`
- Droplet volume follows a sawtooth over every revolution, from 4 to 8 mm³: `V(i) = 4 + 4·i/24`, i = 0…24
- Each droplet:
  1. 0.35 × 0.2 mm strand at 15 mm/s to the next droplet, at turn height;
  2. travel down without extrusion at 10 mm/s to the top of the droplet on the previous turn + 0.2 mm;
  3. 1 mm³ extruded in place (6 mm³/s);
  4. rise back to turn height while extruding V(i) at 6 mm³/s (≈1–3 mm/s);
  5. 1 s pause.
- Full file: 27 turns, 61.0 mm tall, 30 min 49 s, 2078 mm of filament; the first 3 turns were printed

**Observations**

- Dipping the nozzle to the previous turn did not produce knots: at 1.5–1.62 mm pitch and 5–9 mm³ droplets, every droplet is smooth.
- The weak spot is where the strand leaves the droplet. A possible cause: during the 1 s pause under full cooling the top of the droplet cools down, so the thin strand (0.07 mm³/mm) barely fuses to it and gets stretched instead.

</details>
