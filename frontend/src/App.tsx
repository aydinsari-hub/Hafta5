import "./App.css";
import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

const formatDate = (d: string): string =>
  new Date(`${d}T00:00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const categories = [...new Set(events.map((e) => e.category))];

  const filtered = filterByCategory(searchEvents(events, searchText), category);

  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle",
  };
  const title = titles[page];

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="etiket">{event.category}</span>
        <p>
          <strong>Tarih:</strong> {formatDate(event.date)}, {event.time}
        </p>
        <p>
          <strong>Yer:</strong> {event.location}
        </p>
        <p>
          <strong>Kontenjan:</strong> {event.capacity} kişi
        </p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e: MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="ust-bilgi">
        <div className="kapsayici">
          <h1>{title}</h1>
          {page === "home" && (
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
          )}
          {page === "events" && <p>Ekim ayında kampüste düzenlenen etkinlikler.</p>}
          <nav className="ana-menu">
            {menuItems.map((item) => (
              <a
                key={item.page}
                href="#"
                aria-current={page === item.page ? "page" : undefined}
                onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  go(item.page);
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="kapsayici">
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-listesi">{upcoming.map(renderCard)}</section>
            <div style={{ marginTop: 24 }}>
              <button type="button" className="btn" onClick={() => go("events")}>
                Tüm etkinlikleri gör
              </button>
            </div>
          </section>
        )}

        {page === "events" && (
          <>
            <form className="filtre-kutusu" onSubmit={(e) => e.preventDefault()}>
              <div className="filtre-alan">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-alan">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p className="sonuc-bilgi">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <section className="etkinlik-listesi">{filtered.map(renderCard)}</section>
          </>
        )}

        {page === "detail" && !selected && (
          <>
            <div className="hata-kutusu" style={{ marginBottom: 20 }}>
              <p>Böyle bir etkinlik yok. Listeden bir etkinlik seçin.</p>
            </div>
            <button type="button" className="btn" onClick={() => go("events")}>
              ← Listeye dön
            </button>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay detay-layout">
            <div className="detay-sol">
              {selected.image && (
                <figure className="afis">
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption className="afis-alti">{selected.title} afişi</figcaption>
                </figure>
              )}

              <section className="aciklama-bolumu">
                <h3>Açıklama</h3>
                <p>{selected.description}</p>
              </section>

              <div className="detay-butonlar">
                <button type="button" className="btn" onClick={() => go("events")}>
                  ← Listeye dön
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => go("update", selected.id)}
                >
                  Bu etkinliği güncelle
                </button>
              </div>
            </div>

            <aside className="detay-sag">
              <div className="kunye-kutusu">
                <h3>Etkinlik Künyesi</h3>
                <dl className="kunye">
                  <dt>Tarih</dt>
                  <dd>
                    <time dateTime={selected.date}>{formatDate(selected.date)}</time>,{" "}
                    {selected.time}
                  </dd>
                  <dt>Yer</dt>
                  <dd>{selected.location}</dd>
                  <dt>Kategori</dt>
                  <dd>{selected.category}</dd>
                  <dt>Kontenjan</dt>
                  <dd>{selected.capacity} kişi</dd>
                </dl>
              </div>
            </aside>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="form-aciklama">
              Yıldızlı (*) alanlar zorunludur. Bu sprintte form sadece görünümdür; veri
              kaydetmez.
            </p>
            <form className="form form-kapsayici" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı *</label>
                <input type="text" id="title" name="title" maxLength={80} />
              </div>
              <div className="form-grup">
                <label htmlFor="category">Kategori *</label>
                <select id="category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>
              <div className="form-grup">
                <label htmlFor="date">Tarih *</label>
                <input type="date" id="date" name="date" />
              </div>
              <div className="form-grup">
                <label htmlFor="time">Saat *</label>
                <input type="time" id="time" name="time" />
              </div>
              <div className="form-grup">
                <label htmlFor="location">Yer *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>
              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input type="number" id="capacity" name="capacity" min={1} max={1000} />
              </div>
              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </div>
              <button type="submit" className="btn">
                Kaydet
              </button>
            </form>
          </>
        )}
      </main>

      <footer className="alt-bilgi">
        <p>Aydın &middot; 2416501056 &middot; 2026</p>
      </footer>
    </>
  );
}

export default App;
