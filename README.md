# Project: Color Palette Demo

## Overview
This is a lightweight static web project that demonstrates a full‑theme implementation using the color palette you provided:

- **Primary dark:** `#07111F`
- **Secondary dark blue:** `#0B1B33`
- **Primary blue:** `#2563EB`
- **AI purple:** `#7C3AED`
- **Cyan accent:** `#06B6D4`
- **Light background:** `#F6F8FC`
- **Soft background:** `#F8FAFC`
- **White:** `#FFFFFF`
- **Main text:** `#0F172A`
- **Muted text:** `#64748B`

The project consists of three files:

| File | Purpose |
|------|---------|
| `index.html` | Page markup with a navigation bar, hero section, feature cards, and a dark‑mode toggle button. |
| `styles.css` | Defines CSS **variables** for every color and sets up both **light** and **dark** theme rules. All component styles reference these variables, so changing a palette entry updates the whole UI instantly. |
| `script.js` | Handles the theme toggle, persisting the user’s choice in `localStorage`. |

## How the theme works
1. All colors are stored as **CSS custom properties** (`--primary-dark`, `--primary-blue`, …) inside `:root`.
2. Two theme containers – `[data-theme="light"]` and `[data-theme="dark"]` – map those variables to concrete background, text, and accent colors.
3. Every component (navbar, buttons, cards, etc.) uses the semantic variables (`var(--bg-color)`, `var(--text-color)`, `var(--primary-blue)`, …). This makes the UI automatically adapt when the theme switches.
4. The JavaScript toggles the `data-theme` attribute on the `<html>` element and saves the selection.

## Changing the palette
To adjust the colors globally, edit only the **variable definitions** in `styles.css`:

```css
:root {
  --primary-dark: #07111F;   /* Update this value */
  --secondary-dark-blue: #0B1B33;
  --primary-blue: #2563EB;
  --ai-purple: #7C3AED;
  --cyan-accent: #06B6D4;
  --light-bg: #F6F8FC;
  --soft-bg: #F8FAFC;
  --white: #FFFFFF;
  --main-text: #0F172A;
  --muted-text: #64748B;
}
```

After saving the file, reload the page – the new colors will be reflected everywhere.

## Running the project
1. Open `index.html` in any modern browser (no server needed).
2. Click **Toggle Dark** to switch between the light and dark themes.
3. To develop further, you can serve the folder with a static server, e.g.:
   ```bash
   npx serve .
   ```
   (requires Node.js).

## Extending the project
- **Add more components** – use the same CSS variables for colors.
- **Integrate with a framework** – copy `styles.css` and the variable definitions into your framework’s global stylesheet, and keep the `data-theme` attribute logic.
- **Customize the toggle UI** – modify `script.js` or replace the button with a switch component.

---
*Created with the Antigravity AI coding assistant.*
