https://hafta2-gamma.vercel.app

# Kampüs Etkinlikleri — Sprint 4 (Vite, TypeScript ve React)

Sprint 3'teki site `frontend/` klasöründe Vite + React + TypeScript ile yeniden yazıldı. 5 sayfa (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle) tek `App.tsx` içinde; sayfa geçişi ve arama `useState` ile çalışır, sekme başlığı `useEffect` ile değişir. Router bu sprintte yok (Sprint 6).

> Vercel ayarı: Root Directory → `frontend`, Framework Preset → `Vite`.

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run preview
```

## Dosyalar

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (dev, build) ve paket listesi. |
| `package-lock.json` | Yüklenen paketlerin tam sürümlerini sabitler. |
| `node_modules/` | İndirilen paketler; GitHub'a gönderilmez. |
| `tsconfig*.json` | TypeScript derleyici ayarları. |
| `vite.config.ts` | Vite ayarları ve React eklentisi. |
| `index.html` | Tek HTML dosyası; içinde boş `div#root` bulunur. |
| `src/main.tsx` | React'i başlatır ve `App`'i `#root`'a çizer. |
| `src/App.tsx` | Uygulamanın ana bileşeni; 5 sayfanın hepsi burada. |
| `src/App.css` | Sprint 3'teki CSS (öğrenci numarasına göre renk/font). |
| `src/index.css` | Genel stil dosyası; bu sprintte boş. |
| `src/types/campus-event.ts` | `Category` union tipi ve `CampusEvent` arayüzü. |
| `src/data/events.ts` | Tipli 6 etkinlik kaydı (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `public/` | Olduğu gibi kopyalanan dosyalar (`afis.svg`). |

## Geliştirici

**Aydın Sarı** · Öğrenci No: 2416501056
