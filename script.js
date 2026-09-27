const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function hasRealUrl(url) {
  if (!url) return false;
  const value = String(url).trim();
  return value !== "" && value !== "#" && !value.toLowerCase().startsWith("javascript:");
}

function optionalText(tag, value, className = "") {
  if (!value || !String(value).trim()) return "";
  const cls = className ? ` class="${className}"` : "";
  return `<${tag}${cls}>${value}</${tag}>`;
}

function clientCard(client) {
  const linked = hasRealUrl(client.url);
  const tag = linked ? "a" : "div";
  const attrs = linked ? ` href="${client.url}" target="_blank" rel="noreferrer"` : "";
  const image = client.image
    ? `<span class="client-avatar"><img src="${client.image}" alt="${client.name || "Client"}" /></span>`
    : "";
  const channel = optionalText("span", client.channel);
  const stat = optionalText("small", client.stat);
  const view = linked ? "<u>View Channel ↗</u>" : "";

  return `
    <${tag} class="client-card${linked ? "" : " is-static"}"${attrs}>
      ${image}
      ${optionalText("strong", client.name || "Client")}
      ${channel}
      ${stat}
      ${view}
    </${tag}>
  `;
}

function mediaMarkup(project, orientation) {
  const mux = project.playbackId && String(project.playbackId).trim()
    ? `<mux-player
         class="portfolio-video mux-preview"
         playback-id="${project.playbackId}"
         metadata-video-title="${project.title || "Portfolio project"}"
         muted
         loop
         playsinline
         preload="metadata"
         nohotkeys
         style="--controls: none;"
       ></mux-player>`
    : project.video && String(project.video).trim()
      ? `<video class="portfolio-video" muted loop playsinline preload="metadata"${project.poster ? ` poster="${project.poster}"` : ""}>
           <source src="${project.video}" type="video/mp4" />
         </video>`
      : project.poster
        ? `<img class="portfolio-poster" src="${project.poster}" alt="" />`
        : `<div class="media-placeholder" aria-hidden="true"></div>`;

  const hasVideo = Boolean(project.playbackId || project.video);

  return `
    <div class="video-frame ${orientation}">
      ${mux}
      ${hasVideo ? `<span class="video-chip">MUTED AUTOPLAY</span>` : ""}
    </div>
  `;
}

function longCard(project) {
  const linked = hasRealUrl(project.link);
  const tag = linked ? "a" : "div";
  const attrs = linked ? ` href="${project.link}" target="_blank" rel="noreferrer" aria-label="Open ${project.title}"` : "";

  return `
    <article class="project-card long-card${linked ? "" : " is-static"}">
      <${tag} class="project-inner"${attrs}>
        ${mediaMarkup(project, "landscape")}
        <div class="project-info">
          <div>
            <h3>${project.title}</h3>
            ${optionalText("p", project.client)}
          </div>
          ${optionalText("span", project.meta)}
        </div>
      </${tag}>
    </article>
  `;
}

function shortCard(project) {
  const linked = hasRealUrl(project.link);
  const tag = linked ? "a" : "div";
  const attrs = linked ? ` href="${project.link}" target="_blank" rel="noreferrer" aria-label="Open ${project.title}"` : "";

  return `
    <article class="project-card short-card${linked ? "" : " is-static"}">
      <${tag} class="project-inner"${attrs}>
        ${mediaMarkup(project, "portrait")}
        <h3>${project.title}</h3>
        ${optionalText("p", project.client)}
      </${tag}>
    </article>
  `;
}

const safeClients = Array.isArray(clients) ? clients : [];
const safeLong = Array.isArray(longFormProjects) ? longFormProjects : [];
const safeShort = Array.isArray(shortFormProjects) ? shortFormProjects : [];

const hasClients = safeClients.length > 0;
const hasLong = safeLong.length > 0;
const hasShort = safeShort.length > 0;
const hasAnyWork = hasLong || hasShort;
const currentPage = document.body.dataset.page;

// Never leave a visitor on an empty portfolio page.
if (currentPage === "short" && !hasShort && hasLong) {
  window.location.replace("index.html#work");
} else if (currentPage === "long" && !hasLong && hasShort) {
  window.location.replace("short-form.html#work");
} else {
  // Clients: hide the ENTIRE section and nav item when there is no client data.
  const clientsSection = $("#clients");
  if (!hasClients) {
    if (clientsSection) clientsSection.hidden = true;
    $$("a[href='#clients']").forEach((link) => link.hidden = true);
  } else {
    const clientsGrid = $("#clientsGrid");
    if (clientsGrid) clientsGrid.innerHTML = safeClients.map(clientCard).join("");
  }

  // Work: only render the current format.
  const longGrid = $("#longGrid");
  if (longGrid && hasLong) longGrid.innerHTML = safeLong.map(longCard).join("");

  const shortGrid = $("#shortGrid");
  if (shortGrid && hasShort) shortGrid.innerHTML = safeShort.map(shortCard).join("");

  // Format switch: if there is only one format, there is nothing to switch to.
  const switcher = $(".format-switch");
  if (switcher) {
    if (!(hasLong && hasShort)) {
      switcher.hidden = true;
    } else {
      const longLink = $("a[href='index.html']", switcher);
      const shortLink = $("a[href='short-form.html']", switcher);
      if (longLink) longLink.hidden = !hasLong;
      if (shortLink) shortLink.hidden = !hasShort;
    }
  }

  // If there is no portfolio work at all, hide Work navigation + section + hero work CTA.
  if (!hasAnyWork) {
    const work = $("#work");
    if (work) work.hidden = true;
    $$("a[href='#work']").forEach((link) => link.hidden = true);
  }

  // Play portfolio videos only while they are visible on screen.
  const videos = document.querySelectorAll(".portfolio-video");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: [0, 0.35, 0.7] }
  );

  videos.forEach((video) => observer.observe(video));

  // Hero + CTA are always muted and designed to loop.
  document.querySelectorAll(".panel-video").forEach((video) => {
    video.muted = true;
    video.play().catch(() => {});
  });

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
}
