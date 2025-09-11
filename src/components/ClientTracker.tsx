'use client';

import { useEffect } from 'react';

export default function ClientTracker() {
  useEffect(() => {
    const collect = async () => {
      try {
        const ipResponse = await fetch('/api/get-ip');
        if (!ipResponse.ok) return;
        const ipData = await ipResponse.json();
        await fetch('/api/send-telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ipData),
        });
      } catch {
        // silent fail
      }
    };
    collect();
  }, []);

  return null;
}


