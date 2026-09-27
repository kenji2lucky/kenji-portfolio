# Kenji Portfolio — GitHub-ready

This site is designed to **never show empty sections or dead portfolio navigation**.

## The rule is simple

Edit `content.js`.

- `const clients = [];` → the entire **Clients** section disappears, including the Clients nav link.
- `const shortFormProjects = [];` → **Short Form disappears as an option**.
- `const longFormProjects = [];` → Long Form disappears as an option.
- If only one format has work, the Long Form / Short Form switch is hidden completely.
- If somebody manually visits `short-form.html` while there are no short-form projects, the site redirects them to Long Form (and vice versa).
- A blank project/client `link` does **not** create a fake clickable link.

That means you can launch with only the work you're proud of and add sections later.

## Add a client later

Put its icon inside `assets/`, then add an object inside `clients`:

```js
const clients = [
  {
    name: "Creator Name",
    channel: "YouTube Channel",
    stat: "500K subscribers",
    image: "assets/creator-name.png",
    url: "https://youtube.com/@creator"
  }
];
```

## Add a Long Form project

```js
{
  title: "Project title",
  client: "Creator Name",
  meta: "YouTube edit",
  video: "assets/long-04.mp4",
  poster: "assets/long-04.jpg",
  link: "https://youtube.com/watch?v=..."
}
```

If the work is not public, leave `link: ""`. The card still appears and the video still autoplays, but it is not clickable.

## Add Short Form later

Add one or more objects to `shortFormProjects`. The Short Form option will automatically appear as soon as the array contains work.

```js
const shortFormProjects = [
  {
    title: "Short title",
    client: "Creator Name",
    video: "assets/short-01.mp4",
    poster: "assets/short-01.jpg",
    link: ""
  }
];
```

## Video behavior

Portfolio videos are muted and play only when they are visible on screen. They pause after you scroll past them.

Hero video: `assets/hero.mp4`  
CTA video: `assets/cta.mp4`

Use compressed MP4/H.264 files for reliable browser playback and reasonable GitHub hosting size.

## Recommended launch state for you

Right now the project is configured with:

- Clients: **hidden**
- Long Form: **visible**
- Short Form: **hidden**

When you get work you want to feature, you only need to add it to `content.js`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload the contents of this folder (not only the ZIP).
3. Go to **Settings → Pages**.
4. Deploy from your main branch/root.
5. Save.

`index.html` is already the homepage.


## Mux video setup

Long-form project videos are now streamed from Mux using `playbackId` values in `content.js`. You do not need to upload the large source videos to GitHub. To replace a project later, update its `title`, `playbackId`, and `link` in `content.js`. The `link` can use `https://player.mux.com/YOUR_PLAYBACK_ID` to open the full player.


### Hero + CTA videos

The hero and CTA currently use poster artwork only, so there are no missing-video errors while those animations are unfinished. When you have the final loops, add the MP4 files and restore them as the source for the `.panel-video` elements, or update the site to stream them from Mux too.
