// Minimal Pro Portfolio - Vanilla JS
(() => {
  const sample = [
    { id: "a1", title: "Aurora Dashboard", desc: "Realtime analytics dashboard.", tech: "React,Node", img: "https://picsum.photos/seed/mp1/800/600", date: "2025-05-01" },
    { id: "a2", title: "SketchFlow", desc: "Design to code prototyping tool.", tech: "Svelte,Electron", img: "https://picsum.photos/seed/mp2/800/600", date: "2024-11-12" },
    { id: "a3", title: "Voyager Viz", desc: "Geospatial telemetry visualization.", tech: "Vue,Mapbox", img: "https://picsum.photos/seed/mp3/800/600", date: "2024-03-21" },
    { id: "a4", title: "Pulse CRM", desc: "Customizable CRM with workflows.", tech: "Next.js,Postgres", img: "https://picsum.photos/seed/mp4/800/600", date: "2023-09-06" },
    { id: "a5", title: "Nimbus API", desc: "High-throughput API platform.", tech: "Go,GraphQL", img: "https://picsum.photos/seed/mp5/800/600", date: "2025-01-18" },
    { id: "a6", title: "PocketShop Mobile", desc: "Cross-platform commerce app.", tech: "React Native", img: "https://picsum.photos/seed/mp6/800/600", date: "2022-12-02" }
  ];

  const listEl = document.getElementById("list");
  const search = document.getElementById("search");
  const sort = document.getElementById("sort");
  const year = document.getElementById("y");
  const form = document.getElementById("form");
  const out = document.getElementById("out");

  year.textContent = new Date().getFullYear();

  function render(items) {
    listEl.innerHTML = "";
    items.forEach(it => {
      const el = document.createElement("article");
      el.className = "card";
      el.innerHTML = `
        <img src="${it.img}" alt="${it.title} screenshot" loading="lazy"/>
        <h4>${it.title}</h4>
        <p>${it.desc}</p>
        <small style="color:#7b9aa6">${it.tech} • ${new Date(it.date).getFullYear()}</small>
      `;
      listEl.appendChild(el);
    });
  }

  function applyFilters() {
    const q = search.value.trim().toLowerCase();
    let res = sample.filter(s => (s.title + s.desc + s.tech).toLowerCase().includes(q));
    if (sort.value === "alpha") {
      res = res.sort((a,b)=> a.title.localeCompare(b.title));
    } else {
      res = res.sort((a,b)=> new Date(b.date) - new Date(a.date));
    }
    render(res);
  }

  search.addEventListener("input", applyFilters);
  sort.addEventListener("change", applyFilters);

  // simple contact submission demo
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(form);
    if (!f.get("name") || !f.get("email") || !f.get("message")) {
      out.textContent = "Please fill all fields.";
      return;
    }
    out.textContent = "Thanks! (Demo) — opening mail client...";
    const subject = encodeURIComponent(`Contact from ${f.get("name")}`);
    const body = encodeURIComponent(f.get("message") + `\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:henry.jones@example.com?subject=${subject}&body=${body}`;
  });

  // init
  render(sample);
  applyFilters();
})();