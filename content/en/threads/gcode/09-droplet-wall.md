---
date: 2026-09-22
images:
  - /assets/media/gcode-droplet-wall-01.jpg
  - /assets/media/gcode-droplet-wall-02.jpg
---

<!--autotranslate-->

A droplet wall: droplet volume increases within each revolution, while the spiral pitch gradually grows from bottom to top. In the upper section, the connecting strand could no longer hold the droplets together, and the structure unraveled into loops.

## Geometry

- Cylinder radius: 5 mm (10 mm diameter)
- Total print height: 60.2 mm (0.2 mm base + 60 mm droplet wall)
- Angular step between droplets: 10°, or 36 droplets per revolution
- Horizontal arc distance between adjacent droplets at a 5 mm radius: 0.873 mm

## Spiral pitch

Vertical rise per revolution:

- from 1 mm at the bottom to 10 mm at the top
- one smooth linear transition over the full height

## Droplet volume

- From 0.01 mm³ to 5 mm³
- Angular sawtooth: linear growth over the full revolution (0→360°), followed by an abrupt reset to the minimum at the start of the next revolution
- Each droplet is extruded in place without nozzle movement: the nozzle travels to the point and extrudes while stationary

## Droplet extrusion speed

- Constant: 50% of the donor filament profile's maximum volumetric flow. For PETG on the P1S this is 12 mm³/s, so the experiment uses 6 mm³/s regardless of droplet size
- Converted to filament feed for 1.75 mm filament: 2.5 mm/s; in G-code this is `F150`

## Connecting strand

It holds the droplets together around the circumference; without it, the structure cannot stand.

- Width: 0.35 mm
- Cross-section height: 0.2 mm
- Volume per millimeter of travel: 0.07 mm³/mm
- Travel speed: 15 mm/s
- Independent of spiral pitch, so its thickness remains constant

## Base

- Solid disk for bed adhesion
- Spiral from center to edge, with a 0.5 mm line width and 0.2 mm height
- The number of turns is chosen for approximately 10% overlap, leaving no gaps

**Donor:** L-profile by Justagwas  
**Material:** PETG  
**Printer:** Bambu Lab P1S  
**Nozzle:** 0.4 mm
