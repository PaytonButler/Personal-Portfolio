# Payton Butler - Personal Portfolio

A clean, fast personal website. No frameworks, no build step, no npm. Just files.

---

## Project Structure

```
payton-portfolio/
│
├── index.html          
│
├── css/
│   └── style.css       
│
├── js/
│   ├── projects.js     
│   └── main.js         
│
├── assets/             
│   └── resume.pdf
│
└── README.md
```

---

## How to Add or Update a Project

Open `js/projects.js`. You'll see an array called `PROJECTS`. Each object is one card.

**To add a project**, paste a new object at the top of the array (newest first):

```js
{
  title: "My New Project",
  description: "A short 1–2 sentence description of what it does and why.",
  tags: ["React", "Node.js", "PostgreSQL"],   // Keep to 4–6 max
  github: "https://github.com/PaytonButler/repo-name",  // or null
  live:   "https://your-live-site.com",                 // or null
  highlight: false,   // Set true to pin it with an accent border (use sparingly)
},
```

**That's it.** Save the file — the page re-renders the grid automatically from the array.
No HTML to touch. No IDs to manage.

---

## Editing the Design

All design tokens (colors, fonts, spacing) live at the very top of `css/style.css`
under `:root { ... }`. Changing a color there updates it everywhere on the site.

Key tokens:
- `--color-accent` — the coral orange highlight color
- `--color-bg` — page background
- `--font-display` / `--font-mono` — typefaces
