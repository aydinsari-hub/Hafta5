import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay detay-layout">
      <div className="detay-sol">
        {event.image && (
          <figure className="afis">
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption className="afis-alti">{event.title} afişi</figcaption>
          </figure>
        )}

        <section className="aciklama-bolumu">
          <h3>Açıklama</h3>
          <p>{event.description}</p>
        </section>

        <div className="detay-butonlar">
          <button type="button" className="btn" onClick={() => onBack()}>
            ← Listeye dön
          </button>
          <button type="button" className="btn" onClick={() => onEdit(event.id)}>
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
              <time dateTime={event.date}>{formatDate(event.date)}</time>, {event.time}
            </dd>
            <dt>Yer</dt>
            <dd>{event.location}</dd>
            <dt>Kategori</dt>
            <dd>{event.category}</dd>
            <dt>Kontenjan</dt>
            <dd>{event.capacity} kişi</dd>
          </dl>
        </div>
      </aside>
    </article>
  );
}

export default EventDetail;
