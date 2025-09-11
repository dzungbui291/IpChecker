# IP Tracker - Next.js Application

Ứng dụng web Next.js để lấy IP của người truy cập và gửi thông tin đến Telegram.

## Tính năng

- ✅ Tự động lấy IP của người truy cập
- ✅ Thu thập thông tin bổ sung (User Agent, Referer, Timestamp)
- ✅ Gửi thông tin đến Telegram Bot
- ✅ Giao diện đẹp và responsive
- ✅ Hiển thị trạng thái gửi thông báo

## Cài đặt

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Cấu hình Telegram Bot:**
   
   a. Tạo bot mới:
   - Nhắn tin cho [@BotFather](https://t.me/BotFather) trên Telegram
   - Gửi lệnh `/newbot`
   - Đặt tên và username cho bot
   - Lưu lại **Bot Token**

   b. Lấy Chat ID:
   - Nhắn tin cho bot vừa tạo
   - Truy cập: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
   - Tìm `chat.id` trong response

3. **Tạo file `.env.local`:**
   ```env
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   TELEGRAM_CHAT_ID=your_chat_id_here
   ```

4. **Chạy ứng dụng:**
   ```bash
   npm run dev
   ```

5. **Truy cập:** `http://localhost:3000`

## Cấu trúc dự án

```
src/
├── app/
│   ├── api/
│   │   ├── get-ip/route.ts      # API lấy IP
│   │   └── send-telegram/route.ts # API gửi Telegram
│   └── page.tsx                 # Trang chính
```

## API Endpoints

### GET `/api/get-ip`
Lấy thông tin IP và thông tin bổ sung của người truy cập.

**Response:**
```json
{
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://example.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/send-telegram`
Gửi thông tin IP đến Telegram.

**Body:**
```json
{
  "ip": "192.168.1.1",
  "userAgent": "Mozilla/5.0...",
  "referer": "https://example.com",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Lưu ý

- Ứng dụng sẽ tự động lấy IP khi người dùng truy cập trang chủ
- Thông tin được gửi ngay lập tức đến Telegram
- Có thể deploy lên Vercel, Netlify hoặc các platform khác
- Đảm bảo cấu hình đúng biến môi trường khi deploy

## Troubleshooting

1. **Không nhận được thông báo Telegram:**
   - Kiểm tra Bot Token và Chat ID
   - Đảm bảo bot đã được start (gửi `/start` cho bot)
   - Kiểm tra console để xem lỗi

2. **IP hiển thị không chính xác:**
   - Trong môi trường development, IP có thể là localhost
   - Khi deploy, IP sẽ hiển thị chính xác

3. **Lỗi CORS:**
   - API routes của Next.js không có vấn đề CORS
   - Nếu có lỗi, kiểm tra cấu hình server