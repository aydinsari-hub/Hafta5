https://hafta2-gamma.vercel.app

# Kampüs Etkinlikleri — Sprint 5 (React Bileşenleri)

Sprint 4'teki tek büyük `App.tsx` dosyası, her biri kendi dosyasında yer alan **React bileşenlerine** bölündü. Bileşenler veriyi **props** (`interface` ile tiplenmiş) üzerinden alır, kullanıcı etkileşimlerini **callback** fonksiyonlarıyla `App` bileşenine bildirir (**lifting state**). Görünüm ve işlevsellik Sprint 4 ile birebir aynıdır.

> Vercel ayarı: Root Directory → `frontend`, Framework Preset → `Vite`.

## Çalıştırma

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build    # hatasız bitmeli
npm run preview
```

## Dosyalar (`frontend/`)

| Dosya | Görevi |
|---|---|
| `package.json` | Proje adı, komutlar (`dev`, `build`, `lint`, `preview`) ve paket listesi. |
| `index.html` | Tek HTML dosyası; içinde boş `div#root` bulunur. |
| `src/main.tsx` | React'i başlatır ve `App`'i `#root`'a çizer. |
| `src/App.tsx` | Ana bileşen; `page`, `selectedId`, `searchText`, `category` state'lerini tutar ve alt bileşenleri birleştirir. |
| `src/App.css` | Uygulama stilleri (renk paleti, kart, filtre, detay, form ve üst şerit düzeni). |
| `src/components/layout/Header.tsx` | Sayfa başlığı (`title`) ve isteğe bağlı alt metni (`text`) gösteren üst başlık bileşeni. |
| `src/components/layout/Navigation.tsx` | Aktif sayfayı (`current`) vurgulayan ve `onNavigate` callback'i ile sayfa değiştiren menü bileşeni. |
| `src/components/layout/Footer.tsx` | Sayfa alt bilgisini gösteren props'suz bileşen. |
| `src/components/events/EventCard.tsx` | Tek bir etkinliği (`CampusEvent`) kart olarak çizen ve `onShowDetail` ile detay tıklamasını bildiren bileşen. |
| `src/components/events/EventList.tsx` | Etkinlik dizisini alıp `EventCard` listesi çizen veya liste boşsa `emptyText` mesajını gösteren bileşen. |
| `src/components/events/EventFilter.tsx` | Arama kutusu ve kategori seçimini barındıran, değişiklikleri `onSearchChange` ve `onCategoryChange` ile `App`'e bildiren bileşen. |
| `src/components/events/EventDetail.tsx` | Seçili etkinliğin afiş, açıklama ve künyesini gösteren; `onBack` ve `onEdit` callback'lerini tetikleyen bileşen. |
| `src/components/forms/EventForm.tsx` | Etkinlik ekleme/güncelleme form görünümünü sunan ve gönderimde `onSubmit` çağıran bileşen. |
| `src/types/campus-event.ts` | `Category` union tipi ve `CampusEvent` arayüzü. |
| `src/types/page.ts` | `PageName` (`"home" \| "events" \| "detail" \| "add" \| "update"`) sayfa tipi. |
| `src/data/events.ts` | Tipli 6 etkinlik kaydı (`CampusEvent[]`). |
| `src/utils/filter-events.ts` | Saf fonksiyonlar: `searchEvents`, `filterByCategory`, `findEventById`. |
| `src/utils/format-date.ts` | ISO tarih dizgesini Türkçe uzun tarih formatına çeviren `formatDate` fonksiyonu. |
| `public/` | Statik dosyalar (`afis.svg`, `favicon.svg`). |

## Geliştirici

**Aydın Sarı** · Öğrenci No: 2416501056

