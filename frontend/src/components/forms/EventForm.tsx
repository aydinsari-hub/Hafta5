interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <>
      <p className="form-aciklama">
        Bu sprintte form sadece görünüm; kayıt yapılmaz.
      </p>
      <form
        className="form form-kapsayici"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div className="form-grup">
          <label htmlFor="title">Etkinlik Adı</label>
          <input
            type="text"
            id="title"
            name="title"
            maxLength={80}
            placeholder="Örn. Kariyer Günleri 2026"
          />
        </div>
        <div className="form-grup">
          <label htmlFor="category">Kategori</label>
          <select id="category" name="category" defaultValue="">
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>
        <div className="form-grup">
          <label htmlFor="date">Tarih</label>
          <input type="date" id="date" name="date" />
        </div>
        <div className="form-grup">
          <label htmlFor="time">Saat</label>
          <input type="time" id="time" name="time" />
        </div>
        <div className="form-grup">
          <label htmlFor="location">Yer</label>
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
  );
}

export default EventForm;
