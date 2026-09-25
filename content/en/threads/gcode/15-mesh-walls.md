---
date: 2026-09-25
---

<!--autotranslate-->

::: gallery
![Four experimental walls made of knots and strands, side view](https://ik.imagekit.io/ivandianov/threads/gcode/mesh-walls/01.jpg)
![Four experimental walls made of knots and strands, top view](https://ik.imagekit.io/ivandianov/threads/gcode/mesh-walls/02.jpg)
:::

I asked Claude to come up with four walls made of knots and strands on its own.

<details>
<summary>Print parameters</summary>

**Four mesh walls — 2026-09-24** (sketch `2026.09.24 mesh walls`, commit `8953858`)

**General:**

- Printer, filament, temperatures, and cooling are the same as above
- Four 20 × 4 × 20 mm walls (length × thickness × height) at the corners of a 100 × 100 mm square: A (78, 78), B (178, 78), C (78, 178), D (178, 178)
- The walls are printed one at a time, each in full: A, B, C, D
- Base of each wall: two solid 0.2 mm layers, 0.45 mm lines along the wall, 20 mm/s
- The wall faces run at y = ±1.2 mm from the centerline
- Strand: 0.35 × 0.2 mm (0.07 mm³/mm), 15 mm/s
- Droplets are extruded in place at 6 mm³/s
- Travel between walls: 0.8 mm retraction, lift to 1 mm above everything already printed, travel at 100 mm/s, descend, unretract
- Print time: 8 min 42 s (excluding start and end); filament: 598 mm

**A “Truss” (bottom left):**

- Six nodes along the wall at 3.6 mm intervals (x = −9…9), alternating between the front and rear faces to form a zigzag in plan view
- A 3 mm³ droplet at each node; node positions stay the same in every row
- Rows alternate direction
- 1.2 mm row height, 16 rows total

**B “Running bond” (bottom right):**

- 2.5 mm³ droplets on both faces at 4 mm intervals
- In even rows, droplets sit at x = −8, −4, 0, 4, 8; in odd rows, at x = −9, −6, −2, 2, 6, 9
- Each row is a closed loop: front face, crosspiece, rear face, crosspiece
- 1.2 mm row height, 16 rows total

**C “Rails and posts” (top left):**

- Seven tiers, each 2.86 mm high
- A rail is a continuous line around the perimeter of a tier. The first rests on the base (0.45 × 0.2 mm, 20 mm/s); the others bridge across the tops of the posts (0.45 × 0.3 mm, 8 mm/s). Eight rails total.
- Posts: four on each face per tier; bases spaced 5 mm apart; tops shifted 2.5 mm along the wall
- Each post is printed upward at 0.12 mm³/mm and 4 mm/s, followed by a 0.6 s pause at the top
- Post lean alternates from tier to tier
- Travel between posts: 0.8 mm retraction, 0.5 mm lift

**D “Braid with stitches” (top right):**

- Five nodes on each face (x = −8…8, 4 mm spacing)
- Even rows: crisscrossed strand, two zigzags between the faces
- Odd rows: ladder pattern — front face, crosspiece, rear face, crosspiece
- A stitch at each node: strand down to 0.2 mm above the row below; 1 mm³ extruded in place; strand back up; 3 mm³ droplet
- 2 mm row height, 10 rows total

</details>
