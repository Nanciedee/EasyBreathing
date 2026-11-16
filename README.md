# 🌿 Easy Breathing

A personal 14-day relaxation and meditation program, built as a simple website
(HTML, CSS and JavaScript only, with no framework and no build step).
The interface is in French.

---

## Features

- **Dashboard** with an overview, a progress bar and the first 6 days of the program
- **Full program page** listing all 14 days
- **Daily session pages** with guided steps: narration, breathing, silent pause
  (with countdown timer), affirmation, gradual return and personal reflection
- **Progress tracking**: mark a day as completed (or undo it). The completion
  date is recorded and shown on the day page
- **Automatic saving**: progress and your reflection answers are saved in the
  browser (`localStorage`) as you go, and are still there next time
- **Printable PDF of each day**: on a day page, "Exporter en PDF / Imprimer" opens
  a clean A4 layout (objective, every step, ruled lines for your reflection
  answers, or your saved answers). Choose "Save as PDF" in the print dialog
- **Backup**: export your progress to a `.json` file, import it back (for example
  on another device), or reset everything from the dashboard ("Ma sauvegarde")
- **Responsive design** with a mobile menu
- **Theme**: royal-to-navy blue gradient with a light reflection, gold text,
  cursive headings (*Great Vibes*) and an elegant serif body (*Cormorant Garamond*)

---

## Project structure

```
easy-breathing/
├── index.html                    Page structure
├── style.css                     All styling and the blue/gold theme
├── script.js                     Navigation, day cards, progress, session display
├── sessions.js                   Detailed content of each daily session
├── easy-breathing-complet.html   All of the above in one single file
└── README.md
```

> `easy-breathing-complet.html` is a standalone copy: it works on its own.
> If you edit the separate files, regenerate it (or just use `index.html`).

---

## How to run

**Option A: single file (easiest)**
Double-click `easy-breathing-complet.html`.

**Option B: separate files**
Put `index.html`, `style.css`, `script.js` and `sessions.js` in the **same folder**,
with exactly these names, then open `index.html`.

> If the page looks unstyled or the day cards are missing, one of the files is
> missing, renamed (for example `style (1).css`) or in another folder.

An internet connection is needed only to load the Google Fonts. Without it, the
browser falls back to default cursive and serif fonts and everything else still works.

---

## Adding or editing session content

Each day's detailed content lives in `sessions.js`. Only Day 1 is written so far.
Days without a session show a placeholder message.

To add Day 2, append an object to the `sessions` array:

```js
{
  id: 2,
  day: 2,                       // must match the day number (1 to 14)
  title: "Relaxation Alpha",
  duration: 20,
  objective: "Learn to relax deeply and progressively.",
  steps: [
    { id: "day2-step1", type: "narration",   title: "Welcome",  text: "..." },
    { id: "day2-step2", type: "pause",       title: "Silence",  duration: 30 },
    { id: "day2-step3", type: "affirmation", title: "Affirmation", text: "..." },
    { id: "day2-step4", type: "reflection",  title: "Reflection",
      questions: ["How do you feel?", "What stood out today?"] }
  ]
}
```

**Supported step types:** `narration`, `breathing`, `pause` (uses `duration` in
seconds), `affirmation`, `return`, `reflection` (uses a `questions` list).

The titles, durations and short descriptions shown on the day cards are in the
`days` array at the top of `script.js`.

---

## Customizing the look

All theme colors and fonts are CSS variables at the start of the
**"THEME : BLEU ROYAL -> MARINE"** block at the end of `style.css`:

```css
--royal: #1d3fb0;      /* royal blue */
--navy: #07133a;       /* navy */
--gold: #e3c46c;       /* main text gold */
--gold-bright: #f6e3a1;
--font-script: "Great Vibes", cursive;
--font-body: "Cormorant Garamond", Georgia, serif;
```

Change the values there to adjust the whole site. To use other fonts, update the
Google Fonts `<link>` in `index.html` and the two font variables.

---

## Exporting a day as PDF

Open any day, then click **"Exporter en PDF / Imprimer"** (or press Ctrl/Cmd + P
on the day page). In the print dialog, choose **"Save as PDF"** as the printer to
get a file, or pick a real printer to print on paper.

The sheet contains the day's title and duration, its objective, all the steps,
and the reflection questions. If you already typed answers they are printed;
otherwise blank ruled lines are left to write by hand. It needs no internet
connection and no extra library.

---

## Saving and backing up your progress

Everything is saved automatically in your browser under the key
`easyBreathingProgress` (completed days with their dates, and reflection answers).
A status line on the dashboard shows when the last save happened.

Because the data lives in the browser, it can be lost if you clear your browser data,
switch browser or device, or use private browsing. To keep a safe copy:

- **Export**: dashboard → "Exporter la sauvegarde (.json)" downloads a `.json` file
- **Import**: dashboard → "Importer une sauvegarde" restores that file
  (it replaces the current progress, after a confirmation)
- **Reset**: dashboard → "Réinitialiser" erases all progress and answers
  (after a confirmation)

Older progress saved by a previous version (`easyBreathingCompletedDays`) is
migrated automatically.

---

## Known limitations

- Progress is stored per browser and per device (no account or automatic sync): use export/import to move it
- Sessions for Days 2 to 14 still need to be written

---

## Browser support

Any modern browser (Chrome, Edge, Firefox, Safari), on desktop and mobile.
