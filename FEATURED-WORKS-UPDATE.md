# Featured Works precision update

Upload the contents of kenji-portfolio-updated/ over the existing repository files, then commit. No build step is needed.

Changes: exact corrected Featured Works PNG; preview windows inset within its three row borders; matching click areas; original right-hand play artwork preserved using clipped copies of the new shell. Duration plates remain inside the top-right of each preview; titles remain dynamic Anton text. Cache versions updated for the shell and CSS.

The supplied attachment is 2048 × 1176 pixels, despite its “4x scale” filename. It is included unchanged.

Browser checks: 1440, 768, 390 and 320 CSS-pixel viewports. No horizontal page overflow; artwork retains natural proportions; video windows and click areas match; previews and duration text do not overflow; titles clear the play buttons. All three live Mux durations loaded (0:17, 0:26, 0:11). Opening a video and closing it with the close button worked at 320px. Client TikTok and footer destinations are unchanged and present.

Mobile compromises: the existing composition makes project titles 8px at 320–390px, duration text 6px, and footer social targets roughly 18 × 17px at 320px. Client artwork text is also small. These remain usable links but are not comfortable mobile reading/tap sizes. Recommend a separately approved mobile layout with larger text and at least 44px touch targets. No such redesign is included. Physical iOS/Android autoplay-policy testing remains recommended; autoplay/pause code is byte-for-byte preserved, not independently certified on every device.

Preserved byte-for-byte: script.js, content.js (Mux IDs, automatic durations, autoplay/pause, titles and links), favicon assets, hero, clients, footer, and all other original files except index.html, styles.css, and assets/featured/featured-shell.png. The old controls overlay remains in the archive for compatibility but is no longer referenced by index.html.
