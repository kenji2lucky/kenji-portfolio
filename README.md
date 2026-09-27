# Kenji2lucky portfolio

A static, modular gaming-editing portfolio. No installation, build step, API keys, or video uploads to GitHub are needed.

## Put it on GitHub Pages — five steps

1. Unzip `kenji-portfolio.zip`, then open the `kenji-portfolio` folder.
2. Open your GitHub repository (for example, `kenji-mov/kenji-portfolio`). Choose **Add file → Upload files**.
3. Drag **everything inside** the folder into GitHub: `index.html`, `styles.css`, `app.js`, `content.js`, the entire `assets` folder, and the other included files. **Do not upload the ZIP or nest the outer folder.** `index.html` must be at the repository's top level. Commit the changes. If your file picker hides `.nojekyll`, the plain files still work; you can add that empty file through GitHub later.
4. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then **main** and **/ (root)**. Save. If Pages is already configured that way, leave it alone.
5. Wait for the deployment to finish, then use the link GitHub shows. For the example above it is `https://kenji-mov.github.io/kenji-portfolio/`.

To update the site later, upload just the changed files to the same locations and commit again. Keep folder names and capitalization identical. A hard refresh can clear an older cached image.

Official help: [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Where to edit

**`content.js` is your editing desk.** Open it in a plain-text editor (not Word). All portfolio copy, links, image paths, project titles, and Mux playback IDs live there. Keep the surrounding quotes and commas. Text within `//` comments does not appear on the site.

- `hero`: name, specialty, top banner artwork, and button labels.
- `clients`: client dossiers. Starts as `[]`, so the entire client section is hidden.
- `projects`: the three stacked work cards. Add, remove, or reorder entries freely.
- `contact`: contact heading and bottom artwork.
- `socials`: your actual X and Discord links.
- `labels`: common button and dossier labels.

`styles.css` controls colors and layout; you do not need to edit it to replace images or content. `app.js` renders the independent sections and handles video behavior.

## Replace one visual without affecting the others

Replace a file with your new image, keeping the same name, then upload it. Or change only that image's path in `content.js`. PNG, JPG, WebP, and SVG work; when changing file type, change the extension in the data too. **Renaming a JPG to `.png` does not convert it.**

| Visual | File or field | Suggested shape | Missing-image fallback |
|---|---|---|---|
| Hero art on the right | `assets/hero-art.png` → `hero.art` | 3:2, 1536×1024 or larger | Dark texture and K2L mark; text/buttons stay |
| Complete approved hero PNG | Add `assets/hero-banner.png`; set `hero.banner` to that path | Wide banner; any ratio | Returns to the editable split hero |
| Client avatar | `assets/clients/client-name.png` → that client's `image` | Square, 400×400 or larger | Client initials |
| Project thumbnail | `assets/projects/project-01.jpg` → that project's `poster` | 16:9, 1280×720 or larger | Mux thumbnail, then dark K2L placeholder |
| Bottom decorative artwork | `assets/bottom-art.png` → `contact.art` | 3:1, about 2100×700 | Dark texture; contact links remain |
| Complete bottom PNG | Add `assets/bottom-banner.png`; set `contact.banner` | Wide banner; any ratio | Returns to the editable contact layout |
| Paper texture | `assets/grain.svg` | Tileable texture | Solid cream/black |
| Browser icon | `assets/favicon.svg` | Square | Browser default |

The two banner artwork files are included. Whole-banner files, project poster overrides, and client photos are optional and are not loaded until you enable them.

### Use your existing approved banner exactly

Save your approved **hero-only** PNG as `assets/hero-banner.png`. Under `hero` in `content.js`, change:

```js
banner: "",
```

to:

```js
banner: "assets/hero-banner.png",
```

This replaces the complete visual face of the hero. The real **See my work** and **Get in touch** buttons sit below it, so the links keep working on mobile. The screenshot's painted buttons are not interactive. For no duplicate button artwork, export your banner without painted buttons. Set `banner` back to `""` to restore the editable layout.

Use `contact.banner` the same way for the complete bottom banner. Your real Discord/X links remain underneath it.

**Do not upload a screenshot of the entire page as the hero.** Use only the relevant section. Each client is a real HTML card, each project is a separate playable card, and the contact area is independent.

## Add client dossiers

Replace `clients: [],` with the following, filling in your real details:

```js
clients: [
  {
    name: "Client name",
    image: "assets/clients/client-name.png",
    platform: "YouTube",
    niche: "GTA RP",
    status: "Collaborator",
    description: "A short description of your work together.",
    url: "https://www.youtube.com/@theirhandle"
  }
],
```

Put the photo in `assets/clients`. Duplicate the object to add more clients, with a comma between objects. Keep `url: ""` if you do not want a channel link, and `image: ""` to use initials. Remove every object so it reads `clients: []` to hide the whole section again. No example or unconfirmed client is published by default.

## Change a project

Each object in `projects` controls one large card:

```js
{
  title: "Your exact video title",
  category: "GTA RP",
  description: "", // optional; blank hides it
  playbackId: "YOUR_MUX_PLAYBACK_ID",
  poster: "", // blank uses Mux's thumbnail
  posterTime: 10 // thumbnail frame, in seconds
}
```

The three requested titles and IDs are already installed. Durations, view counts, and 4K claims are intentionally omitted because they were not verified.

## Video behavior

- A preview plays muted and loops when at least 45% of its video area is visible.
- It pauses when it leaves view, when the browser tab is hidden, or when the full player is open.
- **Play video** or clicking the video image opens a large player with playback, volume, timeline, and fullscreen controls.
- Close it with **Close ×**, Escape, or a click outside the dialog. Keyboard focus returns to the button that opened it.
- **Pause previews** stops automatic previews. Reduced-motion or data-saving preferences disable automatic previews initially; visitors can choose to resume them.
- Browser battery/data policies can block autoplay; manual play remains available.
- Videos stream from Mux. Use public playback IDs; no secret keys belong in this repository. Signed/private playback would require a separate token service and is outside this static setup.

The page loads Mux Player 3.13.4 from jsDelivr and two display fonts from Google Fonts. Without those services, system fonts and image/text fallbacks remain. Video playback requires internet access and available Mux assets. Mux may collect playback analytics through its player.

Reference: [Mux playback guide](https://www.mux.com/docs/guides/play-your-videos).

## Preview before uploading

Double-click `index.html` for a quick layout preview. A local file preview can be restricted by browser media rules; GitHub Pages is the intended environment. For a closer preview, use an editor's local preview server, or (if Python is installed) open a terminal in this folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## About the supplied artwork

The previous conversation's full-page mockup and banner reference guided the layout. This package reconstructs the sections as editable HTML/CSS and includes two newly generated, separate decorative images; it is not a pixel-perfect extraction of the previous banner. You can drop in your approved original banner using the instructions above. The original `/mnt/data/image.png` path was not available in this desktop session, so the attached references from the linked conversation were used.

The included banner images were made using the built-in image generation tool. Their exact prompts are in `ASSET-PROMPTS.txt`. No client identity or collaboration was invented.
