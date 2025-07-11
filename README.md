# Estimoo Frontend

Estimoo, Planning Poker uygulamasının React frontend'i. Real-time oylama ve WebSocket entegrasyonu ile çalışır.

## Özellikler

- ✅ Oda oluşturma ve katılım
- ✅ Real-time WebSocket bağlantısı
- ✅ Anonim oylama sistemi
- ✅ Oyları açma/gizleme
- ✅ Oyları sıfırlama (yeni tur)
- ✅ Responsive tasarım
- ✅ Modern UI (DaisyUI + Tailwind CSS)

## Kurulum

```bash
# Bağımlılıkları yükle
npm install

# Development server'ı başlat
npm run dev

# Production build
npm run build
```

## Environment Variables

`.env.local` dosyası oluşturun:

```env
# Development
VITE_API_URL=http://localhost:8080
VITE_WS_URL=ws://localhost:8080/ws

# Production
# VITE_API_URL=https://api.estimoo.co
# VITE_WS_URL=wss://api.estimoo.co/ws
```

## API Entegrasyonu

### REST Endpoints

- `POST /api/rooms` - Oda oluştur
- `GET /api/rooms/{roomCode}` - Oda bilgilerini getir
- `PUT /api/rooms/{roomCode}/name` - Oda adını güncelle

### WebSocket Endpoints

- `/app/join` - Odaya katıl
- `/app/vote` - Oy ver
- `/app/reveal` - Oyları aç
- `/app/reset` - Oyları sıfırla
- `/topic/room/{roomCode}` - Oda durumunu dinle

## Kullanım

1. **Oda Oluşturma**: Ana sayfada "Create New Room" butonuna tıklayın
2. **Odaya Katılma**: "Join Existing Room" ile oda kodunu girin
3. **Oylama**: Nickname girip odaya katıldıktan sonra oy verin
4. **Sonuçları Görme**: "Reveal Votes" ile oyları açın
5. **Yeni Tur**: "Reset" ile oyları sıfırlayın

## Teknolojiler

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **DaisyUI** - UI component library
- **Tailwind CSS** - Utility-first CSS
- **SockJS** - WebSocket client
- **STOMP** - WebSocket protocol

## Proje Yapısı

```
src/
├── components/
│   ├── CreateRoom/     # Oda oluşturma
│   ├── JoinRoom/       # Oda katılımı
│   ├── Room/          # Ana oda component'i
│   └── Navbar/        # Navigasyon
├── hooks/
│   ├── useRoom.ts     # Oda yönetimi hook'u
│   └── useCreateRoom.ts # Oda oluşturma hook'u
├── services/
│   ├── api.ts         # REST API servisi
│   └── websocket.ts   # WebSocket servisi
└── utils/
    └── errorHandler.ts # Hata yönetimi
```

## Development

```bash
# Linting
npm run lint

# Type checking
npm run build

# Preview production build
npm run preview
```

## Backend Gereksinimleri

Bu frontend, Estimoo backend API'si ile çalışır. Backend'in aşağıdaki özelliklere sahip olması gerekir:

- Spring Boot WebSocket desteği
- CORS yapılandırması
- REST API endpoints
- Real-time oda yönetimi

## Lisans

MIT
