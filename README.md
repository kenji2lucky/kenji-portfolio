# Kenji2Lucky Portfolio — Final Art-Based Build

This version is designed around your finished Photoshop artwork. The website does **not** try to redraw the design with generic CSS. Instead, it uses your exported PNGs as the visual shells and places real links, text, Mux video players, and automatic video durations on top of the exact areas you designed.

## 1. Files that control each visual section

- Hero / main banner: `assets/hero/hero-banner.png`
- Clients section background: `assets/clients/clients-background.png`
- Liro client dossier: `assets/clients/client-liro.png`
- Featured Works shell: `assets/featured/featured-shell.png`
- Footer / contact banner: `assets/footer/footer-banner.png`

To redesign one section later, export a new PNG with the **same pixel dimensions** and replace only that file.

Current source dimensions used by the layout:

- Hero: 2048 × 808
- Clients background: 2048 × 568
- Client dossier: 571 × 385
- Featured Works: 2048 × 1176
- Footer: 2048 × 532

The browser scales them responsively. Dynamic hotspots and Mux windows use percentage coordinates, so they stay aligned as the artwork scales.

## 2. The one file you edit for content

Open `content.js`.

It contains:

- X link
- Discord link
- client cards and channel URLs
- project titles
- Mux Playback IDs

### Change a project

Edit its `title` and `playbackId` in `content.js`.

The project title is real HTML text using **Anton**, so it is not baked into the Featured Works PNG.

The video duration is automatic. When Mux loads the video metadata, JavaScript reads the real duration and puts it into the black duration box in your artwork.

You do **not** type the duration manually.

## 3. Client link

The Liro card is already included visually, but you did not provide the exact YouTube channel URL in this chat.

In `content.js`, find:

```js
url: "",
```

and paste the exact channel URL between the quotes, for example:

```js
url: "https://www.youtube.com/@EXACT_CHANNEL",
```

Until you add it, the card remains visible but is intentionally not clickable. This avoids sending visitors to a wrong or broken link.

### Remove all clients

Change:

```js
clients: [ ... ]
```

to:

```js
clients: []
```

The entire Clients / Collaborations section disappears and leaves no gap.

### Add another client

1. Export the new dossier PNG.
2. Put it in `assets/clients/`.
3. Add another object inside `clients` in `content.js`.

The section currently has three fixed dossier slots because that matches your 2048×568 artwork.

## 4. Hero buttons

The visible buttons are part of your hero PNG, but transparent HTML click areas are placed on top of them.

- **SEE MY WORK** scrolls to Featured Works.
- **GET IN TOUCH** scrolls to the Footer / Contact section.

You do not need to add links inside Photoshop.

## 5. Footer buttons

The Discord and X icons are part of the footer artwork, with transparent HTML links on top.

Current links:

- Discord: `https://discord.com/users/986068729307754496`
- X: `https://x.com/Kenji2lucky`

Change them only in `content.js`.

## 6. Mux behavior

The three right-hand video windows in the Featured Works artwork are covered by real Mux players.

Behavior:

- muted previews
- autoplay when a video is substantially visible
- pause when it leaves the viewport
- only the most-visible preview plays
- click the video or the artwork's **PLAY VIDEO** area to open the full video player
- duration badge is filled automatically from the actual Mux video metadata

Mux Player is loaded from the official CDN, so this site needs an internet connection for video playback.

## 7. Anton font

Project titles use Anton from Google Fonts so they render consistently across devices.

If the font network request is unavailable, the CSS falls back to Impact / condensed sans-serif fonts.

## 8. Upload to GitHub Pages

You already have a GitHub Pages repository.

1. Unzip this project.
2. Open the project folder.
3. Upload **everything inside the folder** to the root of your existing GitHub repository.
4. Replace the old files when GitHub asks.
5. Commit the changes.
6. Wait a minute or two for GitHub Pages to deploy.
7. Refresh your existing portfolio URL.

Do not upload only the ZIP.

All paths are relative (`./assets/...`) so they work correctly inside a GitHub Pages project subdirectory such as `/kenji-portfolio/`.

## 9. Important Photoshop rule for future Featured Works edits

Do not put project titles or durations back into the PNG.

Keep these areas empty:

- the left title areas
- the black duration boxes
- the three video windows

Those are filled by the live website.

You can freely redesign everything around those holes as long as their positions remain the same. If you move the holes, the CSS percentage coordinates in `styles.css` need to be updated to match.
