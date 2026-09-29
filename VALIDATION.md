# Validation

Checked before packaging:

- `script.js` syntax: passed (`node --check`)
- `content.js` syntax: passed (`node --check`)
- all local asset paths referenced by `index.html`: present
- favicon files: present (512×512 + 180×180)
- Featured Works controls overlay: present and matches the 2048×1176 shell
- Liro link in `content.js`: `https://www.tiktok.com/@liro_liro011`
- three Mux Playback IDs preserved exactly
- project titles remain dynamic HTML in Anton
- duration remains automatic from Mux metadata
- empty client array still hides the whole Clients section

The local browser runtime in this workspace blocks local/network browser navigation, so final live Mux playback should be checked after GitHub Pages deploys. The JavaScript and local file references were validated statically.
