'use client';

import { useState, useEffect } from 'react';

interface IpInfo {
  ip: string;
  userAgent: string;
  referer: string;
  timestamp: string;
}

export default function Home() {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [sentToTelegram, setSentToTelegram] = useState(false);

  useEffect(() => {
    const fetchIpAndSend = async () => {
      try {
        // Lấy thông tin IP
        const ipResponse = await fetch('/api/get-ip');
        const ipData = await ipResponse.json();
        
        if (ipResponse.ok) {
          setIpInfo(ipData);
          
          // Gửi thông tin IP đến Telegram
          const telegramResponse = await fetch('/api/send-telegram', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(ipData),
          });
          
          if (telegramResponse.ok) {
            setSentToTelegram(true);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIpAndSend();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang lấy thông tin IP...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            IP Tracker
          </h1>
          <p className="text-gray-600">
            Thông tin IP của bạn đã được ghi nhận
          </p>
        </div>

        {ipInfo && (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Thông tin IP
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">IP Address:</span>
                  <span className="font-mono text-blue-600 bg-blue-50 px-3 py-1 rounded">
                    {ipInfo.ip}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Thời gian:</span>
                  <span className="text-gray-600">
                    {new Date(ipInfo.timestamp).toLocaleString('vi-VN')}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Referer:</span>
                  <span className="text-gray-600 text-sm">
                    {ipInfo.referer}
                  </span>
                </div>
                
                <div className="py-2">
                  <span className="font-medium text-gray-700 block mb-2">User Agent:</span>
                  <span className="text-gray-600 text-sm bg-gray-100 p-2 rounded block">
                    {ipInfo.userAgent}
                  </span>
                </div>
              </div>
            </div>

            <div className={`text-center p-4 rounded-lg ${
              sentToTelegram 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  sentToTelegram ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <span className="font-medium">
                  {sentToTelegram 
                    ? '✅ Đã gửi thông tin đến Telegram thành công!' 
                    : '❌ Không thể gửi thông tin đến Telegram'
                  }
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Thông tin này được thu thập tự động khi bạn truy cập trang web.</p>
        </div>
      </div>
    </div>
  );
}