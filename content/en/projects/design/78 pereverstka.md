---
caption: Poster Generator for Igor Shtang's “Pereverstka”
cover: /assets/media/pereverstka.mp4
span: 2
---

# Poster Generator for Igor Shtang's “Pereverstka”

<video src="/assets/media/pereverstka.mp4" loop mute autoplay></video>

The layout is built on a grid of 15 square modules: 5×3.

Images

- There are always a large piece of the picture and many smaller ones.
- There are 3 different arrows on the background.
- A circle for the date is also chosen from 10 pre-prepared ones.

Text

- All text blocks are adjacent, except for the date.
- One title line is aligned left, another — right.
- Small text is editable.
- Font lettering for each header line is chosen randomly out of 3 grotesque and 3 antiqua.

## Implementation

The whole thing is an html page, no canvas used. All blocks are div elements aligned with CSS grid. I used its ability to pack rects automatically to fill the space with minimal amount of gaps.

To save the resulting image I use [html2canvas](https://html2canvas.hertzen.com) library.

![](/assets/media/pereverstka2.jpeg)
{: style="width: 500px;max-width: 100%; display: inline-block;"}

![](/assets/media/pereverstka3.jpeg)
{: style="width: 500px;max-width: 100%; display: inline-block;"}

![](/assets/media/pereverstka4.jpeg)
{: style="width: 500px;max-width: 100%; display: inline-block;"}

