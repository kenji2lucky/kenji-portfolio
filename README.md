# Kenji2Lucky Portfolio — Fixed Build

This build keeps your Photoshop artwork as the visual source of truth and fixes the web implementation around it.

## What changed in this version

- Added the K2L dice logo as the browser favicon and Apple touch icon.
- Preserved every banner's natural aspect ratio. The website does not force a custom height on your PNGs.
- Re-measured all three Featured Works video windows from the actual 2048×1176 artwork.
- Made the Mux preview windows larger and moved rows 2 and 3 into the correct positions.
- Fixed the Mux crop property so previews fill the artwork windows instead of keeping the wrong sizing behavior.
- Added a transparent controls overlay so the original duration plates and play buttons stay visible above the moving Mux video.
- Kept titles dynamic in Anton.
- Kept durations automatic from the real Mux video metadata.
- Updated Liro's client card link to `https://www.tiktok.com/@liro_liro011`.

## Important note about image quality

The actual artwork files included in this ZIP are currently:

- Hero: 2048 × 808
- Clients background: 2048 × 568
- Client dossier: 571 × 385
- Featured Works: 2048 × 1176
- Footer: 2048 × 532

The website now displays these files without distorting their aspect ratios.

If you have true 4096 px exports on your computer, replace the matching files below with those higher-resolution versions. **Keep the same filename and the same composition/aspect ratio. No code changes are needed.**

If the 4096 version is exactly 2× the current artwork, all hotspots, titles and Mux windows will remain aligned because their coordinates are percentage-based.

## Artwork files

- Hero: `assets/hero/hero-banner.png`
- Clients background: `assets/clients/clients-background.png`
- Liro dossier: `assets/clients/client-liro.png`
- Featured Works shell: `assets/featured/featured-shell.png`
- Featured controls overlay: `assets/featured/featured-controls-overlay.png`
- Footer: `assets/footer/footer-banner.png`

## Favicon

The K2L logo is now used in the browser tab:

- `assets/branding/favicon-512.png`
- `assets/branding/apple-touch-icon.png`

## Updating project titles or Mux videos

Open `content.js`.

Each project has:

```js
{
  title: "Your title",
  playbackId: "YOUR_MUX_PLAYBACK_ID"
}
```

Change only those values.

- The project title updates automatically in Anton.
- The preview video updates from the Mux Playback ID.
- The duration box updates automatically when Mux loads the video's metadata.

Do **not** type the title or duration into the Featured Works PNG.

## Featured Works artwork rule

Keep these parts empty/editable in Photoshop:

- left project-title areas
- the inside of the duration boxes
- the three video areas

The website fills those areas live.

`featured-controls-overlay.png` exists only to keep your original duration-box borders and play-button artwork above the moving videos.

If you redesign the Featured Works plate and move those controls, the overlay and CSS coordinates will need to be updated too.

## Client link

Liro currently links to:

`https://www.tiktok.com/@liro_liro011`

Change client links in `content.js`.

If you set:

```js
clients: []
```

the entire Clients section disappears and leaves no empty gap.

## Social links

Also in `content.js`:

- X: `https://x.com/Kenji2lucky`
- Discord: `https://discord.com/users/986068729307754496`

## Hero buttons

The visible buttons are part of your hero artwork. Transparent real links sit exactly over them:

- SEE MY WORK → Featured Works
- GET IN TOUCH → Footer / Contact

## Uploading to GitHub Pages

1. Unzip this ZIP.
2. Open the `kenji-portfolio-fixed` folder.
3. Upload **everything inside it** to the root of your existing `kenji-portfolio` GitHub repository.
4. Replace the old files when GitHub asks.
5. Commit the changes.
6. Wait for GitHub Pages to redeploy.
7. Hard-refresh the portfolio page if your browser still shows cached artwork.

All site paths are relative, so they work under:

`https://kenji2lucky.github.io/kenji-portfolio/`
