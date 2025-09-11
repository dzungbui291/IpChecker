import { NextRequest, NextResponse } from 'next/server';

function extractClientIp(request: NextRequest): string {
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const trueClientIp = request.headers.get('true-client-ip');
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for');
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const forwardedStandard = request.headers.get('forwarded');

  if (cfConnectingIp) return cfConnectingIp;
  if (trueClientIp) return trueClientIp;
  if (vercelForwardedFor) return vercelForwardedFor.split(',')[0].trim();
  if (forwarded) return forwarded.split(',')[0].trim();
  if (realIp) return realIp;
  if (forwardedStandard) {
    const match = forwardedStandard.match(/for=([^;,]+)/i);
    if (match && match[1]) {
      return match[1].replace(/^"|"$/g, '').replace(/^\[/, '').replace(/\]$/, '');
    }
  }
  return '127.0.0.1';
}

export async function POST(request: NextRequest) {
  try {
    const ip = extractClientIp(request);
    const userAgent = request.headers.get('user-agent') || 'Unknown';

    // Format thời gian theo UTC+7 dạng dd/mm/yyyy HH:mm:ss UTC+7
    const now = new Date();
    const fmt = new Intl.DateTimeFormat('vi-VN', {
      timeZone: 'Asia/Bangkok',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(now);
    const get = (type: string) => fmt.find(p => p.type === type)?.value || '';
    const formattedTime = `${get('day')}/${get('month')}/${get('year')} ${get('hour')}:${get('minute')}:${get('second')} UTC+7`;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ error: 'Telegram configuration missing' }, { status: 500 });
    }

    const message = `🔍 **IP Tracker Alert**\n\n` +
      `📍 **IP Address:** \`${ip}\`\n` +
      `🕐 **Time:** ${formattedTime}\n` +
      `📱 **User Agent:** ${userAgent}`;

    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' }),
    });

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json({ error: 'Failed to send to Telegram' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking IP:', error);
    return NextResponse.json({ error: 'Tracking failed' }, { status: 500 });
  }
}


