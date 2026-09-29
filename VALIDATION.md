# Validation — favicon + Featured Works fix pass

Checked locally at file/code level:

- `index.html` references a root `favicon.ico` plus 16/32px PNG variants and Apple touch icon with cache-busting query strings.
- Root `favicon.ico` exists and contains multiple icon sizes.
- `styles.css` and `script.js` parse without syntax errors.
- Featured Works Mux windows have a solid black underlay, preventing the Photoshop preview image from showing through behind live video.
- Duration plates are now CSS-drawn black rectangles using coordinates measured from the 2048×1176 artwork: x=1813, width=144, height=48; row y positions 165, 503, 845.
- The duration rectangles were removed from `featured-controls-overlay.png`; play-button artwork remains in that overlay.
- Existing TikTok client link, Mux Playback IDs, X and Discord URLs were preserved.
- CSS/overlay references use version query strings to reduce stale GitHub Pages/browser cache issues.

External Mux playback cannot be fully exercised in the container browser because outbound browser requests are restricted. Final visual playback check should be done after deploying to GitHub Pages.
