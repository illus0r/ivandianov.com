# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio/blog for a generative artist, built with **Eleventy (11ty) v3.0.0**. Bilingual site (Russian/English) featuring projects, blog posts, and a "Threads" feature (micro-post chains like Twitter/Tumblr).

## Commands

```bash
pnpm serve             # Dev server with hot reload at http://localhost:8080
pnpm build             # Production build to _site/

# Link validation (after build)
pnpm exec linkinator _site --recurse --skip "node_modules|.git"
```

## Architecture

### Bilingual Content System

Content lives in `content/ru/` and `content/en/` with mirrored structure. Each post/page needs versions in both languages with identical frontmatter structure.

- `content.11tydata.js` handles: draft exclusion, permalink generation, empty content skipping
- `antiLang` filter converts language codes (ru↔en)
- `getTranslationUrl` filter finds corresponding page in other language

### Threads Feature

Micro-blogging within the site. Each thread is a folder with numbered markdown files:

```
content/ru/threads/gcode/
  01-cellular.md
  02-snake.md
  gcode.11tydata.js    # Sets layout, lang, threadName, permalink

assets/threads/gcode/  # Images shared across languages (no ru/en split)
```

- URL pattern: `/ru/gcode/spiky/` (numeric prefix stripped from filename)
- Sorted reverse numeric (higher = newer, shown first)
- Thread collections auto-generated in `.eleventy.js` via `setupThreadCollections()`
- Thread index date = latest post's date

### Key Configuration (.eleventy.js)

- **Transforms**: `groupImages` (wraps consecutive images in `.image-row`), `danceHeaders` (wraps chars in spans for animation)
- **Image processing**: Eleventy Image plugin → WebP at 512/1024/2048px widths
- **Markdown**: markdown-it with `markdown-it-attrs` (`{.class}` syntax) and `markdown-it-bracketed-spans` (`[text]{.class}`)

### Collections

- `posts`: tag "post", sorted by date desc
- `menu`: items with numeric `menu` field, sorted asc
- `projects`: tag "projects"
- `thread[Name]`: auto-generated per thread (e.g., `threadGcode`)

### Templates (_includes/)

- `default.njk` — base HTML layout
- `post.njk` — blog post layout
- `thread-index.njk` — thread feed page
- `thread-post.njk` — individual thread post

## Content Workflow

1. Create content in both `content/ru/` and `content/en/`
2. Keep frontmatter identical between languages
3. For threads: place images in `assets/threads/[threadname]/` (shared across languages)
4. Use `draft: true` in frontmatter to exclude from build
5. Run `npm run serve` to verify both languages
6. After build, validate links but **don't auto-fix broken links** — warn user instead

## Media

Git LFS handles large files (jpg, mp4, etc.). Images processed to WebP automatically.
