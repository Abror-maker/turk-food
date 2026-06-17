# EATURKISH — Full Stack Restaurant Website

Figma dizayniga asoslangan restoran veb-sayti. Frontend — React + Vite, Backend — PHP Yii2.

## Sahifalar

| Sahifa | URL |
|--------|-----|
| Menu | `/` |
| News | `/news` |
| About Us | `/about` |
| Contact Us | `/contact` |

## Frontend ishga tushirish

```bash
cd frontend
npm install
npm run dev
```

Frontend `http://localhost:5173` da ochiladi.

`.env` faylida API manzili:
```
VITE_API_BASE_URL=http://backend/backend
```

## Backend (Yii2)

OpenServer orqali `http://backend/backend/` manzilida ishlaydi.

### Migratsiya

```bash
cd backend
php yii migrate
```

### REST API endpointlar

| Method | URL | Tavsif |
|--------|-----|--------|
| GET | `/backend/foods` | Taomlar ro'yxati |
| GET | `/backend/category` | Kategoriyalar |
| GET | `/backend/news` | Yangiliklar |
| GET | `/backend/images` | Galereya rasmlari |
| GET | `/backend/settings` | Sayt sozlamalari |
| POST | `/backend/contact` | Kontakt forma |
| POST | `/backend/newsletter` | Newsletter obuna |

### Admin panel (CRUD)

`http://backend/frontend/web/` — Yii2 admin panel:

- `/foods` — Taomlar
- `/category` — Kategoriyalar
- `/news` — Yangiliklar
- `/images` — Rasmlar
- `/site-setting/update` — Sayt sozlamalari
- `/contact-message` — Kelgan xabarlar
- `/newsletter-subscriber` — Obunachilar

## Texnologiyalar

- **Frontend:** React 19, Vite 8, React Router
- **Backend:** PHP 8, Yii2 Advanced, MySQL
- **Dizayn:** EATURKISH (qizil/oq rang sxemasi)
