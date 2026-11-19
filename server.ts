import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Lightweight OAuth callback handler supporting both popup (iframe) and full-tab flows
  app.get(['/auth/callback', '/auth/callback/'], (_req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.send(`<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>로그인 처리 중...</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #0e1915;
        color: #f1f5f9;
        font-family: system-ui, -apple-system, sans-serif;
      }
      .card {
        text-align: center;
        padding: 2rem;
        border-radius: 1.5rem;
        background: #14231e;
        border: 1px solid rgba(6, 78, 59, 0.7);
      }
      p { margin: 0.5rem 0 0; font-size: 0.9rem; color: #cbd5e1; }
    </style>
  </head>
  <body>
    <div class="card">
      <strong>Google 로그인을 완료하는 중입니다...</strong>
      <p>잠시 후 메인 페이지로 이동합니다.</p>
    </div>
    <script>
      (function () {
        var searchParams = new URLSearchParams(window.location.search);
        var hashStr = window.location.hash ? window.location.hash.substring(1) : '';
        var hashParams = new URLSearchParams(hashStr);

        var payload = {
          type: 'SUPABASE_OAUTH_CALLBACK',
          code: searchParams.get('code'),
          access_token: hashParams.get('access_token'),
          refresh_token: hashParams.get('refresh_token'),
          error: searchParams.get('error') || hashParams.get('error'),
          error_description:
            searchParams.get('error_description') ||
            hashParams.get('error_description')
        };

        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage(payload, '*');
          } catch (e) {}
          window.close();
        } else {
          var target = '/' + (window.location.search || '') + (window.location.hash || '');
          window.location.replace(target);
        }
      })();
    </script>
  </body>
</html>`);
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
