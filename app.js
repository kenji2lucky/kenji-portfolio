(() => {
  "use strict";
  const c = window.PORTFOLIO, root = document.querySelector("#portfolio");
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text != null) n.textContent = text; return n; };
  const append = (parent, ...children) => { parent.append(...children); return parent; };
  const safeURL = value => { try { const u = new URL(value, location.href); return ["http:", "https:", "file:"].includes(u.protocol) ? u.href : ""; } catch { return ""; } };
  const link = (text, url, cls="button") => { const a = el("a", cls, text); a.href = safeURL(url) || "#contact"; if (/^https?:/.test(a.href) && new URL(a.href).origin !== location.origin) { a.target="_blank"; a.rel="noopener noreferrer"; } return a; };
  function image(src, alt, cls, failure) { const img = el("img", cls); img.alt = alt || ""; img.decoding="async"; img.addEventListener("error", () => { img.remove(); if (failure) failure(); }, {once:true}); img.src = safeURL(src); return img; }
  const barcode = () => { const b=el("span", "barcode"); b.setAttribute("aria-hidden","true"); return b; };
  document.title=c.site.title; document.querySelector('meta[name="description"]').content=c.site.description;
  const hero=el("header","hero paper"), heroText=el("div","hero-copy");
  const meta=append(el("div","hero-meta"),el("span","",c.hero.department),el("span","",c.hero.location));
  const title=append(el("h1","wordmark"),el("span","",c.hero.nameBefore),el("em","",c.hero.nameAccent),el("span","",c.hero.nameAfter));
  const actions=append(el("div","hero-actions"),link("▶  "+c.hero.workLabel,"#works"),link(c.hero.contactLabel+" ↗","#contact","button red"));
  append(heroText,meta,el("p","hero-eyebrow",c.hero.eyebrow),el("p","specialty",c.hero.specialty),title,el("div","stars","★ ★ ★ ★ ★"),actions);
  const art=el("div","hero-art art-fallback"); art.setAttribute("aria-hidden","true");
  append(art,el("span","graffiti fallback-mark",c.site.mark),image(c.hero.art,c.hero.artAlt,"art-image"),el("span","art-note",c.hero.note));
  append(hero,heroText,art,el("span","hero-scribble graffiti",c.site.mark),barcode());
  function fullBanner(section, src, alt) { if (!src) return; const img=image(src,alt,"full-banner",()=>section.classList.remove("has-banner")); section.prepend(img); section.classList.add("has-banner"); }
  fullBanner(hero,c.hero.banner,c.hero.bannerAlt); root.append(hero);
  function heading(title, note, subtitle) { const row=el("div","section-heading"); append(row,el("span","folder","▱"),el("h2","",title)); if(note) row.append(el("span","pen-note",note)); append(row,el("p","section-subtitle",subtitle),barcode()); return row; }
  if (Array.isArray(c.clients) && c.clients.length) {
    const section=el("section","clients"); section.id="clients"; section.append(heading(c.clientsHeading,c.clientsNote,c.clientsSubtitle));
    const grid=el("div","client-grid");
    c.clients.forEach((client,i)=>{ const card=el("article","client-card paper");
      append(card,append(el("div","client-top"),el("span","",c.labels.case+" "+String(i+1).padStart(2,"0")),el("span","stamp",c.labels.confidential)));
      const body=el("div","client-body"), avatar=el("div","avatar",client.name.split(/\s+/).map(n=>n[0]).slice(0,2).join("")); if(client.image) avatar.append(image(client.image,client.name,"avatar-image"));
      const dl=el("dl"); [[c.labels.name,client.name],[c.labels.platform,client.platform],[c.labels.niche,client.niche],[c.labels.status,client.status]].forEach(([key,value])=>{if(value) append(dl,el("dt","",key+":"),el("dd","",value));});
      append(body,avatar,dl); append(card,body,el("p","client-description",client.description)); if(client.url) card.append(link(c.labels.clientLink+" ↗",client.url,"client-link")); grid.append(card);
    }); append(section,grid); root.append(section);
  }
  const works=el("section","works"); works.id="works"; works.append(heading(c.worksHeading,"",c.worksSubtitle));
  const previews=[], entries=new Map(); let previewsPaused=false, ready=false, libraryFailed=false;
  const reduce=matchMedia("(prefers-reduced-motion: reduce)"); previewsPaused=reduce.matches || Boolean(navigator.connection?.saveData);
  const toggle=el("button","preview-toggle",previewsPaused?c.labels.previewResume:c.labels.previewPause); toggle.type="button"; toggle.setAttribute("aria-pressed",String(previewsPaused)); works.querySelector(".section-heading").append(toggle);
  const dialog=document.querySelector("#video-dialog"), full=document.querySelector("#full-player"), message=document.querySelector("#player-message");
  let modalPlayer=null, opener=null;
  function shouldPlay(p) { return ready && !previewsPaused && !document.hidden && !dialog.open && (entries.get(p)||0)>=0.45; }
  function sync() { previews.forEach(p=>{ if(shouldPlay(p)) { p.muted=true; const attempt=p.play(); if(attempt?.catch) attempt.catch(()=>{}); } else p.pause?.(); }); }
  function makePlayer(project, preview) { const p=el("mux-player",preview?"preview-player":"modal-player"); p.setAttribute("playback-id",project.playbackId); p.setAttribute("stream-type","on-demand"); p.setAttribute("metadata-video-title",project.title); p.setAttribute("accent-color","#bd2927"); p.setAttribute("preload",preview?"none":"metadata"); p.setAttribute("playsinline",""); if(preview) { p.setAttribute("muted",""); p.setAttribute("loop",""); p.setAttribute("aria-hidden","true"); p.setAttribute("tabindex","-1"); p.inert=true; } return p; }
  const observer=new IntersectionObserver(items=>{items.forEach(item=>entries.set(item.target,item.intersectionRatio));sync();},{threshold:[0,0.45,0.75]});
  function openProject(project,button) {
    opener=button; document.querySelector("#player-title").textContent=project.title;
    full.replaceChildren(); message.textContent=libraryFailed?c.labels.libraryError:c.labels.loading;
    modalPlayer=makePlayer(project,false); modalPlayer.setAttribute("autoplay",""); modalPlayer.setAttribute("title",project.title); full.append(modalPlayer);
    modalPlayer.addEventListener("loadeddata",()=>{message.textContent="";});
    modalPlayer.addEventListener("error",()=>{message.textContent=c.labels.unavailable;});
    dialog.showModal(); document.body.classList.add("modal-open"); sync();
    if(ready) modalPlayer.play()?.catch(()=>{message.textContent="";});
  }
  c.projects.forEach((project,i)=>{
    const card=el("article","project-card"), number=el("div","case-number paper");
    append(number,el("span","case-label",c.labels.case),el("strong","",String(i+1).padStart(2,"0")),el("span","case-cross","⊕"),el("span","case-category",project.category));
    const details=el("div","project-details"); details.append(el("h3","",project.title)); if(project.description) details.append(el("p","",project.description));
    const button=el("button","button outline",c.labels.play+" ▶"); button.type="button"; button.setAttribute("aria-label",c.labels.play+": "+project.title); button.addEventListener("click",()=>openProject(project,button)); details.append(button);
    const media=el("div","project-media art-fallback"); media.append(el("span","media-watermark",c.site.mark));
    const muxPoster="https://image.mux.com/"+encodeURIComponent(project.playbackId)+"/thumbnail.webp?time="+encodeURIComponent(project.posterTime||0)+"&width=1200";
    const poster=image(project.poster||muxPoster,"","project-poster",()=>{if(project.poster) media.prepend(image(muxPoster,"","project-poster"));}); poster.loading="lazy"; media.append(poster);
    const p=makePlayer(project,true); previews.push(p); p.addEventListener("playing",()=>{ if(!shouldPlay(p)){p.pause();return;} media.classList.add("is-playing"); }); p.addEventListener("error",()=>media.classList.remove("is-playing")); media.append(p); observer.observe(p);
    const hit=el("button","media-hit"); hit.type="button"; hit.setAttribute("aria-label",c.labels.play+": "+project.title); hit.append(el("span","media-play","▶")); hit.addEventListener("click",()=>openProject(project,hit)); append(media,hit,el("span","preview-label",c.labels.preview));
    append(card,number,details,media); works.append(card);
  }); root.append(works);
  const contact=el("section","contact"); contact.id="contact";
  const contactMark=el("div","contact-mark graffiti",c.site.mark), contactCopy=el("div","contact-copy paper"), socials=el("div","socials");
  c.socials.forEach(s=>socials.append(link(s.label+" ↗",s.url,"button outline")));
  append(contactCopy,el("p","contact-label",c.contact.heading),el("h2","",c.contact.title),socials);
  const bottomArt=el("div","bottom-art art-fallback"); append(bottomArt,image(c.contact.art,c.contact.artAlt,"art-image"),el("span","pen-note",c.contact.note));
  append(contact,contactMark,contactCopy,bottomArt); fullBanner(contact,c.contact.banner,c.contact.bannerAlt); root.append(contact);
  append(root,append(el("footer"),el("span","",c.site.name),el("span","",c.site.footer),barcode(),el("span","",c.site.file)));
  toggle.addEventListener("click",()=>{previewsPaused=!previewsPaused;toggle.textContent=previewsPaused?c.labels.previewResume:c.labels.previewPause;toggle.setAttribute("aria-pressed",String(previewsPaused));sync();});
  reduce.addEventListener("change",()=>{if(reduce.matches){previewsPaused=true;toggle.textContent=c.labels.previewResume;toggle.setAttribute("aria-pressed","true");sync();}});
  document.addEventListener("visibilitychange",()=>{sync();if(document.hidden)modalPlayer?.pause?.();});
  const close=document.querySelector("#close-player"); close.textContent=c.labels.close; close.addEventListener("click",()=>dialog.close());
  dialog.addEventListener("click",e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener("close",()=>{modalPlayer?.pause?.();full.replaceChildren();modalPlayer=null;document.body.classList.remove("modal-open");opener?.focus();sync();});
  const library=document.createElement("script");library.src="https://cdn.jsdelivr.net/npm/@mux/mux-player@3.13.4/dist/mux-player.js";library.async=true;library.onerror=()=>{libraryFailed=true;if(dialog.open)message.textContent=c.labels.libraryError;};document.head.append(library);
  customElements.whenDefined("mux-player").then(()=>{ready=true;sync();if(dialog.open)modalPlayer?.play()?.catch(()=>{});});
})();
