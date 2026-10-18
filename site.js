/* site.js: reads content.js and builds the page. You don't need to edit this file. */

const SITE = { status: {}, phases: [], parts: [], entries: [] };

function status(s) { SITE.status = s; }
function phase(name, state) { SITE.phases.push({ name, state: (state || "next").toLowerCase() }); }
function part(name, cost, state, note) { SITE.parts.push({ name, cost, state: (state || "planned").toLowerCase(), note: note || "" }); }
function entry(e) { SITE.entries.push(e); }

// If content.js has a typo, show where instead of a blank page.
window.addEventListener("error", (ev) => {
  if (!ev.filename || !ev.filename.includes("content.js")) return;
  const box = document.createElement("div");
  box.className = "content-error";
  box.textContent = `There's a typo in content.js near line ${ev.lineno}: ${ev.message}. Check for a missing comma, quote or bracket.`;
  document.addEventListener("DOMContentLoaded", () => document.body.prepend(box));
  if (document.body) document.body.prepend(box);
});

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso, long) {
  const [y, m, d] = iso.split("-").map(Number);
  const full = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${(long ? full : MONTHS)[m - 1]} ${d}, ${y}`;
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}
function splitItem(line) {
  const i = line.indexOf("|");
  return i === -1 ? { file: line.trim(), caption: "" } : { file: line.slice(0, i).trim(), caption: line.slice(i + 1).trim() };
}
// Hours can be a number (2.5) or "h:mm" ("1:25").
function toHours(h) {
  if (h === null || h === undefined || h === "") return 0;
  if (typeof h === "string" && h.includes(":")) { const [a, b] = h.split(":").map(Number); return a + b / 60; }
  return Number(h) || 0;
}
function fmtHours(h) {
  const total = Math.round(toHours(h) * 60), hr = Math.floor(total / 60), min = total % 60;
  if (!min) return `${hr} ${hr === 1 ? "hour" : "hours"}`;
  return hr ? `${hr} hr ${min} min` : `${min} min`;
}
const KIND = { work: "Hands-on work", research: "Research and planning" };
const SHOW = 3; // list items shown before "See more"
function money(n) { return "$" + Number(n).toLocaleString("en-US"); }
function fill(sel, html) { document.querySelectorAll(sel).forEach((el) => (el.innerHTML = html)); }

document.addEventListener("DOMContentLoaded", () => {
  const st = SITE.status;
  // Oldest first. Same-day entries keep the order they're written in content.js.
  const entries = SITE.entries.map((e) => ({ kind: "work", ...e })).sort((a, b) => a.date.localeCompare(b.date));

  // Status bits
  fill("[data-name]", esc(st.name || ""));
  fill("[data-location]", esc(st.location || ""));
  fill("[data-phase]", esc(st.phase || ""));
  fill("[data-summary]", esc(st.summary || ""));
  if (st.updated) fill("[data-updated]", fmtDate(st.updated, true));
  if (st.name) document.title = `Electric XR250R | ${st.name}`;

  // Numbers in the hero
  const hours = entries.reduce((t, e) => t + toHours(e.hours), 0);
  const spent = SITE.parts.filter((p) => p.state === "bought").reduce((t, p) => t + (Number(p.cost) || 0), 0);
  fill("[data-sessions]", String(entries.filter((e) => e.kind === "work").length));
  fill("[data-hours]", String(Math.round(hours)));
  fill("[data-spent]", money(spent));

  // Phases
  const done = SITE.phases.filter((p) => p.state === "done").length;
  fill("[data-phase-count]", `${done} of ${SITE.phases.length} phases done`);
  const label = { done: "Done", now: "In progress", next: "Up next" };
  fill("#phases", SITE.phases.map((p) =>
    `<li class="phase is-${esc(p.state)}"><span class="phase-name">${esc(p.name)}</span><span class="phase-state">${label[p.state] || esc(p.state)}</span></li>`
  ).join(""));

  // Parts and budget
  const BUDGET = 1500;
  const planned = SITE.parts.filter((p) => p.state === "planned").reduce((t, p) => t + (Number(p.cost) || 0), 0);
  const unknown = SITE.parts.some((p) => p.state === "planned" && (p.cost === null || p.cost === undefined));
  const stateLabel = { bought: "Bought", planned: "Planned", backup: "Backup" };
  fill("#parts", SITE.parts.map((p) => `
    <tr class="is-${esc(p.state)}">
      <td><span class="part-name">${esc(p.name)}</span>${p.note ? `<span class="part-note">${esc(p.note)}</span>` : ""}</td>
      <td class="part-state">${stateLabel[p.state] || esc(p.state)}</td>
      <td class="num">${p.cost === null || p.cost === undefined ? "TBD" : p.cost === 0 ? "Free" : money(p.cost)}</td>
    </tr>`).join(""));
  fill("[data-total-spent]", money(spent));
  fill("[data-total-planned]", money(planned) + (unknown ? " + TBD" : ""));
  fill("[data-total-left]", money(BUDGET - spent - planned));
  if (SITE.parts.some((p) => p.state === "backup"))
    fill("[data-budget-note]", "Backup parts are only bought if Plan A doesn't work out, so they aren't counted in the totals.");
  const bar = document.querySelector("#budget-bar");
  if (bar) {
    bar.querySelector(".bar-spent").style.width = Math.min(100, (spent / BUDGET) * 100) + "%";
    bar.querySelector(".bar-planned").style.width = Math.min(100, (planned / BUDGET) * 100) + "%";
  }

  // Build log
  let listId = 0;
  const list = (title, items) => {
    if (!items || !items.length) return "";
    const cut = items.length > SHOW + 1 ? SHOW : items.length; // never hide just one item
    const id = `list-${++listId}`, extra = items.length - cut;
    return `<div class="log-list"><h4>${title}</h4>
      <ul id="${id}">${items.map((i, n) => `<li${n >= cut ? " hidden" : ""}>${esc(i)}</li>`).join("")}</ul>
      ${extra ? `<button type="button" class="see-more" aria-expanded="false" aria-controls="${id}" data-more="See ${extra} more">See ${extra} more</button>` : ""}
    </div>`;
  };
  const idFor = (e) => `log-${e.date}-${e.kind}`;
  fill("#log", entries.map((e) => {
    const photos = (e.photos || []).map(splitItem);
    const videos = (e.videos || []).map(splitItem);
    const paras = (e.notes || "").trim().split(/\n\s*\n/).filter(Boolean).map((p) => `<p>${esc(p.trim())}</p>`).join("");
    return `
    <article class="entry is-${esc(e.kind)}" id="${esc(idFor(e))}">
      <header class="entry-head">
        <time datetime="${esc(e.date)}">${esc(e.dateLabel || fmtDate(e.date))}</time>
        <span class="entry-kind">${KIND[e.kind] || esc(e.kind)}</span>
        ${toHours(e.hours) ? `<span class="entry-hours">${fmtHours(e.hours)}</span>` : ""}
      </header>
      <div class="entry-body">
        <h3>${esc(e.title)}</h3>
        <div class="log-lists">${list("Progress", e.progress)}${list("Challenges", e.challenges)}${list("Learning", e.learned)}</div>
        ${paras ? `<div class="entry-notes">${paras}</div>` : ""}
        ${photos.length ? `<div class="gallery">${photos.map((p) => `
          <button class="thumb" type="button" data-full="photos/${esc(p.file)}" data-caption="${esc(p.caption)}" aria-label="Open photo: ${esc(p.caption || p.file)}">
            <img src="photos/${esc(p.file)}" alt="${esc(p.caption)}" loading="lazy" decoding="async">
          </button>`).join("")}</div>` : ""}
        ${videos.length ? `<div class="videos">${videos.map((v) => `
          <figure><video controls preload="none" playsinline poster="videos/${esc(v.file.replace(/\.mp4$/i, ".jpg"))}"><source src="videos/${esc(v.file)}" type="video/mp4"></video>
          ${v.caption ? `<figcaption>${esc(v.caption)}</figcaption>` : ""}</figure>`).join("")}</div>` : ""}
      </div>
    </article>`;
  }).join(""));
  const latest = entries[entries.length - 1];
  document.querySelectorAll("[data-latest]").forEach((a) => (a.href = "#" + idFor(latest)));

  // "See more" buttons
  document.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".see-more");
    if (!btn) return;
    const open = btn.getAttribute("aria-expanded") !== "true";
    const ul = document.getElementById(btn.getAttribute("aria-controls"));
    ul.querySelectorAll("li").forEach((li, n) => { if (n >= SHOW) li.hidden = !open; });
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "See less" : btn.dataset.more;
  });

  // Photo viewer
  const dlg = document.querySelector("#viewer");
  if (!dlg) return;
  const img = dlg.querySelector("img"), cap = dlg.querySelector("figcaption");
  let group = [], idx = 0;
  const show = () => {
    const b = group[idx];
    img.src = b.dataset.full; img.alt = b.dataset.caption || "";
    cap.textContent = b.dataset.caption || "";
    dlg.querySelector(".viewer-count").textContent = `${idx + 1} / ${group.length}`;
  };
  document.addEventListener("click", (ev) => {
    const b = ev.target.closest(".thumb");
    if (!b) return;
    group = [...b.closest(".gallery").querySelectorAll(".thumb")];
    idx = group.indexOf(b); show(); dlg.showModal();
  });
  const step = (d) => { idx = (idx + d + group.length) % group.length; show(); };
  dlg.querySelector(".viewer-prev").addEventListener("click", () => step(-1));
  dlg.querySelector(".viewer-next").addEventListener("click", () => step(1));
  dlg.querySelector(".viewer-close").addEventListener("click", () => dlg.close());
  // Clicking anywhere except the photo itself or the buttons closes the viewer.
  dlg.addEventListener("click", (ev) => {
    if (ev.target.closest(".viewer img, .viewer-controls button")) return;
    dlg.close();
  });
  dlg.addEventListener("keydown", (ev) => {
    if (ev.key === "ArrowLeft") step(-1);
    if (ev.key === "ArrowRight") step(1);
  });
});
