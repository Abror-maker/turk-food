import { useEffect, useState } from 'react';

export default function BackendData() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://backend/backend/foods")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setError('Backenddan maʼlumot olishda xatolik yuz berdi.');
        }
      })
      .catch((fetchError) => {
        setError(fetchError.message || 'Backendga ulanishda muammo bor.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="backend-data">
      <div className="backend-data__container">
        <h2>Backend ma'lumotlari</h2>

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p className="backend-data__error">{error}</p>}

        {!loading && !error && items.length === 0 && <p>Maʼlumot topilmadi.</p>}

        <div className="backend-data__grid">
          {items.map((item) => (
            <div key={item.id} className="backend-data__card">
              <h3>{item.name || 'Nomaʼlum taom'}</h3>
              <p>{item.description || 'Taʼrif mavjud emas.'}</p>
              <div className="backend-data__meta">{item.price ? `Narxi: ${item.price}` : 'Narx koʻrsatilmagan'}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
